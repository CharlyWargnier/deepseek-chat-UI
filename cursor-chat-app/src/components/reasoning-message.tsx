"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Brain } from "lucide-react"
import { Card } from "@/components/ui/card"
import { MarkdownContent } from "./markdown-content"

interface ReasoningMessageProps {
  content: string
  timestamp: Date
}

interface ParsedContent {
  thinking: string
  response: string
}

function parseReasoningContent(content: string): ParsedContent {
  // Check for <think> tags
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>([\s\S]*)/);
  if (thinkMatch) {
    return {
      thinking: thinkMatch[1].trim(),
      response: thinkMatch[2].trim()
    };
  }

  // Check for other thinking patterns (some models use different formats)
  const altThinkMatch = content.match(/\*\*Thinking:\*\*([\s\S]*?)\*\*Response:\*\*([\s\S]*)/i);
  if (altThinkMatch) {
    return {
      thinking: altThinkMatch[1].trim(),
      response: altThinkMatch[2].trim()
    };
  }

  // If no thinking section found, return all as response
  return {
    thinking: "",
    response: content
  };
}

export function ReasoningMessage({ content, timestamp }: ReasoningMessageProps) {
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(false)
  const parsed = parseReasoningContent(content)

  return (
    <div className="space-y-2">
      {/* Thinking Section (if present) */}
      {parsed.thinking && (
        <Card className="bg-gray-50 border-gray-200">
          <div
            className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
          >
            <Brain className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Thinking Process</span>
            {isThinkingExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
            )}
          </div>
          
          {isThinkingExpanded && (
            <div className="px-3 pb-3">
              <div className="bg-white rounded border p-3">
                <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">
                  {parsed.thinking}
                </pre>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Final Response */}
      <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
        <MarkdownContent 
          content={parsed.response} 
          className="text-sm leading-relaxed"
        />
        <p className="text-xs text-gray-500 mt-2">
          {timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
} 