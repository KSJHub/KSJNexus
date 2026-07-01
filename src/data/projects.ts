export type Project = {
  id: string
  name: string
  description: string
  icon: string
  repository: string
  workspace: string
}

export const projects: Project[] = [
  {
    id: 'ksj-nexus',
    name: 'KSJ Nexus',
    description: 'Desktop companion, capture engine and project context',
    icon: '◆',
    repository: 'KSJHub/KSJNexus',
    workspace: 'KSJ Nexus',
  },
  {
    id: 'ksj-digital',
    name: 'KSJ Digital',
    description: 'Websites, systems, client tools',
    icon: '◈',
    repository: 'KSJHub/KSJ-Digital',
    workspace: 'KSJ Digital',
  },
  {
    id: 'ksj-diamond-gaming',
    name: 'KSJ Diamond Gaming',
    description: 'Streaming, content, brand assets',
    icon: '◇',
    repository: 'KSJHub/KSJ-Diamond-Gaming',
    workspace: 'KSJ Diamond Gaming',
  },
  {
    id: 'twotonetaj',
    name: 'TwoToneTaj',
    description: 'Community website and content',
    icon: '🐉',
    repository: 'KSJDiamondGaming/TwoToneTaj',
    workspace: 'TwoToneTaj',
  },
  {
    id: 'goliath',
    name: 'Goliath',
    description: 'Automation, tickets, deployment tools',
    icon: '⚙',
    repository: 'KSJHub/Goliath',
    workspace: 'Goliath',
  },
  {
    id: 'personal',
    name: 'Personal',
    description: 'Private notes, reminders and loose ideas',
    icon: '□',
    repository: 'Not linked yet',
    workspace: 'Personal',
  },
]
