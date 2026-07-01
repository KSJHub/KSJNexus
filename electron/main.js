import { app, BrowserWindow, Menu, clipboard, ipcMain, shell } from 'electron'
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const isDev = !app.isPackaged
let mainWindow = null

function createWindow() {
  Menu.setApplicationMenu(null)

  mainWindow = new BrowserWindow({
    width: 430,
    height: 770,
    minWidth: 360,
    minHeight: 620,
    title: 'KSJ Nexus',
    backgroundColor: '#050811',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), 'electron/preload.js'),
    },
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173/KSJNexus/')
  } else {
    mainWindow.loadFile('dist/index.html')
  }
}

ipcMain.handle('nexus:copy-text', (_event, text) => {
  clipboard.writeText(String(text ?? ''))
  return { ok: true }
})

ipcMain.handle('nexus:open-external', async (_event, url) => {
  await shell.openExternal(String(url))
  return { ok: true }
})

ipcMain.handle('nexus:open-workspace', async (_event, workspacePath) => {
  const targetPath = String(workspacePath ?? '')

  if (!targetPath || !existsSync(targetPath)) {
    return { ok: false, error: 'Workspace path is not set or does not exist.' }
  }

  execFile('code', [targetPath], (error) => {
    if (error) {
      shell.openPath(targetPath)
    }
  })

  return { ok: true }
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
