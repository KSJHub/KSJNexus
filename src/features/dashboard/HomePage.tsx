import { CheckCircle2, GitBranch, Maximize2, Minus, Pin, Send, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CapturePanel } from '../capture/CapturePanel'
import { InboxList } from '../inbox/InboxList'
import type { InboxKindFilter, InboxScope } from '../inbox/inbox-filters'
import { ProjectActions } from '../projects/ProjectActions'
import { projects } from '../../data/projects'
import { loadCaptures, saveCaptures } from '../../services/storage/capture-storage'
import type { CaptureItem } from '../../types/capture'
import type { TimelineEvent, TimelineEventType } from '../../types/timeline'

function createTimelineEvent(type: TimelineEventType, title: string, projectId: string, projectName: string): TimelineEvent {
  return {
    id: crypto.randomUUID(),
    type,
    title,
    projectId,
    projectName,
    createdAt: new Date().toISOString(),
  }
}

export function HomePage() {
  const [activeProjectId, setActiveProjectId] = useState('ksj-nexus')
  const [captures, setCaptures] = useState<CaptureItem[]>(() => loadCaptures())
  const [, setTimeline] = useState<TimelineEvent[]>([])
  const [inboxScope, setInboxScope] = useState<InboxScope>('project')
  const [kindFilter, setKindFilter] = useState<InboxKindFilter>('all')
  const [search, setSearch] = useState('')

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId],
  )

  useEffect(() => {
    saveCaptures(captures)
  }, [captures])

  const addTimelineEvent = (event: TimelineEvent) => {
    setTimeline((currentEvents) => [event, ...currentEvents].slice(0, 30))
  }

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = event.target.value
    const project = projects.find((item) => item.id === projectId) ?? projects[0]
    setActiveProjectId(projectId)
    addTimelineEvent(createTimelineEvent('project', `Switched to ${project.name}`, project.id, project.name))
  }

  const handleCapture = (item: CaptureItem) => {
    setCaptures((currentItems) => [item, ...currentItems])
    addTimelineEvent(createTimelineEvent('capture', `${item.kind} captured`, item.projectId, item.projectName))
  }

  const handleArchive = (itemId: string) => {
    const archivedItem = captures.find((item) => item.id === itemId)

    setCaptures((currentItems) => currentItems.map((item) => (
      item.id === itemId ? { ...item, archived: true } : item
    )))

    if (archivedItem) {
      addTimelineEvent(createTimelineEvent('archive', 'Archived inbox item', archivedItem.projectId, archivedItem.projectName))
    }
  }

  const handlePin = (itemId: string) => {
    const pinnedItem = captures.find((item) => item.id === itemId)

    setCaptures((currentItems) => currentItems.map((item) => (
      item.id === itemId ? { ...item, pinned: !item.pinned } : item
    )))

    if (pinnedItem) {
      addTimelineEvent(createTimelineEvent('pin', pinnedItem.pinned ? 'Unpinned inbox item' : 'Pinned inbox item', pinnedItem.projectId, pinnedItem.projectName))
    }
  }

  const activeItems = captures.filter((item) => !item.archived && item.projectId === activeProjectId)
  const latestItems = captures.filter((item) => !item.archived).slice(0, 5)

  const visibleCaptures = captures.filter((item) => {
    if (item.archived) return false
    if (inboxScope === 'project' && item.projectId !== activeProjectId) return false
    if (kindFilter !== 'all' && item.kind !== kindFilter) return false
    if (!search.trim()) return true

    const searchValue = search.toLowerCase()
    return [item.text, item.projectName, item.kind].some((value) => value.toLowerCase().includes(searchValue))
  })

  return (
    <section className="nexus-desktop companion-mode" id="home">
      <header className="nexus-titlebar">
        <div className="nexus-brand">
          <span className="brand-diamond">◆</span>
          <strong>KSJ Nexus</strong>
          <small>Companion</small>
        </div>
        <div className="window-actions" aria-label="Window actions">
          <button type="button" title="Pin on top"><Pin size={14} /></button>
          <button type="button" title="Minimise"><Minus size={14} /></button>
          <button type="button" title="Expand"><Maximize2 size={14} /></button>
          <button type="button" title="Close"><X size={14} /></button>
        </div>
      </header>

      <main className="companion-workspace simplified">
        <section className="project-strip">
          <label>
            <span>Active project</span>
            <select onChange={handleProjectChange} value={activeProjectId}>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </label>
          <div className="connection-status">
            <span><CheckCircle2 size={13} /> {activeItems.length} active</span>
            <span><GitBranch size={13} /> {activeProject.repository}</span>
            <span><Sparkles size={13} /> ChatGPT ready</span>
          </div>
        </section>

        <CapturePanel activeProjectId={activeProjectId} onCapture={handleCapture} />

        <section className="recent-flow">
          <div className="companion-section-label">
            <span>Recent activity</span>
            <small>{latestItems.length} latest</small>
          </div>
          <div className="recent-list">
            {latestItems.length === 0 ? (
              <p className="empty-state">Capture something and it will appear here.</p>
            ) : (
              latestItems.map((item) => (
                <div className="recent-item" key={item.id}>
                  <span>{item.kind}</span>
                  <strong>{item.text}</strong>
                  <small>{item.projectName}</small>
                </div>
              ))
            )}
          </div>
        </section>

        <ProjectActions items={captures} project={activeProject} />

        <section className="companion-inbox compact-hidden">
          <InboxList
            items={visibleCaptures}
            kindFilter={kindFilter}
            onArchive={handleArchive}
            onKindFilterChange={setKindFilter}
            onPin={handlePin}
            onScopeChange={setInboxScope}
            onSearchChange={setSearch}
            scope={inboxScope}
            search={search}
          />
        </section>

        <footer className="companion-footer">
          <span><Send size={13} /> Capture first. Organise later.</span>
          <span>{activeProject.name}</span>
        </footer>
      </main>
    </section>
  )
}
