import { Maximize2, Minus, Pin, Send } from 'lucide-react'
import { projects } from '../../data/projects'
import { TaskList } from '../tasks/TaskList'

export function HomePage() {
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

      <section className="quick-note">
        <div className="section-heading">
          <span>Quick note</span>
          <small>sync to project soon</small>
        </div>
        <textarea placeholder="Type a note while you work..." rows={5} />
        <div className="capture-row">
          <select defaultValue="ksj-nexus" aria-label="Select project">
            <option value="ksj-nexus">KSJ Nexus</option>
            {projects.map((project) => (
              <option value={project.id} key={project.id}>{project.name}</option>
            ))}
          </select>
          <button type="button"><Send size={14} /> Save</button>
        </div>
      </section>

      <TaskList />

      <section className="mini-panel">
        <div className="section-heading">
          <span>Mode</span>
          <small>A5 companion first</small>
        </div>
        <p>Keep Nexus small, fast, and ready beside VS Code, Discord, or games.</p>
      </section>
    </section>
  )
}
