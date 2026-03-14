"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, User, Eye, Mail, Check } from "lucide-react"
import { mockUsers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

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

interface ChatMessageProps {
  message: Message
  onViewPhotos?: (photos: Photo[]) => void
  onSendEmail?: () => void
}

export function ChatMessage({ message, onViewPhotos, onSendEmail }: ChatMessageProps) {
  const user = mockUsers[0]
  const isUser = message.type === "user"

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <Avatar className="h-8 w-8 shrink-0">
        {isUser ? (
          <>
            <AvatarImage src={user.avatar} alt={user.fullName} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>

      {/* Message Content */}
      <div
        className={cn(
          "max-w-[80%] space-y-3",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Message Bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>

        {/* Photo Results */}
        {message.photos && message.photos.length > 0 && (
          <Card className="overflow-hidden border-border/50">
            <CardContent className="p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Found {message.photos.length} photo{message.photos.length > 1 ? "s" : ""}
                </span>
                {onViewPhotos && (
                  <Button size="sm" variant="outline" onClick={() => onViewPhotos(message.photos!)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {message.photos.slice(0, 4).map((photo) => (
                  <div
                    key={photo.id}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border"
                  >
                    <img
                      src={photo.thumbnail}
                      alt={photo.filename}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                {message.photos.length > 4 && (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium text-muted-foreground">
                    +{message.photos.length - 4}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Email Action Card */}
        {message.action === "email" && (
          <Card className="border-border/50">
            <CardContent className="p-3">
              <p className="mb-3 text-sm text-muted-foreground">
                Ready to send photos via email?
              </p>
              <Button size="sm" onClick={onSendEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Success Card */}
        {message.action === "success" && (
          <Card className="border-accent/50 bg-accent/5">
            <CardContent className="flex items-center gap-3 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <p className="text-sm font-medium text-accent">
                Email sent successfully!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
      </div>
    </div>
  )
}
