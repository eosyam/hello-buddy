import { motion } from "framer-motion";
import { Check, HelpCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoterAvatarProps {
  name: string;
  initials: string;
  vote?: string | number;
  hasVoted: boolean;
  isRevealed: boolean;
  colorIndex: number;
  isCurrentUser?: boolean;
  isFirstVoter?: boolean;
}

const avatarColors = [
  "bg-blue-600",
  "bg-violet-600",
  "bg-emerald-600",
  "bg-amber-500",
  "bg-cyan-600",
];

export function VoterAvatar({
  name,
  initials,
  vote,
  hasVoted,
  isRevealed,
  colorIndex,
  isCurrentUser,
  isFirstVoter,
}: VoterAvatarProps) {
  const colorClass = avatarColors[colorIndex % avatarColors.length];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col items-center gap-2"
    >
      {/* Vote card above avatar */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={{ 
          opacity: hasVoted ? 1 : 0,
          y: hasVoted ? 0 : 8,
          scale: hasVoted ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "participant-card",
          !isRevealed && "hidden-vote"
        )}
      >
        {isRevealed ? (
          <span className="text-base">{vote}</span>
        ) : (
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        )}
      </motion.div>

      {/* Avatar circle */}
      <div className="relative">
        <motion.div
          animate={hasVoted && !isRevealed ? { 
            y: [0, -4, 0],
          } : undefined}
          transition={{ duration: 0.3 }}
          className={cn(
            "participant-avatar w-11 h-11 text-xs text-white",
            colorClass,
            isCurrentUser && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          )}
        >
          {initials}

          {/* Voted checkmark */}
          {hasVoted && !isRevealed && !isFirstVoter && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-success text-white"
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </motion.div>
          )}

          {/* First voter badge */}
          {isFirstVoter && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg"
            >
              <Zap className="h-3 w-3" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Name label */}
      <span className="max-w-[72px] truncate text-[11px] text-muted-foreground">
        {isCurrentUser ? "You" : name.split(' ')[0]}
      </span>
    </motion.div>
  );
}