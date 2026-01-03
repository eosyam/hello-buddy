import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Target } from "lucide-react";

interface ConsensusPanelProps {
  isRevealed: boolean;
  mostCommon: string | number | null;
  consensus: number;
  totalVoters: number;
  votedCount: number;
}

export function ConsensusPanel({
  isRevealed,
  mostCommon,
  consensus,
  totalVoters,
  votedCount,
}: ConsensusPanelProps) {
  const allVoted = votedCount === totalVoters && totalVoters > 0;

  if (isRevealed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="result-display min-w-[280px]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Target className="h-3.5 w-3.5" />
            Team Estimate
          </div>
          
          <div className="result-value">{mostCommon ?? "—"}</div>
          
          {/* Consensus meter */}
          <div className="flex items-center gap-3">
            <div className="relative h-2 w-32 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${consensus}%` }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-success"
              />
            </div>
            <span className="text-sm font-bold text-foreground">{consensus}%</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-3 w-3 text-warning" />
            {consensus >= 80 ? "Strong consensus!" : consensus >= 50 ? "Moderate agreement" : "Discussion needed"}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="floating-panel-lg px-10 py-8 text-center"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-4"
      >
        {/* Circular progress indicator */}
        <div className="relative">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 251.2" }}
              animate={{ 
                strokeDasharray: `${(votedCount / totalVoters) * 251.2} 251.2` 
              }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{votedCount}</span>
            <span className="text-xs text-muted-foreground">/ {totalVoters}</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            {allVoted ? "All votes in!" : "Waiting for votes..."}
          </p>
          <p className="text-xs text-muted-foreground">
            {allVoted ? "Ready to reveal results" : `${totalVoters - votedCount} more to go`}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
