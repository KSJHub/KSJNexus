export type CaptureKind = 'task' | 'note' | 'idea' | 'reminder'

export type CaptureItem = {
  id: string
  text: string
  projectId: string
  projectName: string
  kind: CaptureKind
  createdAt: string
  completed: boolean
}
