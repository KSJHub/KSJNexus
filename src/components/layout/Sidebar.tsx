import { Diamond, FolderKanban } from 'lucide-react'
import { projects } from '../../data/projects'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">
          <Diamond size={20} />
        </span>
        <div>
          <strong>KSJ Nexus</strong>
          <small>Command workspace</small>
        </div>
      </div>

      <nav className="nav-list">
        <a className="active" href="#home">Home</a>
        <a href="#tasks">Tasks</a>
        <a href="#ideas">Ideas</a>
        <a href="#notes">Notes</a>
      </nav>

      <div className="project-list">
        <span>Projects</span>
        {projects.map((project) => (
          <a href={`#${project.id}`} key={project.id}>
            <FolderKanban size={16} />
            {project.name}
          </a>
        ))}
      </div>
    </aside>
  )
}
