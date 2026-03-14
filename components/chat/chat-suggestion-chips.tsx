"use client"

import { Button } from "@/components/ui/button"
import { mockChatSuggestions } from "@/lib/mock-data"

interface ChatSuggestionChipsProps {
  onSelect: (suggestion: string) => void
}

export function ChatSuggestionChips({ onSelect }: ChatSuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {mockChatSuggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="outline"
          size="sm"
          className="rounded-full text-xs"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}
