export type DesktopActionResult = {
  ok: boolean
  error?: string
}

export type NexusDesktopApi = {
  copyText: (text: string) => Promise<DesktopActionResult>
  openExternal: (url: string) => Promise<DesktopActionResult>
  openWorkspace: (workspacePath: string) => Promise<DesktopActionResult>
}

declare global {
  interface Window {
    nexusDesktop?: NexusDesktopApi
  }
}

export {}
