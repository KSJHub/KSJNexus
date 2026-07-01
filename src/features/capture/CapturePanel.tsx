import { Send } from 'lucide-react'
import { useState } from 'react'
import { projects } from '../../data/projects'
import type { CaptureItem, CaptureKind } from '../../types/capture'

type CapturePanelProps = {
  activeProjectId: string
  onCapture: (item: CaptureItem) => void
}

const captureKinds: CaptureKind[] = ['task', 'note', 'idea', 'reminder']

export function CapturePanel({ activeProjectId, onCapture }: CapturePanelProps) {
  const [text, setText] = useState('')
  const [kind, setKind] = useState<CaptureKind>('note')

  const handleSave = () => {
    const trimmed = text.trim()

    if (!trimmed) {
      return
    }

    const project = projects.find((item) => item.id === activeProjectId)

    onCapture({
      id: crypto.randomUUID(),
      text: trimmed,
      projectId: activeProjectId,
      projectName: project?.name ?? 'KSJ Nexus',
      kind,
      createdAt: new Date().toISOString(),
      completed: false,
    })

    setText('')
  }

  return (
    <section className="quick-note">
      <div className="section-heading">
        <span>Quick capture</span>
        <small>saved locally</small>
      </div>
      <textarea
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a note while you work..."
        rows={5}
        value={text}
      />
      <div className="capture-options">
        {captureKinds.map((captureKind) => (
          <button
            className={kind === captureKind ? 'active' : ''}
            key={captureKind}
            onClick={() => setKind(captureKind)}
            type="button"
          >
            {captureKind}
          </button>
        ))}
      </div>
      <div className="capture-row">
        <span className="active-project-label">
          {projects.find((project) => project.id === activeProjectId)?.name ?? 'KSJ Nexus'}
        </span>
        <button onClick={handleSave} type="button"><Send size={14} /> Save</button>
      </div>
    </section>
  )
}
