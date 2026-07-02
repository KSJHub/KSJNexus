import { Clipboard, Code2, ExternalLink, Globe, MessageSquareText, Rocket } from 'lucide-react'
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
    `Description: ${project.description}`,
    `Repository: ${project.repository}`,
    `Workspace: ${project.workspace}`,
    `Website: ${project.websiteUrl || 'Not set'}`,
    `Notes: ${project.notes}`,
    '',
    'Latest captures:',
    latestItems || '- No captures yet.',
    '',
    'Next action:',
    'Use this project profile and capture context to continue the current work.',
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

  const openWebsite = async () => {
    if (!project.websiteUrl) {
      setFeedback({ kind: 'warning', message: 'Website URL is not set for this project.' })
      return
    }

    await window.nexusDesktop?.openExternal(project.websiteUrl)
    setFeedback({ kind: 'success', message: `Opening ${project.name} website.` })
  }

  const openChatGpt = async () => {
    await window.nexusDesktop?.openExternal(project.chatGptUrl)
    setFeedback({ kind: 'success', message: 'Opening ChatGPT.' })
  }

  const copyChatGptUpdate = async () => {
    await window.nexusDesktop?.copyText(buildChatGptUpdate(project, items))
    setFeedback({ kind: 'success', message: 'Project profile copied for ChatGPT.' })
  }

  const openWorkspaceBundle = async () => {
    const workspaceResult = await window.nexusDesktop?.openWorkspace(project.workspacePath)
    await window.nexusDesktop?.openExternal(project.repositoryUrl)
    await window.nexusDesktop?.openExternal(project.chatGptUrl)

    if (project.websiteUrl) {
      await window.nexusDesktop?.openExternal(project.websiteUrl)
    }

    if (workspaceResult?.ok === false) {
      setFeedback({ kind: 'warning', message: `Workspace launched, but VS Code path needs setting for ${project.name}.` })
      return
    }

    setFeedback({ kind: 'success', message: `${project.name} workspace launched.` })
  }

  return (
    <section className="mini-panel project-actions">
      <div className="section-heading">
        <span>Actions</span>
        <small>profile tools</small>
      </div>
      <div className="action-grid">
        <button className="primary-action" onClick={openWorkspaceBundle} type="button"><Rocket size={14} /> Open Workspace</button>
        <button onClick={openVsCode} type="button"><Code2 size={14} /> VS Code</button>
        <button onClick={openGitHub} type="button"><ExternalLink size={14} /> GitHub</button>
        <button onClick={openWebsite} type="button"><Globe size={14} /> Website</button>
        <button onClick={openChatGpt} type="button"><MessageSquareText size={14} /> ChatGPT</button>
        <button onClick={copyChatGptUpdate} type="button"><Clipboard size={14} /> Copy profile</button>
      </div>
      <p className={`action-feedback ${feedback.kind}`}>{feedback.message}</p>
    </section>
  )
}
