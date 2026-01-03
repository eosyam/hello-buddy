import { motion } from "framer-motion";
import { Eye, RotateCcw, ChevronRight, MessageSquare, Sparkles } from "lucide-react";
import { VotingCard } from "./VotingCard";

interface VotingFooterProps {
  votedCount: number;
  totalVoters: number;
  isRevealed: boolean;
  selectedValue: string | number | null;
  onSelectValue: (value: string | number) => void;
  onReveal: () => void;
  onReset: () => void;
  onNextStory: () => void;
  onDiscuss: () => void;
}

const FIBONACCI_VALUES = [0, 1, 2, 3, 5, 8, 13, 21, 40, "☕"];

export function VotingFooter({
  votedCount,
  totalVoters,
  isRevealed,
  selectedValue,
  onSelectValue,
  onReveal,
  onReset,
  onNextStory,
  onDiscuss,
}: VotingFooterProps) {
  const allVoted = votedCount === totalVoters && totalVoters > 0;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-50 pb-6"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Action buttons */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isRevealed ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDiscuss}
                className="action-pill primary glow-success"
              >
                <MessageSquare className="h-4 w-4" />
                Discuss
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReset}
                className="action-pill"
              >
                <RotateCcw className="h-4 w-4" />
                Revote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNextStory}
                className="action-pill"
              >
                Next Story
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReveal}
              disabled={votedCount === 0}
              className={`action-pill ${allVoted ? "primary glow-primary" : ""}`}
            >
              <Eye className="h-4 w-4" />
              Reveal Votes
              {allVoted && <Sparkles className="h-3 w-3" />}
            </motion.button>
          )}
        </motion.div>

        {/* Voting cards - Floating card deck */}
        <div className="floating-panel-lg px-4 py-4 md:px-6">
          <div className="flex items-center justify-center gap-1.5 md:gap-2">
            {FIBONACCI_VALUES.map((value, index) => (
              <VotingCard
                key={value}
                value={value}
                isSelected={selectedValue === value}
                onClick={() => onSelectValue(value)}
                disabled={isRevealed}
                index={index}
              />
            ))}
          </div>

          {/* Keyboard hint */}
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <kbd className="kbd">1</kbd>
              <kbd className="kbd">2</kbd>
              <span>...</span>
              <kbd className="kbd">0</kbd>
              to vote
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="kbd">R</kbd>
              reveal
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
