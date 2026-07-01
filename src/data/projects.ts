export type Project = {
  id: string
  name: string
  description: string
  icon: string
  repository: string
  repositoryUrl: string
  workspace: string
  workspacePath: string
  chatGptUrl: string
}

export const projects: Project[] = [
  {
    id: 'ksj-nexus',
    name: 'KSJ Nexus',
    description: 'Desktop companion, capture engine and project context',
    icon: '◆',
    repository: 'KSJHub/KSJNexus',
    repositoryUrl: 'https://github.com/KSJHub/KSJNexus',
    workspace: 'KSJ Nexus',
    workspacePath: 'C:\\Users\\Morgz\\OneDrive\\KSJ HUB\\KSJ Hub\\KSJ Nexus',
    chatGptUrl: 'https://chatgpt.com/',
  },
  {
    id: 'ksj-digital',
    name: 'KSJ Digital',
    description: 'Websites, systems, client tools',
    icon: '◈',
    repository: 'KSJHub/KSJ-Digital',
    repositoryUrl: 'https://github.com/KSJHub/KSJ-Digital',
    workspace: 'KSJ Digital',
    workspacePath: '',
    chatGptUrl: 'https://chatgpt.com/',
  },
  {
    id: 'ksj-diamond-gaming',
    name: 'KSJ Diamond Gaming',
    description: 'Streaming, content, brand assets',
    icon: '◇',
    repository: 'KSJHub/KSJ-Diamond-Gaming',
    repositoryUrl: 'https://github.com/KSJHub/KSJ-Diamond-Gaming',
    workspace: 'KSJ Diamond Gaming',
    workspacePath: '',
    chatGptUrl: 'https://chatgpt.com/',
  },
  {
    id: 'twotonetaj',
    name: 'TwoToneTaj',
    description: 'Community website and content',
    icon: '🐉',
    repository: 'KSJDiamondGaming/TwoToneTaj',
    repositoryUrl: 'https://github.com/KSJDiamondGaming/TwoToneTaj',
    workspace: 'TwoToneTaj',
    workspacePath: '',
    chatGptUrl: 'https://chatgpt.com/',
  },
  {
    id: 'goliath',
    name: 'Goliath',
    description: 'Automation, tickets, deployment tools',
    icon: '⚙',
    repository: 'KSJHub/Goliath',
    repositoryUrl: 'https://github.com/KSJHub/Goliath',
    workspace: 'Goliath',
    workspacePath: '',
    chatGptUrl: 'https://chatgpt.com/',
  },
  {
    id: 'personal',
    name: 'Personal',
    description: 'Private notes, reminders and loose ideas',
    icon: '□',
    repository: 'Not linked yet',
    repositoryUrl: 'https://github.com/KSJHub',
    workspace: 'Personal',
    workspacePath: '',
    chatGptUrl: 'https://chatgpt.com/',
  },
]
