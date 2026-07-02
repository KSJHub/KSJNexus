import type { ProjectProfile } from '../../types/project-profile'

type RepoStatusPanelProps = {
  project: ProjectProfile
}

export function RepoStatusPanel({ project }: RepoStatusPanelProps) {
  return (
    <section className="repo-status-panel">
      <div className="section-heading">
        <span>Repo</span>
        <small>{project.repository}</small>
      </div>
      <p className="repo-status-error">Repository status will appear here.</p>
    </section>
  )
}
