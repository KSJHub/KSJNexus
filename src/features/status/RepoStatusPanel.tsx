import { GitBranch, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { GitStatusResult } from '../../types/desktop'
import type { ProjectProfile } from '../../types/project-profile'
import '../../types/desktop'

type RepoStatusPanelProps = {
  project: ProjectProfile
}

export function RepoStatusPanel({ project }: RepoStatusPanelProps) {
  const [status, setStatus] = useState<GitStatusResult>({ ok: false, error: 'Not checked yet.' })
  const [isLoading, setIsLoading] = useState(false)

  const refreshStatus = async () => {
    setIsLoading(true)
    const result = await window.nexusDesktop?.getGitStatus(project.workspacePath)
    setStatus(result ?? { ok: false, error: 'Desktop bridge is not available.' })
    setIsLoading(false)
  }

  useEffect(() => {
    void refreshStatus()
  }, [project.id, project.workspacePath])

  return (
    <section className="repo-status-panel">
      <div className="section-heading">
        <span><GitBranch size={14} /> Repo</span>
        <button onClick={refreshStatus} type="button"><RefreshCw size={13} /> {isLoading ? 'Checking' : 'Refresh'}</button>
      </div>

      {status.ok ? (
        <div className="repo-status-grid">
          <span><small>Branch</small><strong>{status.branch}</strong></span>
          <span><small>Status</small><strong>{status.clean ? 'Clean' : `${status.changedFiles} changed`}</strong></span>
          <span className="repo-commit"><small>Last commit</small><strong>{status.lastCommit?.hash} — {status.lastCommit?.message}</strong><em>{status.lastCommit?.time}</em></span>
        </div>
      ) : (
        <p className="repo-status-error">{status.error}</p>
      )}
    </section>
  )
}
