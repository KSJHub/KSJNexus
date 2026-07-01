export type Project = {
  id: string
  name: string
  description: string
  taskCount: number
}

export const projects: Project[] = [
  {
    id: 'ksj-digital',
    name: 'KSJ Digital',
    description: 'Websites, systems, client tools',
    taskCount: 4,
  },
  {
    id: 'ksj-diamond-gaming',
    name: 'KSJ Diamond Gaming',
    description: 'Streaming, content, brand assets',
    taskCount: 6,
  },
  {
    id: 'twotonetaj',
    name: 'TwoToneTaj',
    description: 'Community website and content',
    taskCount: 3,
  },
  {
    id: 'goliath',
    name: 'Goliath',
    description: 'Automation, tickets, deployment tools',
    taskCount: 5,
  },
]
