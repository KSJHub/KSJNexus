import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('nexusDesktop', {
  copyText: (text) => ipcRenderer.invoke('nexus:copy-text', text),
  getGitStatus: (workspacePath) => ipcRenderer.invoke('nexus:get-git-status', workspacePath),
  openExternal: (url) => ipcRenderer.invoke('nexus:open-external', url),
  openFolder: (workspacePath) => ipcRenderer.invoke('nexus:open-folder', workspacePath),
  openTerminal: (workspacePath) => ipcRenderer.invoke('nexus:open-terminal', workspacePath),
  openWorkspace: (workspacePath) => ipcRenderer.invoke('nexus:open-workspace', workspacePath),
  startDevServer: (workspacePath) => ipcRenderer.invoke('nexus:start-dev-server', workspacePath),
  stopDevServer: () => ipcRenderer.invoke('nexus:stop-dev-server'),
  windowClose: () => ipcRenderer.invoke('nexus:window-close'),
  windowMinimise: () => ipcRenderer.invoke('nexus:window-minimise'),
  windowToggleAlwaysOnTop: () => ipcRenderer.invoke('nexus:window-toggle-always-on-top'),
  windowToggleSize: () => ipcRenderer.invoke('nexus:window-toggle-size'),
})
