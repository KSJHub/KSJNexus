import { app, BrowserWindow, Menu, clipboard, dialog, ipcMain, shell } from 'electron'
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const DEV_URL = 'http://localhost:5174/KSJNexus/'
const isDev = !app.isPackaged
let mainWindow = null

function log(message) {
  console.log(`[KSJ Nexus] ${message}`)
}

async function loadApp(window) {
  try {
    if (isDev) {
      log(`Loading dev server: ${DEV_URL}`)
      await window.loadURL(DEV_URL)
      return
    }

    const indexPath = path.join(app.getAppPath(), 'dist/index.html')
    log(`Loading production file: ${indexPath}`)
    await window.loadFile(indexPath)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    log(`Failed to load app: ${message}`)

    dialog.showErrorBox(
      'KSJ Nexus failed to start',
      isDev
        ? `The desktop window opened, but the Vite dev server could not be loaded.\n\nExpected: ${DEV_URL}\n\nRun npm run dev, not npx electron .`
        : `The built app could not be loaded.\n\n${message}`,
    )

    window.show()
  }
}

function createWindow() {
  log('Creating desktop window')
  Menu.setApplicationMenu(null)

  mainWindow = new BrowserWindow({
    width: 860,
    height: 640,
    minWidth: 760,
    minHeight: 560,
    title: 'KSJ Nexus',
    backgroundColor: '#050811',
    autoHideMenuBar: true,
    frame: false,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), 'electron/preload.js'),
    },
  })

  mainWindow.once('ready-to-show', () => {
    log('Desktop window ready')
    mainWindow.show()
  })

  mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription, validatedUrl) => {
    log(`Load failed (${errorCode}) ${errorDescription}: ${validatedUrl}`)
  })

  mainWindow.webContents.on('render-process-gone', (_event, details) => {
    log(`Renderer process gone: ${details.reason}`)
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  void loadApp(mainWindow)
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
      void shell.openPath(targetPath)
    }
  })

  return { ok: true }
})

app.whenReady().then(() => {
  log('Electron ready')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  log('All windows closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
