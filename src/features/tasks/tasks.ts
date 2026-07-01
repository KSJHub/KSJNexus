export type TaskStatus = 'done' | 'next'

export type Task = {
  id: string
  title: string
  project: string
  status: TaskStatus
}

export const tasks: Task[] = [
  {
    id: 'foundation-shell',
    title: 'Build the Nexus foundation shell',
    project: 'KSJ Nexus',
    status: 'done',
  },
  {
    id: 'task-module-structure',
    title: 'Create the first task module structure',
    project: 'KSJ Nexus',
    status: 'next',
  },
  {
    id: 'local-task-saving',
    title: 'Add local task saving',
    project: 'KSJ Nexus',
    status: 'next',
  },
]
