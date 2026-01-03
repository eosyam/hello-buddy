import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VotingHeader } from "./VotingHeader";
import { StorySidebar } from "./StorySidebar";
import { VoterAvatar } from "./VoterAvatar";
import { ConsensusPanel } from "./ConsensusPanel";
import { VotingFooter } from "./VotingFooter";

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
  { id: "1", key: "PROD-123", title: "Login Process", points: 8 },
  { id: "2", key: "PROD-124", title: "User Dashboard", points: undefined },
  { id: "3", key: "PROD-125", title: "Payment Integration", points: undefined },
];

const demoVoters: Voter[] = [
  { id: "1", name: "Eray Buyukkorukcu", initials: "EB", vote: 8, hasVoted: true },
  { id: "2", name: "Developer 1", initials: "D1", vote: 5, hasVoted: true },
  { id: "3", name: "Alex Smith", initials: "AS", vote: undefined, hasVoted: false },
];

export function VotingRoom() {
  const [stories] = useState<Story[]>(demoStories);
  const [activeStoryId, setActiveStoryId] = useState<string>("1");
  const [voters, setVoters] = useState<Voter[]>(demoVoters);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(null);

  const activeStory = stories.find((s) => s.id === activeStoryId);
  const votedCount = voters.filter((v) => v.hasVoted).length;
  const totalVoters = voters.length;

  // Calculate most common vote and consensus
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
    // Simulate current user voting
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

  const handleAddStory = () => {
    // In a real app, this would open a modal
    console.log("Add story");
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <VotingHeader
        sessionName="Sprint Planning"
        sessionCode="RY49BS"
        participantCount={totalVoters}
      />

      <div className="flex flex-1 overflow-hidden">
        <StorySidebar
          stories={stories}
          onAddStory={handleAddStory}
          onSelectStory={setActiveStoryId}
          activeStoryId={activeStoryId}
        />

        <main className="flex flex-1 flex-col">
          {/* Story header */}
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                {activeStory?.key}
              </span>
              <h2 className="text-xl font-semibold">{activeStory?.title}</h2>
            </div>
          </div>

          {/* Voting area */}
          <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
            {/* Voters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap items-end justify-center gap-8"
            >
              <AnimatePresence>
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

            {/* Consensus panel */}
            <ConsensusPanel
              isRevealed={isRevealed}
              mostCommon={mostCommon}
              consensus={consensus}
              totalVoters={totalVoters}
              votedCount={votedCount}
            />
          </div>

          {/* Question bar */}
          <div className="px-6 pb-2">
            <motion.button
              whileHover={{ scale: 1.01 }}
              className="flex w-full items-center gap-2 rounded-xl bg-secondary/50 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary"
            >
              <span className="text-lg">💬</span>
              Ask a question...
            </motion.button>
          </div>
        </main>
      </div>

      <VotingFooter
        votedCount={votedCount}
        totalVoters={totalVoters}
        isRevealed={isRevealed}
        selectedValue={selectedValue}
        onSelectValue={handleSelectValue}
        onReveal={handleReveal}
        onReset={handleReset}
        onNextStory={() => console.log("Next story")}
        onDiscuss={() => console.log("Discuss")}
      />
    </div>
  );
}
