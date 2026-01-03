import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoterAvatarProps {
  name: string;
  initials: string;
  vote?: string | number;
  hasVoted: boolean;
  isRevealed: boolean;
  colorIndex: number;
  isCurrentUser?: boolean;
}

const avatarColors = [
  "bg-primary text-primary-foreground",
  "bg-emphasis text-emphasis-foreground",
  "bg-success text-success-foreground",
  "bg-warning text-warning-foreground",
];

export function VoterAvatar({
  name,
  initials,
  vote,
  hasVoted,
  isRevealed,
  colorIndex,
  isCurrentUser,
}: VoterAvatarProps) {
  const colorClass = avatarColors[colorIndex % avatarColors.length];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-2"
    >
      {/* Vote indicator */}
      {isRevealed && hasVoted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border bg-card font-bold shadow-soft"
        >
          {vote}
        </motion.div>
      )}

      {/* Avatar */}
      <div className="relative">
        <motion.div
          animate={hasVoted ? { y: [0, -4, 0] } : undefined}
          transition={{ duration: 0.4 }}
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold shadow-soft",
            colorClass,
            isCurrentUser && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          )}
        >
          {initials}
        </motion.div>

        {/* Voted indicator */}
        {hasVoted && !isRevealed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-foreground"
          >
            <Check className="h-3 w-3" />
          </motion.div>
        )}

        {/* Crown for host */}
        {isCurrentUser && (
          <motion.span
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            className="absolute -right-1 -top-1 text-lg"
          >
            👑
          </motion.span>
        )}
      </div>

      {/* Name */}
      <span className="max-w-[80px] truncate text-xs text-muted-foreground">
        {name}
      </span>
    </motion.div>
  );
}
