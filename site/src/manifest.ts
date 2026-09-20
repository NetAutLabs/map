export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type LaunchMethod = 'redirect' | 'popup'

export type Hotspot = { x: number; y: number; r: number }

export type Lab = {
  id: string
  title: string
  summary: string
  duration?: string
  difficulty?: Difficulty
  colony: string
  launch: { method: LaunchMethod; url: string }
  hotspot: Hotspot
  tags?: string[]
}

export type LabManifest = { labs: Lab[] }

export async function loadManifest(path = '/labs.manifest.json') {
  const res = await fetch(path)
  if (!res.ok) throw new Error('Failed to load manifest')
  const data = (await res.json()) as LabManifest
  return data
}
