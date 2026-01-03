import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Users, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistorySession {
  id: string;
  date: string;
  storiesCount: number;
  participantsCount: number;
  avgConsensus: number;
  stories: {
    key: string;
    title: string;
    points: number;
    consensus: number;
  }[];
}

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: HistorySession[];
}

const demoSessions: HistorySession[] = [
  {
    id: "1",
    date: "Today, 10:30 AM",
    storiesCount: 8,
    participantsCount: 5,
    avgConsensus: 78,
    stories: [
      { key: "PROD-120", title: "API Refactoring", points: 13, consensus: 80 },
      { key: "PROD-121", title: "Search Feature", points: 8, consensus: 100 },
      { key: "PROD-122", title: "Bug Fixes", points: 3, consensus: 60 },
    ]
  },
  {
    id: "2", 
    date: "Yesterday, 2:00 PM",
    storiesCount: 6,
    participantsCount: 4,
    avgConsensus: 85,
    stories: [
      { key: "PROD-118", title: "Dashboard Charts", points: 5, consensus: 100 },
      { key: "PROD-119", title: "Export PDF", points: 8, consensus: 75 },
    ]
  },
  {
    id: "3",
    date: "Jan 2, 11:00 AM", 
    storiesCount: 12,
    participantsCount: 6,
    avgConsensus: 72,
    stories: [
      { key: "PROD-110", title: "User Onboarding", points: 21, consensus: 66 },
      { key: "PROD-111", title: "Email Templates", points: 5, consensus: 80 },
    ]
  }
];

export function HistoryPanel({ isOpen, onClose }: HistoryPanelProps) {
  const sessions = demoSessions;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-4 top-20 bottom-24 z-50 w-96 floating-panel-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold">Session History</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Sessions list */}
            <div className="flex-1 overflow-y-auto minimal-scrollbar p-3 space-y-3">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="floating-panel p-3 space-y-3 hover:border-primary/30 transition-colors cursor-pointer">
                    {/* Session header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{session.date}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-medium">{session.storiesCount}</span>
                        <span className="text-muted-foreground">stories</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{session.participantsCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                        <span>{session.avgConsensus}%</span>
                      </div>
                    </div>

                    {/* Stories preview */}
                    <div className="space-y-1.5">
                      {session.stories.slice(0, 3).map((story) => (
                        <div
                          key={story.key}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span className="story-badge">{story.key}</span>
                          <span className="flex-1 truncate text-muted-foreground">
                            {story.title}
                          </span>
                          <span className="font-semibold text-primary">
                            {story.points}
                          </span>
                        </div>
                      ))}
                      {session.stories.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{session.stories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <button className="w-full text-xs text-center text-muted-foreground hover:text-foreground transition-colors">
                View all sessions →
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}