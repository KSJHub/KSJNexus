import { Maximize2, Minus, Pin } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ActivityFeed } from '../activity/ActivityFeed'
import { CapturePanel } from '../capture/CapturePanel'
import { InboxList } from '../inbox/InboxList'
import { ProjectContext } from '../projects/ProjectContext'
import { ProjectSwitcher } from '../projects/ProjectSwitcher'
import { projects } from '../../data/projects'
import { loadCaptures, saveCaptures } from '../../services/storage/capture-storage'
import type { CaptureItem } from '../../types/capture'

export function HomePage() {
  const [activeProjectId, setActiveProjectId] = useState('ksj-nexus')
  const [captures, setCaptures] = useState<CaptureItem[]>(() => loadCaptures())

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId],
  )

  useEffect(() => {
    saveCaptures(captures)
  }, [captures])

  const handleCapture = (item: CaptureItem) => {
    setCaptures((currentItems) => [item, ...currentItems])
  }

  const activeProjectCaptures = captures.filter((item) => item.projectId === activeProjectId)

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

      <ProjectSwitcher activeProjectId={activeProjectId} onChange={setActiveProjectId} />
      <ProjectContext items={captures} project={activeProject} />
      <CapturePanel activeProjectId={activeProjectId} onCapture={handleCapture} />
      <InboxList items={activeProjectCaptures} />
      <ActivityFeed items={captures} />
    </section>
  )
}
