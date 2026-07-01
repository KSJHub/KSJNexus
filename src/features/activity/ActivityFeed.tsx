import type { CaptureItem } from '../../types/capture'

type ActivityFeedProps = {
  items: CaptureItem[]
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <section className="mini-panel activity-feed">
      <div className="section-heading">
        <span>Recent</span>
        <small>{items.length ? 'latest captures' : 'waiting'}</small>
      </div>
      {items.length === 0 ? (
        <p className="empty-state">Recent project activity will show here.</p>
      ) : (
        items.slice(0, 3).map((item) => (
          <div className="activity-row" key={item.id}>
            <time>{formatTime(item.createdAt)}</time>
            <div>
              <strong>{item.kind} saved</strong>
              <small>{item.projectName}</small>
            </div>
          </div>
        ))
      )}
    </section>
  )
}
