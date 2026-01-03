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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.03, 
        duration: 0.3,
      }}
      whileHover={!disabled ? { 
        y: -8, 
        transition: { duration: 0.15 }
      } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "vote-card h-16 w-11 md:h-20 md:w-14",
        isSelected && "selected",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none"
      )}
    >
      {/* Corner values */}
      <span className="vote-card-corner top">
        {isCoffee ? "☕" : value}
      </span>
      
      {/* Center value */}
      <span className="text-lg md:text-xl font-semibold">
        {isCoffee ? <Coffee className="h-5 w-5" /> : displayValue}
      </span>
      
      <span className="vote-card-corner bottom">
        {isCoffee ? "☕" : value}
      </span>
    </motion.button>
  );
}