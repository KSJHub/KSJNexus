import type { CaptureItem } from '../../types/capture'

const STORAGE_KEY = 'ksj-nexus-captures'

export function loadCaptures(): CaptureItem[] {
  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as CaptureItem[]
  } catch {
    return []
  }
}

export function saveCaptures(items: CaptureItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}
