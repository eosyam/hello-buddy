import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Zap, Target, TrendingUp, Clock, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VoterStats {
  id: string;
  name: string;
  initials: string;
  avgVoteTime: number; // seconds
  accuracyScore: number; // percentage matching consensus
  consensusMatches: number;
  totalVotes: number;
}

interface SessionStats {
  totalStories: number;
  averageConsensus: number;
  totalTime: number; // minutes
  participantCount: number;
}

interface SessionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  voterStats: VoterStats[];
  sessionStats: SessionStats;
  sessionName: string;
}

export function SessionSummaryModal({
  isOpen,
  onClose,
  voterStats,
  sessionStats,
  sessionName,
}: SessionSummaryModalProps) {
  // Find award winners
  const fastestVoter = [...voterStats].sort((a, b) => a.avgVoteTime - b.avgVoteTime)[0];
  const mostAccurate = [...voterStats].sort((a, b) => b.accuracyScore - a.accuracyScore)[0];
  const consensusChampion = [...voterStats].sort((a, b) => b.consensusMatches - a.consensusMatches)[0];

  const awards = [
    {
      icon: Zap,
      title: "Speed Demon",
      subtitle: "En hızlı oylayan",
      winner: fastestVoter,
      stat: `${fastestVoter?.avgVoteTime.toFixed(1)}s ort.`,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Target,
      title: "Sharpshooter",
      subtitle: "En isabetli tahmin",
      winner: mostAccurate,
      stat: `%${mostAccurate?.accuracyScore.toFixed(0)} isabeT`,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Trophy,
      title: "Consensus Champion",
      subtitle: "En çok konsensüs",
      winner: consensusChampion,
      stat: `${consensusChampion?.consensusMatches}/${consensusChampion?.totalVotes}`,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-primary" />
            Session Özeti
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Session info */}
          <div className="text-center pb-4 border-b border-border">
            <p className="text-sm text-muted-foreground">{sessionName}</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{sessionStats.totalStories}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Story</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">%{sessionStats.averageConsensus}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Konsensüs</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{sessionStats.totalTime}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Dakika</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{sessionStats.participantCount}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Katılımcı</div>
            </div>
          </div>

          {/* Awards */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Ödüller
            </h4>
            <div className="space-y-2">
              {awards.map((award, index) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${award.bgColor}`}
                >
                  <div className={`p-2 rounded-full ${award.bgColor}`}>
                    <award.icon className={`h-4 w-4 ${award.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{award.title}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{award.subtitle}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-medium">{award.winner?.name}</span>
                      <span className={`text-xs ${award.color}`}>{award.stat}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leaderboard preview */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Tüm Katılımcılar
            </h4>
            <div className="space-y-1">
              {voterStats.slice(0, 5).map((voter, index) => (
                <div
                  key={voter.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <span className="text-xs text-muted-foreground w-4">{index + 1}.</span>
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {voter.initials}
                  </div>
                  <span className="flex-1 text-sm truncate">{voter.name}</span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {voter.avgVoteTime.toFixed(1)}s
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      %{voter.accuracyScore.toFixed(0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
