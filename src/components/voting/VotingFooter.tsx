import { motion } from "framer-motion";
import { Eye, MessageCircle, RotateCcw, ChevronRight } from "lucide-react";
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
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      {/* Status bar */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        {/* Vote progress */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: totalVoters }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`h-6 w-1.5 rounded-full transition-colors ${
                  i < votedCount ? "bg-success" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">
            {votedCount}/{totalVoters}
            <span className="ml-1.5 text-muted-foreground">voted</span>
          </span>
        </div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`status-pill ${
            isRevealed
              ? "bg-success/10 text-success"
              : allVoted
              ? "bg-primary/10 text-primary"
              : "bg-warning/10 text-warning"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          {isRevealed
            ? "Results revealed"
            : allVoted
            ? "Ready to reveal"
            : "Waiting for votes"}
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isRevealed ? (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDiscuss}
                className="flex items-center gap-2 rounded-xl bg-success px-4 py-2 text-sm font-medium text-success-foreground shadow-sm transition-all hover:shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                Discuss & align
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onReset}
                className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNextStory}
                className="flex items-center gap-2 rounded-xl border-2 border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Next Story
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onReveal}
              disabled={votedCount === 0}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye className="h-4 w-4" />
              Reveal
            </motion.button>
          )}
        </div>
      </div>

      {/* Voting cards */}
      <div className="flex items-center justify-center gap-2 px-6 py-4 md:gap-3">
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
    </footer>
  );
}
