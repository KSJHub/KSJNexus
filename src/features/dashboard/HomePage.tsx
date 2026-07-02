import { CheckCircle2, GitBranch, Maximize2, Minus, Pin, Send, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CapturePanel } from '../capture/CapturePanel'
import { InboxList } from '../inbox/InboxList'
import type { InboxKindFilter, InboxScope } from '../inbox/inbox-filters'
import { ProfileManager } from '../projects/ProfileManager'
import { ProjectActions } from '../projects/ProjectActions'
import { projects as defaultProjects } from '../../data/projects'
import { loadCaptures, saveCaptures } from '../../services/storage/capture-storage'
import type { CaptureItem } from '../../types/capture'
import type { ProjectProfile } from '../../types/project-profile'
import type { TimelineEvent, TimelineEventType } from '../../types/timeline'
import '../../types/desktop'

const PROFILE_STORAGE_KEY = 'ksj-nexus-project-profiles'

function loadProfiles() {
  const rawProfiles = window.localStorage.getItem(PROFILE_STORAGE_KEY)

  if (!rawProfiles) {
    return defaultProjects
  }

  try {
    const savedProfiles = JSON.parse(rawProfiles) as ProjectProfile[]
    return defaultProjects.map((project) => ({
      ...project,
      ...savedProfiles.find((savedProject) => savedProject.id === project.id),
    }))
  } catch {
    return defaultProjects
  }
}

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
  const [profiles, setProfiles] = useState<ProjectProfile[]>(() => loadProfiles())
  const [activeProjectId, setActiveProjectId] = useState('ksj-nexus')
  const [captures, setCaptures] = useState<CaptureItem[]>(() => loadCaptures())
  const [, setTimeline] = useState<TimelineEvent[]>([])
  const [inboxScope, setInboxScope] = useState<InboxScope>('project')
  const [kindFilter, setKindFilter] = useState<InboxKindFilter>('all')
  const [search, setSearch] = useState('')
  const [windowStatus, setWindowStatus] = useState('Companion')
  const [isPinned, setIsPinned] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const activeProject = useMemo(
    () => profiles.find((project) => project.id === activeProjectId) ?? profiles[0],
    [activeProjectId, profiles],
  )

  useEffect(() => {
    saveCaptures(captures)
  }, [captures])

  const saveProfile = (profile: ProjectProfile) => {
    const updatedProfiles = profiles.map((project) => (project.id === profile.id ? profile : project))
    setProfiles(updatedProfiles)
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfiles))
    addTimelineEvent(createTimelineEvent('project', `Saved ${profile.name} profile`, profile.id, profile.name))
  }

  const addTimelineEvent = (event: TimelineEvent) => {
    setTimeline((currentEvents) => [event, ...currentEvents].slice(0, 30))
  }

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = event.target.value
    const project = profiles.find((item) => item.id === projectId) ?? profiles[0]
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

  const handleWindowPin = async () => {
    const result = await window.nexusDesktop?.windowToggleAlwaysOnTop()

    if (result?.ok) {
      setIsPinned(Boolean(result.pinned))
      setWindowStatus(result.pinned ? 'Pinned' : 'Companion')
    }
  }

  const handleWindowSize = async () => {
    const result = await window.nexusDesktop?.windowToggleSize()

    if (result?.ok) {
      setIsExpanded(Boolean(result.expanded))
      setWindowStatus(result.expanded ? 'Expanded' : 'Companion')
    }
  }

  const activeItems = captures.filter((item) => !item.archived && item.projectId === activeProjectId)
  const latestItems = captures.filter((item) => !item.archived).slice(0, 4)

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
          <small>{windowStatus}</small>
        </div>
        <div className="window-actions" aria-label="Window actions">
          <button className={isPinned ? 'active' : ''} onClick={handleWindowPin} type="button" title="Pin on top"><Pin size={14} /></button>
          <button onClick={() => window.nexusDesktop?.windowMinimise()} type="button" title="Minimise"><Minus size={14} /></button>
          <button className={isExpanded ? 'active' : ''} onClick={handleWindowSize} type="button" title="Expand"><Maximize2 size={14} /></button>
          <button className="danger" onClick={() => window.nexusDesktop?.windowClose()} type="button" title="Close"><X size={14} /></button>
        </div>
      </header>

      <main className="companion-workspace simplified">
        <section className="project-strip">
          <label>
            <span>Active project</span>
            <select onChange={handleProjectChange} value={activeProjectId}>
              {profiles.map((project) => (
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

        <section className="workspace-manager-grid">
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
          <ProfileManager project={activeProject} onSave={saveProfile} />
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
