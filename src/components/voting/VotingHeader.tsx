import { motion } from "framer-motion";
import { Copy, Users, Settings, Check, History, Share2, Home } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface VotingHeaderProps {
  sessionName: string;
  sessionCode: string;
  participantCount: number;
  currentStory?: { key: string; title: string };
  onOpenSettings?: () => void;
  onOpenHistory?: () => void;
}

export function VotingHeader({
  sessionName,
  sessionCode,
  participantCount,
  currentStory,
  onOpenSettings,
  onOpenHistory,
}: VotingHeaderProps) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(sessionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none"
    >
      {/* Left: Session info */}
      <div className="toolbar pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="toolbar-button"
          title="Dashboard'a Dön"
        >
          <Home className="h-4 w-4" />
        </motion.button>

        <div className="toolbar-divider" />

        <div className="flex items-center gap-2 px-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">{sessionName}</span>
          </div>
        </div>

        <div className="toolbar-divider" />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono bg-muted/50 hover:bg-muted transition-colors"
        >
          {sessionCode}
          {copied ? (
            <Check className="h-3 w-3 text-success" />
          ) : (
            <Copy className="h-3 w-3 text-muted-foreground" />
          )}
        </motion.button>

        <div className="toolbar-divider" />

        <div className="flex items-center gap-1 px-1.5 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span className="font-medium">{participantCount}</span>
        </div>
      </div>

      {/* Center: Current story - absolutely centered */}
      {currentStory && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-1/2 -translate-x-1/2 toolbar pointer-events-auto"
        >
          <div className="flex items-center gap-2 px-3 py-0.5">
            <span className="story-badge">
              {currentStory.key}
            </span>
            <span className="text-sm font-medium max-w-[280px] truncate">
              {currentStory.title}
            </span>
          </div>
        </motion.div>
      )}

      {/* Right: Actions */}
      <div className="toolbar pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenHistory}
          className="toolbar-button"
          title="Session History"
        >
          <History className="h-4 w-4" />
        </motion.button>

        <ThemeToggle />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSettings}
          className="toolbar-button"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </motion.button>

        <div className="toolbar-divider" />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium"
        >
          <Share2 className="h-3.5 w-3.5" />
          Invite
        </motion.button>
      </div>
    </motion.header>
  );
}