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

export type DesktopActionResult = {
  ok: boolean
  error?: string
  pinned?: boolean
  expanded?: boolean
}

export type NexusDesktopApi = {
  copyText: (text: string) => Promise<DesktopActionResult>
  getGitStatus: (workspacePath: string) => Promise<GitStatusResult>
  openExternal: (url: string) => Promise<DesktopActionResult>
  openWorkspace: (workspacePath: string) => Promise<DesktopActionResult>
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
