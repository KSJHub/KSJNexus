import { Bot, Code2, Folder, Home, Inbox, Maximize2, Minus, Pin, Settings, Timer } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CapturePanel } from '../capture/CapturePanel'
import { InboxList } from '../inbox/InboxList'
import type { InboxKindFilter, InboxScope } from '../inbox/inbox-filters'
import { ProjectActions } from '../projects/ProjectActions'
import { ProjectContext } from '../projects/ProjectContext'
import { ProjectSwitcher } from '../projects/ProjectSwitcher'
import { TimelinePanel } from '../timeline/TimelinePanel'
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

const navigationItems = [
  { label: 'Home', icon: Home },
  { label: 'Inbox', icon: Inbox },
  { label: 'Timeline', icon: Timer },
  { label: 'Projects', icon: Folder },
  { label: 'VS Code', icon: Code2 },
  { label: 'ChatGPT', icon: Bot },
  { label: 'Settings', icon: Settings },
]

export function HomePage() {
  const [activeProjectId, setActiveProjectId] = useState('ksj-nexus')
  const [captures, setCaptures] = useState<CaptureItem[]>(() => loadCaptures())
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
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

  const handleProjectChange = (projectId: string) => {
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

  const visibleCaptures = captures.filter((item) => {
    if (item.archived) return false
    if (inboxScope === 'project' && item.projectId !== activeProjectId) return false
    if (kindFilter !== 'all' && item.kind !== kindFilter) return false
    if (!search.trim()) return true

    const searchValue = search.toLowerCase()
    return [item.text, item.projectName, item.kind].some((value) => value.toLowerCase().includes(searchValue))
  })

  return (
    <section className="nexus-desktop" id="home">
      <header className="nexus-titlebar">
        <div className="nexus-brand">
          <span className="brand-diamond">◆</span>
          <strong>KSJ Nexus</strong>
        </div>
        <div className="window-actions" aria-label="Window actions">
          <button type="button" title="Pin on top"><Pin size={14} /></button>
          <button type="button" title="Minimise"><Minus size={14} /></button>
          <button type="button" title="Expand"><Maximize2 size={14} /></button>
        </div>
      </header>

      <div className="nexus-body">
        <aside className="nexus-sidebar">
          <nav>
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button className={index === 0 ? 'active' : ''} key={item.label} type="button">
                  <Icon size={17} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
          <div className="sidebar-footer">
            <span className="footer-diamond">◇</span>
            <strong>KSJ Nexus</strong>
            <p>All your projects. All your context. One place.</p>
          </div>
        </aside>

        <main className="nexus-workspace">
          <section className="workspace-top">
            <ProjectSwitcher activeProjectId={activeProjectId} onChange={handleProjectChange} />
            <ProjectContext items={captures} project={activeProject} />
          </section>

          <section className="workspace-middle">
            <ProjectActions items={captures} project={activeProject} />
            <CapturePanel activeProjectId={activeProjectId} onCapture={handleCapture} />
          </section>

          <section className="workspace-bottom">
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
            <TimelinePanel events={timeline} />
          </section>
        </main>
      </div>
    </section>
  )
}
