import { Clipboard, Code2, ExternalLink, MessageSquareText } from 'lucide-react'
import { useState } from 'react'
import type { CaptureItem } from '../../types/capture'
import type { Project } from '../../data/projects'
import '../../types/desktop'

type ProjectActionsProps = {
  project: Project
  items: CaptureItem[]
}

type FeedbackKind = 'ready' | 'success' | 'warning'

type Feedback = {
  kind: FeedbackKind
  message: string
}

function buildChatGptUpdate(project: Project, items: CaptureItem[]) {
  const projectItems = items.filter((item) => item.projectId === project.id)
  const latestItems = projectItems.slice(0, 5).map((item) => `- ${item.kind}: ${item.text}`).join('\n')

  return [
    `KSJ Nexus Update`,
    `Project: ${project.name}`,
    `Repository: ${project.repository}`,
    `Workspace: ${project.workspace}`,
    '',
    'Latest captures:',
    latestItems || '- No captures yet.',
    '',
    'Next action:',
    'Use this project context to continue from the current Nexus state.',
  ].join('\n')
}

export function ProjectActions({ project, items }: ProjectActionsProps) {
  const [feedback, setFeedback] = useState<Feedback>({
    kind: 'ready',
    message: 'Ready for project actions.',
  })

  const openVsCode = async () => {
    const result = await window.nexusDesktop?.openWorkspace(project.workspacePath)

    if (result?.ok) {
      setFeedback({ kind: 'success', message: `Opening ${project.workspace} in VS Code.` })
      return
    }

    setFeedback({
      kind: 'warning',
      message: result?.error ?? 'Workspace path is not set yet.',
    })
  }

  const openGitHub = async () => {
    await window.nexusDesktop?.openExternal(project.repositoryUrl)
    setFeedback({ kind: 'success', message: `Opening ${project.repository}.` })
  }

  const openChatGpt = async () => {
    await window.nexusDesktop?.openExternal(project.chatGptUrl)
    setFeedback({ kind: 'success', message: 'Opening ChatGPT.' })
  }

  const copyChatGptUpdate = async () => {
    await window.nexusDesktop?.copyText(buildChatGptUpdate(project, items))
    setFeedback({ kind: 'success', message: 'Project update copied for ChatGPT.' })
  }

  return (
    <section className="mini-panel project-actions">
      <div className="section-heading">
        <span>Actions</span>
        <small>launch work</small>
      </div>
      <div className="action-grid">
        <button onClick={openVsCode} type="button"><Code2 size={14} /> VS Code</button>
        <button onClick={openGitHub} type="button"><ExternalLink size={14} /> GitHub</button>
        <button onClick={openChatGpt} type="button"><MessageSquareText size={14} /> ChatGPT</button>
        <button onClick={copyChatGptUpdate} type="button"><Clipboard size={14} /> Copy update</button>
      </div>
      <p className={`action-feedback ${feedback.kind}`}>{feedback.message}</p>
    </section>
  )
}
