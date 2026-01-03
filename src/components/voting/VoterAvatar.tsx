import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
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

const avatarGradients = [
  "from-teal-400 to-cyan-500",
  "from-orange-400 to-rose-500",
  "from-violet-400 to-purple-500",
  "from-amber-400 to-orange-500",
  "from-blue-400 to-indigo-500",
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
  const gradientClass = avatarGradients[colorIndex % avatarGradients.length];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="participant-node"
    >
      {/* Vote card above avatar */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ 
          opacity: hasVoted ? 1 : 0,
          y: hasVoted ? 0 : 10,
          scale: hasVoted ? 1 : 0.8,
          rotateY: isRevealed ? 0 : 180
        }}
        transition={{ 
          duration: 0.4,
          rotateY: { duration: 0.6, delay: 0.1 }
        }}
        className={cn(
          "participant-card",
          !isRevealed && "hidden-vote",
          isRevealed && "revealed"
        )}
        style={{ 
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        {isRevealed ? (
          <span className="text-lg">{vote}</span>
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/10">
            <HelpCircle className="h-5 w-5 text-primary/60" />
          </div>
        )}
      </motion.div>

      {/* Avatar circle */}
      <div className="relative">
        <motion.div
          animate={hasVoted && !isRevealed ? { 
            y: [0, -6, 0],
            transition: { duration: 0.5, ease: "easeOut" }
          } : undefined}
          className={cn(
            "participant-avatar w-14 h-14 text-sm text-white shadow-lg",
            `bg-gradient-to-br ${gradientClass}`,
            isCurrentUser && "ring-3 ring-white/50 ring-offset-2 ring-offset-background"
          )}
        >
          {initials}

          {/* Voted checkmark */}
          {hasVoted && !isRevealed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-success text-white shadow-md"
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>

        {/* Current user indicator */}
        {isCurrentUser && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 text-sm"
          >
            ✨
          </motion.div>
        )}
      </div>

      {/* Name label */}
      <motion.span 
        className="max-w-[80px] truncate text-xs font-medium text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {name.split(' ')[0]}
      </motion.span>
    </motion.div>
  );
}
