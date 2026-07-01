import type { CaptureItem } from '../../types/capture'
import type { Project } from '../../data/projects'

type ProjectContextProps = {
  project: Project
  items: CaptureItem[]
}

export function ProjectContext({ project, items }: ProjectContextProps) {
  const projectItems = items.filter((item) => item.projectId === project.id)
  const tasks = projectItems.filter((item) => item.kind === 'task').length
  const notes = projectItems.filter((item) => item.kind === 'note').length
  const ideas = projectItems.filter((item) => item.kind === 'idea').length

  return (
    <section className="mini-panel project-context">
      <div className="section-heading">
        <span>{project.icon} {project.name}</span>
        <small>{projectItems.length} items</small>
      </div>
      <p>{project.description}</p>
      <div className="context-stats">
        <span><strong>{tasks}</strong> tasks</span>
        <span><strong>{notes}</strong> notes</span>
        <span><strong>{ideas}</strong> ideas</span>
      </div>
      <div className="context-links">
        <span>Repo: {project.repository}</span>
        <span>Workspace: {project.workspace}</span>
      </div>
    </section>
  )
}
