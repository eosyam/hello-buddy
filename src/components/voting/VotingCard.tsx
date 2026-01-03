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

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={!disabled ? { y: -8, scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "voting-card h-16 w-14 text-xl md:h-20 md:w-16 md:text-2xl",
        isSelected && "selected glow-primary",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {isCoffee ? (
        <Coffee className="h-5 w-5 md:h-6 md:w-6" />
      ) : (
        <span className="font-bold">{value}</span>
      )}
      
      {isSelected && (
        <motion.div
          layoutId="card-selection"
          className="absolute inset-0 rounded-xl bg-primary/20"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}
