import { motion } from "framer-motion";
import { ArrowLeft, Copy, Users, History, Settings, Check } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useState } from "react";

interface VotingHeaderProps {
  sessionName: string;
  sessionCode: string;
  participantCount: number;
  onBack?: () => void;
  onOpenHistory?: () => void;
  onOpenSettings?: () => void;
}

export function VotingHeader({
  sessionName,
  sessionCode,
  participantCount,
  onBack,
  onOpenHistory,
  onOpenSettings,
}: VotingHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(sessionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </motion.button>

        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">{sessionName}</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
          >
            <span className="font-mono">{sessionCode}</span>
            {copied ? (
              <Check className="h-3 w-3 text-success" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </motion.button>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{participantCount}</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenHistory}
          className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
        >
          <History className="h-4 w-4" />
          <span>History</span>
        </motion.button>

        <ThemeToggle />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSettings}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
        </motion.button>
      </div>
    </header>
  );
}
