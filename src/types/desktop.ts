export type DesktopActionResult = {
  ok: boolean
  error?: string
  pinned?: boolean
  expanded?: boolean
}

export type NexusDesktopApi = {
  copyText: (text: string) => Promise<DesktopActionResult>
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
