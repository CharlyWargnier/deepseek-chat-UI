"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, Code, Hash } from "lucide-react"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ExportMenuProps {
  messages: Message[]
}

export function ExportMenu({ messages }: ExportMenuProps) {
  const exportAsJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      messageCount: messages.length,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp.toISOString()
      }))
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    downloadFile(blob, `chat-export-${formatDate(new Date())}.json`)
  }

  const exportAsText = () => {
    const content = messages.map(msg => {
      const time = msg.timestamp.toLocaleTimeString()
      const role = msg.role === 'user' ? 'You' : 'Assistant'
      return `[${time}] ${role}: ${msg.content}`
    }).join('\n\n')
    
    const blob = new Blob([content], { type: 'text/plain' })
    downloadFile(blob, `chat-export-${formatDate(new Date())}.txt`)
  }

  const exportAsMarkdown = () => {
    let content = `# Chat Export\n\n**Date:** ${new Date().toLocaleString()}\n\n**Messages:** ${messages.length}\n\n---\n\n`
    
    content += messages.map(msg => {
      const time = msg.timestamp.toLocaleTimeString()
      const role = msg.role === 'user' ? '👤 **You**' : '🤖 **Assistant**'
      return `## ${role} *(${time})*\n\n${msg.content}`
    }).join('\n\n---\n\n')
    
    const blob = new Blob([content], { type: 'text/markdown' })
    downloadFile(blob, `chat-export-${formatDate(new Date())}.md`)
  }

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  if (messages.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-3 h-10">
          <Download className="w-4 h-4" />
          Export Chat
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportAsJSON}>
          <Code className="w-4 h-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsText}>
          <FileText className="w-4 h-4 mr-2" />
          Export as Text
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsMarkdown}>
          <Hash className="w-4 h-4 mr-2" />
          Export as Markdown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 