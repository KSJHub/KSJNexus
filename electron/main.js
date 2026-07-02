import { app, BrowserWindow, Menu, clipboard, dialog, ipcMain, shell } from 'electron'
import { execFile, spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const DEV_URL = 'http://localhost:5174/KSJNexus/'
const isDev = !app.isPackaged
let mainWindow = null
let isExpanded = false
let devServerProcess = null

const companionBounds = {
  width: 860,
  height: 640,
}

const expandedBounds = {
  width: 1180,
  height: 760,
}

function log(message) {
  console.log(`[KSJ Nexus] ${message}`)
}

function getMainWindow() {
  return BrowserWindow.getFocusedWindow() ?? mainWindow
}

function isValidWorkspacePath(workspacePath) {
  const targetPath = String(workspacePath ?? '')
  return targetPath && existsSync(targetPath) ? targetPath : null
}

function runGit(workspacePath, args) {
  return new Promise((resolve, reject) => {
    execFile('git', ['-C', workspacePath, ...args], (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message))
        return
      }

      resolve(String(stdout).trim())
    })
  })
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
    width: companionBounds.width,
    height: companionBounds.height,
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

ipcMain.handle('nexus:get-git-status', async (_event, workspacePath) => {
  const targetPath = isValidWorkspacePath(workspacePath)

  if (!targetPath) {
    return { ok: false, error: 'Workspace path is not set or does not exist.' }
  }

  try {
    const branch = await runGit(targetPath, ['branch', '--show-current'])
    const statusOutput = await runGit(targetPath, ['status', '--short'])
    const lastCommit = await runGit(targetPath, ['log', '-1', '--pretty=format:%h|%s|%cr'])
    const changedFiles = statusOutput ? statusOutput.split('\n').filter(Boolean).length : 0
    const [hash = '', message = 'No commits yet', time = ''] = String(lastCommit).split('|')

    return {
      ok: true,
      branch: branch || 'detached',
      changedFiles,
      clean: changedFiles === 0,
      lastCommit: {
        hash,
        message,
        time,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ok: false, error: message }
  }
})

ipcMain.handle('nexus:open-external', async (_event, url) => {
  await shell.openExternal(String(url))
  return { ok: true }
})

ipcMain.handle('nexus:open-folder', async (_event, workspacePath) => {
  const targetPath = isValidWorkspacePath(workspacePath)

  if (!targetPath) {
    return { ok: false, error: 'Workspace path is not set or does not exist.' }
  }

  await shell.openPath(targetPath)
  return { ok: true }
})

ipcMain.handle('nexus:open-terminal', async (_event, workspacePath) => {
  const targetPath = isValidWorkspacePath(workspacePath)

  if (!targetPath) {
    return { ok: false, error: 'Workspace path is not set or does not exist.' }
  }

  spawn('cmd.exe', ['/c', 'start', 'powershell.exe', '-NoExit', '-Command', `cd '${targetPath}'`], {
    detached: true,
    stdio: 'ignore',
  }).unref()

  return { ok: true }
})

ipcMain.handle('nexus:open-workspace', async (_event, workspacePath) => {
  const targetPath = isValidWorkspacePath(workspacePath)

  if (!targetPath) {
    return { ok: false, error: 'Workspace path is not set or does not exist.' }
  }

  execFile('code', [targetPath], (error) => {
    if (error) {
      void shell.openPath(targetPath)
    }
  })

  return { ok: true }
})

ipcMain.handle('nexus:start-dev-server', async (_event, workspacePath) => {
  const targetPath = isValidWorkspacePath(workspacePath)

  if (!targetPath) {
    return { ok: false, error: 'Workspace path is not set or does not exist.' }
  }

  if (devServerProcess) {
    return { ok: true, running: true }
  }

  devServerProcess = spawn('npm.cmd', ['run', 'dev'], {
    cwd: targetPath,
    detached: true,
    stdio: 'ignore',
  })

  devServerProcess.on('exit', () => {
    devServerProcess = null
  })

  devServerProcess.unref()
  return { ok: true, running: true }
})

ipcMain.handle('nexus:stop-dev-server', () => {
  if (!devServerProcess) {
    return { ok: true, running: false }
  }

  try {
    process.kill(-devServerProcess.pid)
  } catch {
    devServerProcess.kill()
  }

  devServerProcess = null
  return { ok: true, running: false }
})

ipcMain.handle('nexus:window-close', () => {
  getMainWindow()?.close()
  return { ok: true }
})

ipcMain.handle('nexus:window-minimise', () => {
  getMainWindow()?.minimize()
  return { ok: true }
})

ipcMain.handle('nexus:window-toggle-always-on-top', () => {
  const window = getMainWindow()

  if (!window) {
    return { ok: false, error: 'Window is not available.' }
  }

  const shouldPin = !window.isAlwaysOnTop()
  window.setAlwaysOnTop(shouldPin)

  return { ok: true, pinned: shouldPin }
})

ipcMain.handle('nexus:window-toggle-size', () => {
  const window = getMainWindow()

  if (!window) {
    return { ok: false, error: 'Window is not available.' }
  }

  isExpanded = !isExpanded
  window.setSize(
    isExpanded ? expandedBounds.width : companionBounds.width,
    isExpanded ? expandedBounds.height : companionBounds.height,
    true,
  )
  window.center()

  return { ok: true, expanded: isExpanded }
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
