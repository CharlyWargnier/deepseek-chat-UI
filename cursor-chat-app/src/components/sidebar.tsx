"use client"

import { Button } from "@/components/ui/button"
import { Settings, Trash2, MessageSquare, Brain } from "lucide-react"
import { ExportMenu } from "./export-menu"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface SidebarProps {
  onOpenSettings: () => void
  onClearChat: () => void
  messages: Message[]
}

export function Sidebar({ onOpenSettings, onClearChat, messages }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 p-4 flex flex-col h-full">
      {/* Brand Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-gray-800">AI Chat</span>
        </div>
        <p className="text-xs text-gray-600">
          Advanced reasoning with DeepSeek
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3 flex-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10"
          onClick={onOpenSettings}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>

        {messages.length > 0 && (
          <>
            <ExportMenu messages={messages} />
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onClearChat}
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </Button>
          </>
        )}
      </div>

      {/* Stats */}
      {messages.length > 0 && (
        <div className="pt-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MessageSquare className="w-4 h-4" />
            <span>{messages.length} messages</span>
          </div>
        </div>
      )}
    </div>
  )
} 