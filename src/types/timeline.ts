export type TimelineEventType = 'capture' | 'pin' | 'archive' | 'project'

export type TimelineEvent = {
  id: string
  type: TimelineEventType
  title: string
  projectId: string
  projectName: string
  createdAt: string
}
