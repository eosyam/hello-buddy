import { motion } from "framer-motion";
import { Copy, Users, Settings, ChevronDown, Check, Layers, Zap } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useState } from "react";

interface VotingHeaderProps {
  sessionName: string;
  sessionCode: string;
  participantCount: number;
  currentStory?: { key: string; title: string };
  onOpenSettings?: () => void;
}

export function VotingHeader({
  sessionName,
  sessionCode,
  participantCount,
  currentStory,
  onOpenSettings,
}: VotingHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(sessionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none"
    >
      {/* Left: Session info toolbar */}
      <div className="toolbar pointer-events-auto">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
            <Layers className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">{sessionName}</span>
            <span className="text-[10px] text-muted-foreground leading-tight">Sprint Planning</span>
          </div>
        </div>

        <div className="toolbar-divider" />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-muted/50 hover:bg-muted transition-colors"
        >
          {sessionCode}
          {copied ? (
            <Check className="h-3 w-3 text-success" />
          ) : (
            <Copy className="h-3 w-3 text-muted-foreground" />
          )}
        </motion.button>

        <div className="toolbar-divider" />

        <div className="flex items-center gap-1.5 px-2 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span className="font-medium">{participantCount}</span>
        </div>
      </div>

      {/* Center: Current story (if any) */}
      {currentStory && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="toolbar pointer-events-auto"
        >
          <div className="flex items-center gap-2 px-3 py-1">
            <span className="flex items-center justify-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold">
              {currentStory.key}
            </span>
            <span className="text-sm font-medium max-w-[200px] truncate">
              {currentStory.title}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </motion.div>
      )}

      {/* Right: Actions toolbar */}
      <div className="toolbar pointer-events-auto">
        <ThemeToggle />

        <div className="toolbar-divider" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSettings}
          className="toolbar-button"
        >
          <Settings className="h-4 w-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
        >
          <Zap className="h-3 w-3" />
          Invite
        </motion.button>
      </div>
    </motion.header>
  );
}
