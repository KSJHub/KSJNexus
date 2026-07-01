import { projects } from '../../data/projects'

type ProjectSwitcherProps = {
  activeProjectId: string
  onChange: (projectId: string) => void
}

export function ProjectSwitcher({ activeProjectId, onChange }: ProjectSwitcherProps) {
  return (
    <section className="mini-panel project-switcher">
      <div className="section-heading">
        <span>Project</span>
        <small>context</small>
      </div>
      <div className="project-chip-list">
        {projects.map((project) => (
          <button
            className={activeProjectId === project.id ? 'active' : ''}
            key={project.id}
            onClick={() => onChange(project.id)}
            type="button"
          >
            <span>{project.icon}</span>
            {project.name}
          </button>
        ))}
      </div>
    </section>
  )
}
