import { Activity, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { ProjectScanResult } from '../../types/desktop'
import type { ProjectProfile } from '../../types/project-profile'
import '../../types/desktop'

type ProjectHealthPanelProps = {
  project: ProjectProfile
}

export function ProjectHealthPanel({ project }: ProjectHealthPanelProps) {
  const [scan, setScan] = useState<ProjectScanResult>({ ok: false, error: 'Not scanned yet.' })
  const [isLoading, setIsLoading] = useState(false)

  const refreshScan = useCallback(async () => {
    setIsLoading(true)
    const result = await window.nexusDesktop?.getProjectScan(project.workspacePath)
    setScan(result ?? { ok: false, error: 'Desktop bridge is not available.' })
    setIsLoading(false)
  }, [project.workspacePath])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void refreshScan()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [refreshScan])

  return (
    <section className="project-health-panel">
      <div className="section-heading">
        <span><Activity size={14} /> Health</span>
        <button onClick={refreshScan} type="button"><RefreshCw size={13} /> {isLoading ? 'Scanning' : 'Scan'}</button>
      </div>

      {scan.ok ? (
        <div className="health-grid">
          <span><small>Framework</small><strong>{scan.framework}</strong></span>
          <span><small>Language</small><strong>{scan.language}</strong></span>
          <span><small>Package</small><strong>{scan.packageManager}</strong></span>
          <span><small>README</small><strong>{scan.hasReadme ? 'Yes' : 'No'}</strong></span>
          <span><small>Git</small><strong>{scan.hasGit ? 'Yes' : 'No'}</strong></span>
          <span><small>CI</small><strong>{scan.hasWorkflows ? 'Yes' : 'No'}</strong></span>
        </div>
      ) : (
        <p className="health-error">{scan.error}</p>
      )}
    </section>
  )
}
