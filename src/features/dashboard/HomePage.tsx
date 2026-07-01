import { Maximize2, Minus, Pin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CapturePanel } from '../capture/CapturePanel'
import { InboxList } from '../inbox/InboxList'
import { loadCaptures, saveCaptures } from '../../services/storage/capture-storage'
import type { CaptureItem } from '../../types/capture'

export function HomePage() {
  const [captures, setCaptures] = useState<CaptureItem[]>(() => loadCaptures())

  useEffect(() => {
    saveCaptures(captures)
  }, [captures])

  const handleCapture = (item: CaptureItem) => {
    setCaptures((currentItems) => [item, ...currentItems])
  }

  return (
    <section className="companion-card" id="home">
      <header className="companion-titlebar">
        <div>
          <span className="app-mark">◆</span>
          <strong>KSJ Nexus</strong>
        </div>
        <div className="window-actions" aria-label="Window actions">
          <button type="button" title="Pin on top"><Pin size={14} /></button>
          <button type="button" title="Minimise"><Minus size={14} /></button>
          <button type="button" title="Expand"><Maximize2 size={14} /></button>
        </div>
      </header>

      <CapturePanel onCapture={handleCapture} />
      <InboxList items={captures} />

      <section className="mini-panel status-panel">
        <div className="section-heading">
          <span>Status</span>
          <small>{captures.length ? 'saved locally' : 'ready'}</small>
        </div>
        <p>{captures.length ? 'Your latest captures are stored on this device.' : 'Capture first. Organize later.'}</p>
      </section>
    </section>
  )
}
