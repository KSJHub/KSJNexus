import type { TimelineEvent } from '../../types/timeline'
import './TimelinePanel.css'

type TimelinePanelProps = {
  events: TimelineEvent[]
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function TimelinePanel({ events }: TimelinePanelProps) {
  return (
    <section className="mini-panel timeline-panel">
      <div className="section-heading">
        <span>Timeline</span>
        <small>{events.length ? 'latest events' : 'waiting'}</small>
      </div>
      {events.length === 0 ? (
        <p className="empty-state">Project activity will build here as you work.</p>
      ) : (
        events.slice(0, 6).map((event) => (
          <div className="timeline-row" key={event.id}>
            <time>{formatTime(event.createdAt)}</time>
            <div>
              <strong>{event.title}</strong>
              <small>{event.projectName} • {event.type}</small>
            </div>
          </div>
        ))
      )}
    </section>
  )
}
