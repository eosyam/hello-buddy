import { motion } from "framer-motion";
import { Plus, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  key: string;
  title: string;
  points?: number;
  isActive?: boolean;
}

interface StorySidebarProps {
  stories: Story[];
  onAddStory: () => void;
  onSelectStory: (id: string) => void;
  activeStoryId?: string;
}

export function StorySidebar({
  stories,
  onAddStory,
  onSelectStory,
  activeStoryId,
}: StorySidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-sidebar">
      {/* Header */}
      <div className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-sidebar-foreground" />
          <h2 className="font-semibold text-sidebar-foreground">Stories</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {stories.length} item{stories.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Add story input */}
      <div className="p-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddStory}
          className="flex w-full items-center gap-2 rounded-xl border-2 border-dashed border-sidebar-border p-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="h-4 w-4" />
          Add a story...
        </motion.button>
      </div>

      {/* Stories list */}
      <div className="flex-1 overflow-y-auto p-3">
        {stories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent"
            >
              <Sparkles className="h-5 w-5 text-accent-foreground" />
            </motion.div>
            <p className="text-sm font-medium">No stories yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add your first story to start estimating
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => onSelectStory(story.id)}
                  className={cn(
                    "story-item w-full text-left",
                    activeStoryId === story.id && "active"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                        {story.key}
                      </span>
                      {activeStoryId === story.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mt-1 truncate text-sm font-medium">
                      {story.title}
                    </p>
                  </div>
                  {story.points !== undefined && (
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                      {story.points}
                    </span>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Quick tips */}
      <div className="border-t border-sidebar-border p-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Quick Tips
        </p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-muted text-[10px]">
              1
            </span>
            Add stories to estimate
          </p>
          <p className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-muted text-[10px]">
              2
            </span>
            Team votes on each
          </p>
          <p className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-muted text-[10px]">
              3
            </span>
            Reveal and discuss
          </p>
        </div>
      </div>
    </aside>
  );
}
