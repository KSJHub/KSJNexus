import type { CaptureKind } from '../../types/capture'

export type InboxScope = 'project' | 'all'
export type InboxKindFilter = 'all' | CaptureKind

export const inboxKindFilters: InboxKindFilter[] = ['all', 'task', 'note', 'idea', 'reminder']
