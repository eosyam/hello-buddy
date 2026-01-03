import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel mx-auto w-full max-w-md p-8"
    >
      {isRevealed ? (
        <div className="space-y-6 text-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Most Common
            </p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="mt-2 text-5xl font-bold gradient-text"
            >
              {mostCommon ?? "—"}
            </motion.p>
          </div>

          <div className="h-px bg-border" />

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Consensus
            </p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-2 flex-1 max-w-[120px] rounded-full bg-muted overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${consensus}%` }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-success"
                />
              </motion.div>
              <span className="text-2xl font-bold">{consensus}%</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <Users className="h-8 w-8 text-muted-foreground" />
          </motion.div>
          <p className="text-lg text-muted-foreground">Waiting for votes...</p>
          <p className="text-sm text-muted-foreground/70">
            {votedCount} of {totalVoters} voted
          </p>
        </div>
      )}
    </motion.div>
  );
}
