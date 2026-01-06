import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, Target, Star, Sparkles, Crown, Medal } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface VoterStats {
  id: string;
  name: string;
  initials: string;
  avgVoteTime: number;
  accuracyScore: number;
  consensusMatches: number;
  totalVotes: number;
}

interface SessionStats {
  totalStories: number;
  averageConsensus: number;
  totalTime: number;
  participantCount: number;
}

interface SessionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  voterStats: VoterStats[];
  sessionStats: SessionStats;
  sessionName: string;
}

// Confetti particle component
function ConfettiParticle({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ 
        opacity: 1, 
        y: -20, 
        x: Math.random() * 300 - 150,
        rotate: 0,
        scale: 1
      }}
      animate={{ 
        opacity: 0, 
        y: 400, 
        x: Math.random() * 200 - 100,
        rotate: Math.random() * 720 - 360,
        scale: 0.5
      }}
      transition={{ 
        duration: 2.5 + Math.random(), 
        delay: delay,
        ease: "easeOut"
      }}
    />
  );
}

export function SessionSummaryModal({
  isOpen,
  onClose,
  voterStats,
  sessionStats,
  sessionName,
}: SessionSummaryModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
      gradient: "from-amber-500 to-orange-600",
      bgGlow: "shadow-amber-500/30",
      iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    },
    {
      icon: Target,
      title: "Sharpshooter",
      subtitle: "En isabetli tahmin",
      winner: mostAccurate,
      stat: `%${mostAccurate?.accuracyScore.toFixed(0)} isabet`,
      gradient: "from-emerald-500 to-teal-600",
      bgGlow: "shadow-emerald-500/30",
      iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    },
    {
      icon: Crown,
      title: "Consensus King",
      subtitle: "En çok konsensüs",
      winner: consensusChampion,
      stat: `${consensusChampion?.consensusMatches}/${consensusChampion?.totalVotes}`,
      gradient: "from-violet-500 to-purple-600",
      bgGlow: "shadow-violet-500/30",
      iconBg: "bg-gradient-to-br from-violet-400 to-purple-500",
    },
  ];

  const confettiColors = ['#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#3b82f6', '#ef4444'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-gradient-to-b from-background to-muted/30 border-2">
        {/* Confetti */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
              {Array.from({ length: 50 }).map((_, i) => (
                <ConfettiParticle 
                  key={i} 
                  delay={i * 0.03} 
                  color={confettiColors[i % confettiColors.length]} 
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Header with trophy animation */}
        <div className="relative pt-8 pb-4 px-6 text-center overflow-hidden">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-4 rounded-2xl shadow-lg shadow-amber-500/30">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="h-5 w-5 text-amber-400" />
            </motion.div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Session Tamamlandı!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted-foreground mt-1"
          >
            {sessionName}
          </motion.p>
        </div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-4 gap-2 px-4"
        >
          {[
            { value: sessionStats.totalStories, label: "Story", emoji: "📋" },
            { value: `%${sessionStats.averageConsensus}`, label: "Konsensüs", emoji: "🎯" },
            { value: sessionStats.totalTime, label: "Dakika", emoji: "⏱️" },
            { value: sessionStats.participantCount, label: "Kişi", emoji: "👥" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center p-3 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-lg mb-1">{stat.emoji}</div>
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Awards section */}
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Star className="h-4 w-4 text-amber-500" />
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Ödüller
            </h4>
          </div>
          
          <div className="space-y-2">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: 0.7 + index * 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`relative overflow-hidden rounded-xl p-3 bg-card border shadow-lg ${award.bgGlow} cursor-default`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${award.gradient} opacity-5`} />
                
                <div className="relative flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`p-2.5 rounded-xl ${award.iconBg} shadow-lg`}
                  >
                    <award.icon className="h-5 w-5 text-white" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm bg-gradient-to-r ${award.gradient} bg-clip-text text-transparent`}>
                        {award.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-medium text-foreground">{award.winner?.name}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{award.subtitle}</span>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${award.gradient} text-white text-xs font-bold shadow-md`}>
                    {award.stat}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="px-4 pb-6 space-y-2"
        >
          <div className="flex items-center gap-2 px-1">
            <Medal className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Sıralama
            </h4>
          </div>
          
          <div className="bg-muted/30 rounded-xl p-2 space-y-1">
            {voterStats.slice(0, 5).map((voter, index) => (
              <motion.div
                key={voter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors group"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' : 
                    index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                    'bg-muted text-muted-foreground'}`}
                >
                  {index + 1}
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                  {voter.initials}
                </div>
                <span className="flex-1 text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {voter.name}
                </span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <Zap className="h-3 w-3" />
                    {voter.avgVoteTime.toFixed(1)}s
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Target className="h-3 w-3" />
                    %{voter.accuracyScore.toFixed(0)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
