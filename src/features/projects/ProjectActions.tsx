import { Clipboard, Code2, ExternalLink, MessageSquareText } from 'lucide-react'
import type { CaptureItem } from '../../types/capture'
import type { Project } from '../../data/projects'
import '../../types/desktop'

type ProjectActionsProps = {
  project: Project
  items: CaptureItem[]
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
  const openVsCode = () => {
    window.nexusDesktop?.openWorkspace(project.workspacePath)
  }

  const openGitHub = () => {
    window.nexusDesktop?.openExternal(project.repositoryUrl)
  }

  const openChatGpt = () => {
    window.nexusDesktop?.openExternal(project.chatGptUrl)
  }

  const copyChatGptUpdate = () => {
    window.nexusDesktop?.copyText(buildChatGptUpdate(project, items))
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
    </section>
  )
}
