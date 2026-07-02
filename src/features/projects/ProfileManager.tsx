import { Save, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ProjectProfile } from '../../types/project-profile'

type ProfileManagerProps = {
  project: ProjectProfile
  onSave: (project: ProjectProfile) => void
}

export function ProfileManager({ project, onSave }: ProfileManagerProps) {
  const [draft, setDraft] = useState<ProjectProfile>(project)

  useEffect(() => {
    setDraft(project)
  }, [project])

  const updateField = (field: keyof ProjectProfile, value: string) => {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }))
  }

  return (
    <section className="profile-manager">
      <div className="section-heading">
        <span><Settings size={14} /> Profile</span>
        <small>editable</small>
      </div>
      <div className="profile-fields">
        <label>
          <span>Workspace path</span>
          <input value={draft.workspacePath} onChange={(event) => updateField('workspacePath', event.target.value)} />
        </label>
        <label>
          <span>GitHub repo</span>
          <input value={draft.repositoryUrl} onChange={(event) => updateField('repositoryUrl', event.target.value)} />
        </label>
        <label>
          <span>Website</span>
          <input value={draft.websiteUrl} onChange={(event) => updateField('websiteUrl', event.target.value)} />
        </label>
        <label>
          <span>ChatGPT</span>
          <input value={draft.chatGptUrl} onChange={(event) => updateField('chatGptUrl', event.target.value)} />
        </label>
      </div>
      <button className="save-profile-button" onClick={() => onSave(draft)} type="button">
        <Save size={14} /> Save profile
      </button>
    </section>
  )
}
