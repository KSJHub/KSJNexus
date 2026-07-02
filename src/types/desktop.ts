export type GitStatusResult = {
  ok: boolean
  error?: string
  branch?: string
  changedFiles?: number
  clean?: boolean
  lastCommit?: {
    hash: string
    message: string
    time: string
  }
}

export type ProjectScanResult = {
  ok: boolean
  error?: string
  packageManager?: string
  framework?: string
  language?: string
  hasReadme?: boolean
  hasGit?: boolean
  hasEnv?: boolean
  hasDocker?: boolean
  hasWorkflows?: boolean
  scripts?: {
    dev?: string
    build?: string
    lint?: string
    test?: string
  }
}

export type DesktopActionResult = {
  ok: boolean
  error?: string
  pinned?: boolean
  expanded?: boolean
  running?: boolean
}

export type NexusDesktopApi = {
  copyText: (text: string) => Promise<DesktopActionResult>
  getGitStatus: (workspacePath: string) => Promise<GitStatusResult>
  getProjectScan: (workspacePath: string) => Promise<ProjectScanResult>
  openExternal: (url: string) => Promise<DesktopActionResult>
  openFolder: (workspacePath: string) => Promise<DesktopActionResult>
  openTerminal: (workspacePath: string) => Promise<DesktopActionResult>
  openWorkspace: (workspacePath: string) => Promise<DesktopActionResult>
  startDevServer: (workspacePath: string) => Promise<DesktopActionResult>
  stopDevServer: () => Promise<DesktopActionResult>
  windowClose: () => Promise<DesktopActionResult>
  windowMinimise: () => Promise<DesktopActionResult>
  windowToggleAlwaysOnTop: () => Promise<DesktopActionResult>
  windowToggleSize: () => Promise<DesktopActionResult>
}

declare global {
  interface Window {
    nexusDesktop?: NexusDesktopApi
  }
}

export {}
