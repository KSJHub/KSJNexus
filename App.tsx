import {
  BarChart3,
  CheckCircle2,
  Circle,
  Clock3,
  Diamond,
  FolderKanban,
  Lightbulb,
  Settings,
  StickyNote,
} from 'lucide-react'
import './App.css'

type Project = {
  name: string
  label: string
  taskCount: number
  accent: string
}

type Task = {
  title: string
  project: string
  status: 'done' | 'next'
}

const projects: Project[] = [
  { name: 'KSJ Digital', label: 'Websites, systems, client tools', taskCount: 4, accent: 'cyan' },
  { name: 'KSJ Diamond Gaming', label: 'Streaming, content, brand assets', taskCount: 6, accent: 'blue' },
  { name: 'TwoToneTaj', label: 'Community website and content', taskCount: 3, accent: 'green' },
  { name: 'Goliath', label: 'Automation, tickets, deployment tools', taskCount: 5, accent: 'violet' },
]

const tasks: Task[] = [
  { title: 'Build the Nexus foundation shell', project: 'KSJ Nexus', status: 'done' },
  { title: 'Create the first task module structure', project: 'KSJ Nexus', status: 'next' },
  { title: 'Add local task saving', project: 'KSJ Nexus', status: 'next' },
]

function App() {
  return (
    <main className="nexus-shell">
      <aside className="sidebar" aria-label="KSJ Nexus navigation">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <Diamond size={20} />
          </span>
          <div>
            <strong>KSJ Nexus</strong>
            <small>Command workspace</small>
          </div>
        </div>

        <nav className="nav-list">
          <a className="nav-item active" href="#home">
            <BarChart3 size={18} /> Home
          </a>
          <a className="nav-item" href="#tasks">
            <CheckCircle2 size={18} /> Tasks
          </a>
          <a className="nav-item" href="#ideas">
            <Lightbulb size={18} /> Ideas
          </a>
          <a className="nav-item" href="#notes">
            <StickyNote size={18} /> Notes
          </a>
        </nav>

        <div className="sidebar-section">
          <span>Projects</span>
          {projects.map((project) => (
            <a className="project-link" href={`#${project.name}`} key={project.name}>
              <FolderKanban size={16} /> {project.name}
            </a>
          ))}
        </div>

        <a className="settings-link" href="#settings">
          <Settings size={18} /> Settings
        </a>
      </aside>

      <section className="workspace" id="home">
        <header className="topbar">
          <div>
            <span className="eyebrow">Structured. Minimal. Scalable.</span>
            <h1>Welcome to KSJ Nexus</h1>
          </div>
          <button className="ghost-button" type="button">
            Floating mode soon
          </button>
        </header>

        <section className="hero-card">
          <div>
            <span className="status-pill">v0.1 Foundation</span>
            <h2>The central command center for everything KSJ.</h2>
            <p>
              Nexus starts simple: one clean workspace for tasks, ideas, notes, and project focus.
              Integrations come later only when they are useful.
            </p>
          </div>
          <div className="hero-metric">
            <strong>18</strong>
            <span>planned tasks</span>
          </div>
        </section>

        <section className="grid two-column">
          <article className="panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Today</span>
                <h3>Current focus</h3>
              </div>
              <Clock3 size={18} />
            </div>
            <div className="task-list">
              {tasks.map((task) => (
                <div className="task-row" key={task.title}>
                  {task.status === 'done' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  <div>
                    <strong>{task.title}</strong>
                    <span>{task.project}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Modules</span>
                <h3>Build order</h3>
              </div>
            </div>
            <ol className="build-list">
              <li>Foundation shell</li>
              <li>Tasks</li>
              <li>Local saving</li>
              <li>Floating desktop mode</li>
              <li>VPS sync later</li>
            </ol>
          </article>
        </section>

        <section className="project-grid" aria-label="Project overview">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.name}>
              <span>{project.taskCount} tasks</span>
              <h3>{project.name}</h3>
              <p>{project.label}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}

export default App
