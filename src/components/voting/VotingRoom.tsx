import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VotingHeader } from "./VotingHeader";
import { StorySidebar } from "./StorySidebar";
import { VoterAvatar } from "./VoterAvatar";
import { ConsensusPanel } from "./ConsensusPanel";
import { VotingFooter } from "./VotingFooter";
import { Menu, PanelLeft } from "lucide-react";

interface Voter {
  id: string;
  name: string;
  initials: string;
  vote?: string | number;
  hasVoted: boolean;
}

interface Story {
  id: string;
  key: string;
  title: string;
  points?: number;
}

// Demo data
const demoStories: Story[] = [
  { id: "1", key: "PROD-123", title: "User Authentication Flow", points: 8 },
  { id: "2", key: "PROD-124", title: "Dashboard Analytics", points: undefined },
  { id: "3", key: "PROD-125", title: "Payment Integration", points: undefined },
  { id: "4", key: "PROD-126", title: "Email Notifications", points: undefined },
];

const demoVoters: Voter[] = [
  { id: "1", name: "Eray Buyukkorukcu", initials: "EB", vote: 8, hasVoted: true },
  { id: "2", name: "Sarah Chen", initials: "SC", vote: 5, hasVoted: true },
  { id: "3", name: "Alex Martinez", initials: "AM", vote: undefined, hasVoted: false },
  { id: "4", name: "Jordan Park", initials: "JP", vote: 8, hasVoted: true },
  { id: "5", name: "Taylor Swift", initials: "TS", vote: undefined, hasVoted: false },
];

const FIBONACCI_VALUES = [0, 1, 2, 3, 5, 8, 13, 21, 40, "☕"];

export function VotingRoom() {
  const [stories, setStories] = useState<Story[]>(demoStories);
  const [activeStoryId, setActiveStoryId] = useState<string>("2");
  const [voters, setVoters] = useState<Voter[]>(demoVoters);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeStory = stories.find((s) => s.id === activeStoryId);
  const votedCount = voters.filter((v) => v.hasVoted).length;
  const totalVoters = voters.length;

  // Calculate consensus
  const votes = voters.filter((v) => v.hasVoted && v.vote !== undefined).map((v) => v.vote!);
  const voteCount = votes.reduce((acc, vote) => {
    acc[vote] = (acc[vote] || 0) + 1;
    return acc;
  }, {} as Record<string | number, number>);

  const sortedVotes = Object.entries(voteCount).sort((a, b) => b[1] - a[1]);
  const mostCommon = sortedVotes.length > 0 ? sortedVotes[0][0] : null;
  const consensus = votes.length > 0 
    ? Math.round((sortedVotes[0]?.[1] || 0) / votes.length * 100)
    : 0;

  const handleSelectValue = (value: string | number) => {
    setSelectedValue(value);
    setVoters((prev) =>
      prev.map((v) =>
        v.id === "1" ? { ...v, vote: value, hasVoted: true } : v
      )
    );
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleReset = () => {
    setIsRevealed(false);
    setSelectedValue(null);
    setVoters((prev) =>
      prev.map((v) => ({ ...v, vote: undefined, hasVoted: false }))
    );
  };

  const handleNextStory = () => {
    const currentIndex = stories.findIndex(s => s.id === activeStoryId);
    const nextStory = stories[currentIndex + 1];
    if (nextStory) {
      // Save current story points
      setStories(prev => prev.map(s => 
        s.id === activeStoryId ? { ...s, points: Number(mostCommon) || undefined } : s
      ));
      setActiveStoryId(nextStory.id);
      handleReset();
    }
  };

  const handleAddStory = () => {
    console.log("Add story");
  };

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    // Number keys for voting
    const keyNum = parseInt(e.key);
    if (!isNaN(keyNum) && keyNum >= 0 && keyNum <= 9) {
      const value = FIBONACCI_VALUES[keyNum];
      if (value !== undefined && !isRevealed) {
        handleSelectValue(value);
      }
    }

    // R for reveal
    if (e.key.toLowerCase() === 'r' && !isRevealed && votedCount > 0) {
      handleReveal();
    }

    // B for backlog sidebar
    if (e.key.toLowerCase() === 'b') {
      setIsSidebarOpen(prev => !prev);
    }

    // N for new story
    if (e.key.toLowerCase() === 'n') {
      handleAddStory();
    }
  }, [isRevealed, votedCount]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="h-screen w-full overflow-hidden">
      {/* Canvas background */}
      <div className="canvas absolute inset-0" />

      {/* Header */}
      <VotingHeader
        sessionName="Product Team"
        sessionCode="RY49BS"
        participantCount={totalVoters}
        currentStory={activeStory ? { key: activeStory.key, title: activeStory.title } : undefined}
      />

      {/* Toggle sidebar button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSidebarOpen(true)}
        className="fixed left-4 top-20 z-30 toolbar-button bg-card border border-border shadow-md"
      >
        <PanelLeft className="h-4 w-4" />
      </motion.button>

      {/* Story Sidebar */}
      <StorySidebar
        stories={stories}
        onAddStory={handleAddStory}
        onSelectStory={(id) => {
          setActiveStoryId(id);
          setIsSidebarOpen(false);
        }}
        activeStoryId={activeStoryId}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content - Voting table */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full px-8 pt-24 pb-48">
        {/* Voting table - Circular arrangement around center */}
        <div className="relative flex flex-col items-center gap-12">
          {/* Voters in arc arrangement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap items-end justify-center gap-6 md:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {voters.map((voter, index) => (
                <VoterAvatar
                  key={voter.id}
                  name={voter.name}
                  initials={voter.initials}
                  vote={voter.vote}
                  hasVoted={voter.hasVoted}
                  isRevealed={isRevealed}
                  colorIndex={index}
                  isCurrentUser={voter.id === "1"}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Center - Consensus/Status Panel */}
          <ConsensusPanel
            isRevealed={isRevealed}
            mostCommon={mostCommon}
            consensus={consensus}
            totalVoters={totalVoters}
            votedCount={votedCount}
          />
        </div>
      </main>

      {/* Footer with voting cards */}
      <VotingFooter
        votedCount={votedCount}
        totalVoters={totalVoters}
        isRevealed={isRevealed}
        selectedValue={selectedValue}
        onSelectValue={handleSelectValue}
        onReveal={handleReveal}
        onReset={handleReset}
        onNextStory={handleNextStory}
        onDiscuss={() => console.log("Discuss")}
      />
    </div>
  );
}
