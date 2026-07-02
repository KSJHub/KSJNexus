import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('nexusDesktop', {
  copyText: (text) => ipcRenderer.invoke('nexus:copy-text', text),
  openExternal: (url) => ipcRenderer.invoke('nexus:open-external', url),
  openWorkspace: (workspacePath) => ipcRenderer.invoke('nexus:open-workspace', workspacePath),
  windowClose: () => ipcRenderer.invoke('nexus:window-close'),
  windowMinimise: () => ipcRenderer.invoke('nexus:window-minimise'),
  windowToggleAlwaysOnTop: () => ipcRenderer.invoke('nexus:window-toggle-always-on-top'),
  windowToggleSize: () => ipcRenderer.invoke('nexus:window-toggle-size'),
})
