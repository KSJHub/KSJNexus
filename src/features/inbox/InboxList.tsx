import { Circle } from 'lucide-react'
import type { CaptureItem } from '../../types/capture'

type InboxListProps = {
  items: CaptureItem[]
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function InboxList({ items }: InboxListProps) {
  return (
    <article className="mini-panel">
      <div className="section-heading">
        <span>Inbox</span>
        <small>{items.length} items</small>
      </div>

      {items.length === 0 ? (
        <p className="empty-state">Capture something and it will appear here.</p>
      ) : (
        items.slice(0, 5).map((item) => (
          <div className="task-row" key={item.id}>
            <Circle size={16} />
            <div>
              <strong>{item.text}</strong>
              <small>{item.projectName} • {item.kind} • {formatTime(item.createdAt)}</small>
            </div>
          </div>
        ))
      )}
    </article>
  )
}
