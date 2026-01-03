import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface VotingCardProps {
  value: string | number;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  index: number;
}

export function VotingCard({ value, isSelected, onClick, disabled, index }: VotingCardProps) {
  const isCoffee = value === "☕";
  const displayValue = isCoffee ? null : value;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay: index * 0.04, 
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }}
      whileHover={!disabled ? { 
        y: -12, 
        scale: 1.08,
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "vote-card h-20 w-14 md:h-24 md:w-16",
        isSelected && "selected",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none"
      )}
    >
      {/* Corner values - poker card style */}
      <span className="vote-card-corner top">
        {isCoffee ? "☕" : value}
      </span>
      
      {/* Center value */}
      <span className="text-2xl md:text-3xl font-bold">
        {isCoffee ? <Coffee className="h-6 w-6 md:h-7 md:w-7" /> : displayValue}
      </span>
      
      <span className="vote-card-corner bottom">
        {isCoffee ? "☕" : value}
      </span>

      {/* Selection glow effect */}
      {isSelected && (
        <motion.div
          layoutId="card-glow"
          className="absolute inset-0 rounded-2xl bg-primary/10"
          initial={false}
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
    </motion.button>
  );
}
