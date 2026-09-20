import React, { useEffect, useState } from 'react'
import { loadManifest, LabManifest } from './manifest'
import MapCanvas from './components/MapCanvas'

export default function App() {
  const [manifest, setManifest] = useState<LabManifest | null>(null)

  useEffect(() => {
    loadManifest('/labs.manifest.json').then(setManifest).catch(console.error)
  }, [])

  return (
    <div className="app-root">
      <header className="app-header">NetAut Labs Map</header>
      <main>
        <MapCanvas manifest={manifest} />
      </main>
    </div>
  )
}
