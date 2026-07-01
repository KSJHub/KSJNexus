import { Archive, Circle, Pin, Search } from 'lucide-react'
import type { CaptureItem } from '../../types/capture'
import type { InboxKindFilter, InboxScope } from './inbox-filters'
import { inboxKindFilters } from './inbox-filters'

type InboxListProps = {
  items: CaptureItem[]
  kindFilter: InboxKindFilter
  onArchive: (itemId: string) => void
  onKindFilterChange: (filter: InboxKindFilter) => void
  onPin: (itemId: string) => void
  onSearchChange: (value: string) => void
  onScopeChange: (scope: InboxScope) => void
  search: string
  scope: InboxScope
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function InboxList({
  items,
  kindFilter,
  onArchive,
  onKindFilterChange,
  onPin,
  onSearchChange,
  onScopeChange,
  search,
  scope,
}: InboxListProps) {
  const sortedItems = [...items].sort((firstItem, secondItem) => {
    if (firstItem.pinned && !secondItem.pinned) return -1
    if (!firstItem.pinned && secondItem.pinned) return 1
    return new Date(secondItem.createdAt).getTime() - new Date(firstItem.createdAt).getTime()
  })

  return (
    <article className="mini-panel inbox-panel">
      <div className="section-heading">
        <span>Universal inbox</span>
        <small>{items.length} items</small>
      </div>

      <label className="search-box">
        <Search size={14} />
        <input
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search captures..."
          type="search"
          value={search}
        />
      </label>

      <div className="inbox-controls">
        <button className={scope === 'project' ? 'active' : ''} onClick={() => onScopeChange('project')} type="button">
          Project
        </button>
        <button className={scope === 'all' ? 'active' : ''} onClick={() => onScopeChange('all')} type="button">
          All
        </button>
      </div>

      <div className="inbox-controls">
        {inboxKindFilters.map((filter) => (
          <button
            className={kindFilter === filter ? 'active' : ''}
            key={filter}
            onClick={() => onKindFilterChange(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {sortedItems.length === 0 ? (
        <p className="empty-state">No matching captures yet.</p>
      ) : (
        sortedItems.slice(0, 8).map((item) => (
          <div className={item.pinned ? 'task-row pinned' : 'task-row'} key={item.id}>
            <Circle size={16} />
            <div>
              <strong>{item.text}</strong>
              <small>{item.projectName} • {item.kind} • {formatTime(item.createdAt)}</small>
            </div>
            <div className="item-actions">
              <button aria-label="Pin item" onClick={() => onPin(item.id)} type="button"><Pin size={13} /></button>
              <button aria-label="Archive item" onClick={() => onArchive(item.id)} type="button"><Archive size={13} /></button>
            </div>
          </div>
        ))
      )}
    </article>
  )
}
