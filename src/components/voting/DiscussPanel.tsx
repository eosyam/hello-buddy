import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  content: string;
  timestamp: Date;
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface DiscussPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  storyKey: string;
  storyTitle: string;
}

const QUICK_REACTIONS = ["👍", "👎", "🤔", "💡", "🎯", "⚡"];

const demoMessages: Message[] = [
  {
    id: "1",
    senderId: "user-2",
    senderName: "Ayşe",
    senderInitials: "AY",
    content: "Bu story'de backend complexity'yi göz önüne almamız lazım",
    timestamp: new Date(Date.now() - 60000),
    reactions: [{ emoji: "👍", count: 2, users: ["user-1", "user-3"] }],
  },
  {
    id: "2",
    senderId: "user-3",
    senderName: "Mehmet",
    senderInitials: "MK",
    content: "Katılıyorum, API entegrasyonu var",
    timestamp: new Date(Date.now() - 30000),
  },
];

export function DiscussPanel({
  isOpen,
  onClose,
  currentUserId,
  storyKey,
  storyTitle,
}: DiscussPanelProps) {
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: "Sen",
      senderInitials: "SN",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;

        const existingReaction = msg.reactions?.find((r) => r.emoji === emoji);
        if (existingReaction) {
          if (existingReaction.users.includes(currentUserId)) {
            // Remove reaction
            const newReactions = msg.reactions
              ?.map((r) =>
                r.emoji === emoji
                  ? {
                      ...r,
                      count: r.count - 1,
                      users: r.users.filter((u) => u !== currentUserId),
                    }
                  : r
              )
              .filter((r) => r.count > 0);
            return { ...msg, reactions: newReactions };
          } else {
            // Add to existing
            return {
              ...msg,
              reactions: msg.reactions?.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, users: [...r.users, currentUserId] }
                  : r
              ),
            };
          }
        } else {
          // New reaction
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { emoji, count: 1, users: [currentUserId] }],
          };
        }
      })
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="min-w-0">
                <h3 className="font-semibold text-sm">Tartışma</h3>
                <p className="text-xs text-muted-foreground truncate">
                  {storyKey} · {storyTitle}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 minimal-scrollbar">
              {messages.map((message) => {
                const isOwn = message.senderId === currentUserId;
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${isOwn ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                        isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.senderInitials}
                    </div>
                    <div className={`max-w-[75%] ${isOwn ? "text-right" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">{message.senderName}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <div
                        className={`p-2.5 rounded-lg text-sm ${
                          isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>

                      {/* Reactions */}
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          {message.reactions.map((reaction) => (
                            <button
                              key={reaction.emoji}
                              onClick={() => handleReaction(message.id, reaction.emoji)}
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs transition-colors ${
                                reaction.users.includes(currentUserId)
                                  ? "bg-primary/20 text-primary"
                                  : "bg-muted hover:bg-muted/80"
                              }`}
                            >
                              <span>{reaction.emoji}</span>
                              <span>{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Quick reactions on hover */}
                      <div className="flex items-center gap-0.5 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                        {QUICK_REACTIONS.slice(0, 4).map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(message.id, emoji)}
                            className="p-1 hover:bg-muted rounded text-xs"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="h-4 w-4" />
                  </Button>

                  {/* Simple emoji picker */}
                  <AnimatePresence>
                    {showEmojiPicker && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-12 left-0 bg-background border border-border rounded-lg shadow-lg p-2 flex gap-1"
                      >
                        {QUICK_REACTIONS.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => {
                              setInputValue((prev) => prev + emoji);
                              setShowEmojiPicker(false);
                              inputRef.current?.focus();
                            }}
                            className="p-2 hover:bg-muted rounded text-lg"
                          >
                            {emoji}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Mesaj yaz..."
                  className="flex-1 h-9"
                />

                <Button
                  size="icon"
                  className="h-9 w-9"
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
