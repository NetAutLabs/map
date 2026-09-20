import React, { useEffect, useRef, useState } from 'react'
import type { LabManifest, Lab } from '../manifest'

function Hotspot({ lab, overlayW, overlayH, onOpen }: { lab: Lab; overlayW: number; overlayH: number; onOpen: (l: Lab) => void }) {
  const left = lab.hotspot.x * overlayW
  const top = lab.hotspot.y * overlayH
  const size = lab.hotspot.r * Math.min(overlayW, overlayH)

  return (
    <button
      className="hotspot"
      style={{ left: `${left}px`, top: `${top}px`, width: `${size}px`, height: `${size}px`, pointerEvents: 'auto' }}
      onClick={() => onOpen(lab)}
      aria-label={lab.title}
    >
      <span className="hotspot-label">{lab.title.toUpperCase()}</span>
    </button>
  )
}

export default function MapCanvas({ manifest }: { manifest: LabManifest | null }) {
  const [active, setActive] = useState<Lab | null>(null)

  const imgSrc = '/netautlabs_map.png'
  const imgRef = useRef<HTMLImageElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)

  const [overlayBox, setOverlayBox] = useState({ left: 0, top: 0, width: 0, height: 0 })

  const onOpen = (lab: Lab) => setActive(lab)

  const labs = manifest?.labs ?? []

  useEffect(() => {
    const img = imgRef.current
    const frame = frameRef.current
    if (!img || !frame) return

    const update = () => {
      const imgRect = img.getBoundingClientRect()
      const frameRect = frame.getBoundingClientRect()
      setOverlayBox({ left: imgRect.left - frameRect.left, top: imgRect.top - frameRect.top, width: imgRect.width, height: imgRect.height })
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(img)
    window.addEventListener('resize', update)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [imgRef.current, frameRef.current])

  return (
    <div className="map-canvas">
      <div className="map-frame" ref={frameRef}>
        <img
          ref={imgRef}
          src={imgSrc}
          alt="NetAut Labs Map"
          className="map-image"
          onLoad={() => {
            // initial sizing handled by ResizeObserver
          }}
        />

        {/* overlay layer positioned over the displayed image */}
        <div
          className="overlay-layer"
          style={{ position: 'absolute', left: `${overlayBox.left}px`, top: `${overlayBox.top}px`, width: `${overlayBox.width}px`, height: `${overlayBox.height}px`, pointerEvents: 'none' }}
        >
          {labs.map((l) => (
            <Hotspot key={l.id} lab={l} overlayW={overlayBox.width} overlayH={overlayBox.height} onOpen={onOpen} />
          ))}
        </div>
      </div>

      {active && (
        <aside className="overlay">
          <h3>{active.title}</h3>
          <p>{active.summary}</p>
          <div className="meta">{active.duration} • {active.difficulty}</div>
          <div className="actions">
            <a href={active.launch.url} target="_blank" rel="noopener" className="btn">Start Lab (new tab)</a>
            <button className="btn-muted" onClick={() => setActive(null)}>Close</button>
          </div>
        </aside>
      )}
    </div>
  )
}
