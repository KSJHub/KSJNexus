import { TaskList } from '../tasks/TaskList'

export function HomePage() {
  return (
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
        <TaskList />

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
  )
}
