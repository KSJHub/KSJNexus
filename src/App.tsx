import { CheckCircle2, Circle, Diamond, FolderKanban } from 'lucide-react'
import './App.css'

const projects = ['KSJ Digital', 'KSJ Diamond Gaming', 'TwoToneTaj', 'Goliath']
const tasks = [
  { title: 'Build the Nexus foundation shell', done: true },
  { title: 'Create the first task module structure', done: false },
  { title: 'Add local task saving', done: false },
]

function App() {
  return (
    <main className="nexus-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><Diamond size={20} /></span>
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
            <a href={`#${project}`} key={project}><FolderKanban size={16} />{project}</a>
          ))}
        </div>
      </aside>

      <section className="workspace" id="home">
        <header className="topbar">
          <div>
            <span className="eyebrow">Structured. Minimal. Scalable.</span>
            <h1>Welcome to KSJ Nexus</h1>
          </div>
          <button type="button">Floating mode soon</button>
        </header>

        <section className="hero-card">
          <span>v0.1 Foundation</span>
          <h2>The central command center for everything KSJ.</h2>
          <p>Nexus starts simple: one clean workspace for tasks, ideas, notes, and project focus.</p>
        </section>

        <section className="content-grid">
          <article className="panel">
            <h3>Current focus</h3>
            {tasks.map((task) => (
              <div className="task-row" key={task.title}>
                {task.done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                <strong>{task.title}</strong>
              </div>
            ))}
          </article>

          <article className="panel">
            <h3>Build order</h3>
            <ol>
              <li>Foundation shell</li>
              <li>Tasks</li>
              <li>Local saving</li>
              <li>Floating desktop mode</li>
              <li>VPS sync later</li>
            </ol>
          </article>
        </section>
      </section>
    </main>
  )
}

export default App
