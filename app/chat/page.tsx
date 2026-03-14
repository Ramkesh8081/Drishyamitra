"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatSuggestionChips } from "@/components/chat/chat-suggestion-chips"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { mockPhotos, mockChatMessages } from "@/lib/mock-data"

interface Photo {
  id: string
  filename: string
  thumbnail: string
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
  photos?: Photo[]
  action?: "view" | "email" | "success"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockChatMessages as Message[])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const generateResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase()
    const time = getCurrentTime()

    // Check for email-related queries
    if (lowerQuery.includes("send") && lowerQuery.includes("email")) {
      const personMatch = lowerQuery.match(/(?:of|with)\s+(\w+)/i)
      const person = personMatch ? personMatch[1] : null
      
      const matchingPhotos = person
        ? mockPhotos.filter((p) =>
            p.persons.some((per) => per.toLowerCase().includes(person.toLowerCase()))
          )
        : mockPhotos.slice(0, 3)

      return {
        id: Math.random().toString(36).slice(2),
        type: "assistant",
        content: `I found ${matchingPhotos.length} photos${person ? ` of ${person}` : ""}. Would you like me to send them?`,
        timestamp: time,
        photos: matchingPhotos.slice(0, 5),
        action: "email",
      }
    }

    // Check for photo search queries
    if (
      lowerQuery.includes("show") ||
      lowerQuery.includes("find") ||
      lowerQuery.includes("photos of") ||
      lowerQuery.includes("pictures")
    ) {
      // Extract person name
      const personMatch = lowerQuery.match(/(?:of|with)\s+(\w+)/i)
      const person = personMatch ? personMatch[1] : null

      // Extract event
      const eventMatch = lowerQuery.match(/(?:from|at|during)\s+(\w+(?:\s+\d+)?)/i)
      const event = eventMatch ? eventMatch[1] : null

      let matchingPhotos = mockPhotos

      if (person) {
        matchingPhotos = matchingPhotos.filter((p) =>
          p.persons.some((per) => per.toLowerCase().includes(person.toLowerCase()))
        )
      }

      if (event) {
        matchingPhotos = matchingPhotos.filter(
          (p) =>
            p.event.toLowerCase().includes(event.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(event.toLowerCase()))
        )
      }

      if (matchingPhotos.length === 0) {
        return {
          id: Math.random().toString(36).slice(2),
          type: "assistant",
          content: "I couldn't find any photos matching your search. Try different keywords or check the gallery.",
          timestamp: time,
        }
      }

      return {
        id: Math.random().toString(36).slice(2),
        type: "assistant",
        content: `I found ${matchingPhotos.length} photo${matchingPhotos.length > 1 ? "s" : ""} matching your search.`,
        timestamp: time,
        photos: matchingPhotos.slice(0, 6),
        action: "view",
      }
    }

    // Default response
    return {
      id: Math.random().toString(36).slice(2),
      type: "assistant",
      content:
        "I can help you find photos, search by person or event, and send photos via email. Try asking something like 'Show me photos of Grandma' or 'Find beach photos from vacation'.",
      timestamp: time,
    }
  }

  const handleSend = async (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).slice(2),
      type: "user",
      content: text,
      timestamp: getCurrentTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate and add response
    const response = generateResponse(text)
    setMessages((prev) => [...prev, response])
    setIsTyping(false)
  }

  const handleViewPhotos = (photos: Photo[]) => {
    toast.info(`Viewing ${photos.length} photos`)
  }

  const handleSendEmail = () => {
    // Add success message
    const successMessage: Message = {
      id: Math.random().toString(36).slice(2),
      type: "assistant",
      content: "Photos have been sent to the specified email address.",
      timestamp: getCurrentTime(),
      action: "success",
    }
    setMessages((prev) => [...prev, successMessage])
    toast.success("Email sent successfully!")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardNavbar />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Chat Assistant</h1>
                <p className="text-sm text-muted-foreground">
                  Search and share photos using natural language
                </p>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <Card className="mb-4 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                Try asking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChatSuggestionChips onSelect={(s) => handleSend(s)} />
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="flex flex-1 flex-col border-border/50">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onViewPhotos={handleViewPhotos}
                    onSendEmail={handleSendEmail}
                  />
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl bg-muted px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about your photos..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
