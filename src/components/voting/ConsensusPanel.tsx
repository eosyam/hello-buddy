import { motion } from "framer-motion";
import { Users, AlertCircle, CheckCircle2, MessageSquare } from "lucide-react";

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
    const needsDiscussion = consensus < 70;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="result-display min-w-[240px]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Team Estimate
          </span>
          
          <div className="result-value">{mostCommon ?? "—"}</div>
          
          {/* Consensus bar */}
          <div className="flex items-center gap-2 w-full max-w-[160px]">
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${consensus}%` }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={cn(
                  "h-full rounded-full",
                  consensus >= 70 ? "bg-success" : "bg-warning"
                )}
              />
            </div>
            <span className="text-xs font-semibold">{consensus}%</span>
          </div>

          {/* Status message */}
          <div className={cn(
            "flex items-center gap-1.5 text-xs",
            needsDiscussion ? "text-warning" : "text-success"
          )}>
            {needsDiscussion ? (
              <>
                <MessageSquare className="h-3 w-3" />
                Discussion recommended
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Strong agreement
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="floating-panel-lg px-8 py-6 text-center"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Progress circle */}
        <div className="relative">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="hsl(var(--muted))"
              strokeWidth="6"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              stroke="hsl(var(--primary))"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 264" }}
              animate={{ 
                strokeDasharray: `${(votedCount / totalVoters) * 264} 264` 
              }}
              transition={{ duration: 0.4 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-semibold">{votedCount}</span>
            <span className="text-[10px] text-muted-foreground">of {totalVoters}</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <p className="text-sm font-medium">
            {allVoted ? "All votes in" : "Waiting for votes"}
          </p>
          <p className="text-xs text-muted-foreground">
            {allVoted ? "Ready to reveal" : `${totalVoters - votedCount} remaining`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}