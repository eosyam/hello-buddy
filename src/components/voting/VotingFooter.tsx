import { motion } from "framer-motion";
import { Eye, RotateCcw, ChevronRight, MessageSquare } from "lucide-react";
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="fixed bottom-0 left-0 right-0 z-50 pb-5"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Action buttons */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {isRevealed ? (
            <>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onDiscuss}
                className="action-pill"
              >
                <MessageSquare className="h-4 w-4" />
                Discuss
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onReset}
                className="action-pill"
              >
                <RotateCcw className="h-4 w-4" />
                Revote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onNextStory}
                className="action-pill primary"
              >
                Next Story
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onReveal}
              disabled={votedCount === 0}
              className={`action-pill ${allVoted ? "primary" : ""}`}
            >
              <Eye className="h-4 w-4" />
              Reveal Votes
            </motion.button>
          )}
        </motion.div>

        {/* Voting cards */}
        <div className="floating-panel-lg px-3 py-3 md:px-5">
          <div className="flex items-center justify-center gap-1 md:gap-1.5">
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

          {/* Keyboard hints */}
          <div className="flex items-center justify-center gap-3 mt-2.5 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="kbd">1</kbd>-<kbd className="kbd">0</kbd>
              vote
            </span>
            <span className="flex items-center gap-1">
              <kbd className="kbd">R</kbd>
              reveal
            </span>
            <span className="flex items-center gap-1">
              <kbd className="kbd">B</kbd>
              backlog
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}