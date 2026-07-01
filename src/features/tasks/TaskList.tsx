import { CheckCircle2, Circle } from 'lucide-react'
import { tasks } from './tasks'

export function TaskList() {
  return (
    <article className="mini-panel">
      <div className="section-heading">
        <span>Today</span>
        <small>{tasks.length} items</small>
      </div>
      {tasks.map((task) => (
        <div className="task-row" key={task.id}>
          {task.status === 'done' ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          <div>
            <strong>{task.title}</strong>
            <small>{task.project}</small>
          </div>
        </div>
      ))}
    </article>
  )
}
