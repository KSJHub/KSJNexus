import type { ProjectProfile } from '../../types/project-profile'

type ProfileManagerProps = {
  project: ProjectProfile
  onSave: (project: ProjectProfile) => void
}

export function ProfileManager({ project, onSave }: ProfileManagerProps) {
  return (
    <section className="profile-manager">
      <div className="section-heading">
        <span>Profile</span>
        <small>editable</small>
      </div>
      <button className="save-profile-button" onClick={() => onSave(project)} type="button">
        Save profile
      </button>
    </section>
  )
}
