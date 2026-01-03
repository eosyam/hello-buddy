import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, Circle, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  key: string;
  title: string;
  points?: number;
}

interface StorySidebarProps {
  stories: Story[];
  onAddStory: () => void;
  onSelectStory: (id: string) => void;
  activeStoryId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function StorySidebar({
  stories,
  onAddStory,
  onSelectStory,
  activeStoryId,
  isOpen,
  onClose,
}: StorySidebarProps) {
  const completedCount = stories.filter(s => s.points !== undefined).length;

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

          {/* Sidebar panel */}
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-4 top-20 bottom-24 z-50 w-72 floating-panel-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Backlog</h2>
                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {completedCount}/{stories.length}
                </span>
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

            {/* Add story */}
            <div className="p-3 border-b border-border">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onAddStory}
                className="w-full flex items-center gap-2 p-2.5 rounded-lg border border-dashed border-border text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add story
                <kbd className="kbd ml-auto">N</kbd>
              </motion.button>
            </div>

            {/* Stories list */}
            <div className="flex-1 overflow-y-auto minimal-scrollbar p-3 space-y-1">
              <AnimatePresence mode="popLayout">
                {stories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: index * 0.03 }}
                    layout
                  >
                    <button
                      onClick={() => onSelectStory(story.id)}
                      className={cn(
                        "story-card w-full group",
                        activeStoryId === story.id && "active"
                      )}
                    >
                      {/* Status icon */}
                      {story.points !== undefined ? (
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                      )}

                      {/* Story info */}
                      <div className="flex-1 min-w-0 text-left">
                        <span className="story-badge">{story.key}</span>
                        <p className="mt-0.5 text-sm truncate">
                          {story.title}
                        </p>
                      </div>

                      {/* Points badge */}
                      {story.points !== undefined ? (
                        <span className="story-points">{story.points}</span>
                      ) : activeStoryId === story.id ? (
                        <span className="story-points bg-primary/20 text-primary">
                          ?
                        </span>
                      ) : null}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Progress footer */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round((completedCount / stories.length) * 100)}%</span>
              </div>
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / stories.length) * 100}%` }}
                  className="h-full rounded-full bg-primary"
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}