import { FolderOpen, Play, Square, Terminal } from 'lucide-react'
import { useState } from 'react'
import type { ProjectProfile } from '../../types/project-profile'
import '../../types/desktop'

type WorkspaceControlsProps = {
  project: ProjectProfile
}

export function WorkspaceControls({ project }: WorkspaceControlsProps) {
  const [message, setMessage] = useState('Workspace ready.')
  const [isRunning, setIsRunning] = useState(false)

  const openFolder = async () => {
    const result = await window.nexusDesktop?.openFolder(project.workspacePath)
    setMessage(result?.ok ? 'Folder opened.' : result?.error ?? 'Could not open folder.')
  }

  const openTerminal = async () => {
    const result = await window.nexusDesktop?.openTerminal(project.workspacePath)
    setMessage(result?.ok ? 'Terminal opened.' : result?.error ?? 'Could not open terminal.')
  }

  const startServer = async () => {
    const result = await window.nexusDesktop?.startDevServer(project.workspacePath)
    setIsRunning(Boolean(result?.running))
    setMessage(result?.ok ? 'Dev server running.' : result?.error ?? 'Could not start dev server.')
  }

  const stopServer = async () => {
    const result = await window.nexusDesktop?.stopDevServer()
    setIsRunning(Boolean(result?.running))
    setMessage(result?.ok ? 'Dev server stopped.' : result?.error ?? 'Could not stop dev server.')
  }

  return (
    <section className="workspace-controls-panel">
      <div className="section-heading">
        <span>Workspace</span>
        <small>{isRunning ? 'server running' : 'server stopped'}</small>
      </div>
      <div className="workspace-control-grid">
        <button onClick={openFolder} type="button"><FolderOpen size={14} /> Folder</button>
        <button onClick={openTerminal} type="button"><Terminal size={14} /> Terminal</button>
        <button onClick={startServer} type="button"><Play size={14} /> Start</button>
        <button onClick={stopServer} type="button"><Square size={14} /> Stop</button>
      </div>
      <p className="workspace-feedback">{message}</p>
    </section>
  )
}
