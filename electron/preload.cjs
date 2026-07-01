const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nexusDesktop', {
  copyText: (text) => ipcRenderer.invoke('nexus:copy-text', text),
  openExternal: (url) => ipcRenderer.invoke('nexus:open-external', url),
  openWorkspace: (workspacePath) => ipcRenderer.invoke('nexus:open-workspace', workspacePath),
})
