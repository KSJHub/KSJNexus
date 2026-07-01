import { CheckCircle2, Circle } from 'lucide-react'
import { tasks } from './tasks'

export function TaskList() {
  return (
    <article className="panel">
      <h3>Current focus</h3>
      {tasks.map((task) => (
        <div className="task-row" key={task.id}>
          {task.status === 'done' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
          <div>
            <strong>{task.title}</strong>
            <small>{task.project}</small>
          </div>
        </div>
      ))}
    </article>
  )
}
