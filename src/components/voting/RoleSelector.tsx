import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Shield, User, ChevronDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type RoomRole = "scrum_master" | "helper" | "participant";

interface RoleSelectorProps {
  currentRole: RoomRole;
  onRoleChange: (role: RoomRole) => void;
  canChangeRole: boolean;
  voterName: string;
  isCurrentUser: boolean;
}

const roleConfig = {
  scrum_master: {
    label: "Scrum Master",
    shortLabel: "SM",
    icon: Crown,
    color: "text-amber-500",
    bgColor: "bg-amber-500",
    description: "Leads the session, can reveal & reset votes",
  },
  helper: {
    label: "Helper",
    shortLabel: "H",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary",
    description: "Can assist with session controls",
  },
  participant: {
    label: "Participant",
    shortLabel: "P",
    icon: User,
    color: "text-muted-foreground",
    bgColor: "bg-muted-foreground",
    description: "Votes on stories",
  },
};

export function RoleSelector({
  currentRole,
  onRoleChange,
  canChangeRole,
  voterName,
  isCurrentUser,
}: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = roleConfig[currentRole];
  const Icon = config.icon;

  if (!canChangeRole) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className={cn("h-3 w-3", config.color)} />
        <span>{config.shortLabel}</span>
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 hover:bg-muted text-xs transition-colors"
        >
          <Icon className={cn("h-3 w-3", config.color)} />
          <span className="text-muted-foreground">{config.shortLabel}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </motion.button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="center" sideOffset={8}>
        <div className="mb-2 px-2">
          <p className="text-xs text-muted-foreground">
            Change role for {isCurrentUser ? "yourself" : voterName}
          </p>
        </div>
        <div className="space-y-1">
          {(Object.keys(roleConfig) as RoomRole[]).map((role) => {
            const roleInfo = roleConfig[role];
            const RoleIcon = roleInfo.icon;
            const isSelected = role === currentRole;

            return (
              <motion.button
                key={role}
                whileHover={{ x: 2 }}
                onClick={() => {
                  onRoleChange(role);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-left",
                  isSelected
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    isSelected ? roleInfo.bgColor : "bg-muted"
                  )}
                >
                  <RoleIcon
                    className={cn(
                      "h-4 w-4",
                      isSelected ? "text-white" : roleInfo.color
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{roleInfo.label}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {roleInfo.description}
                  </p>
                </div>
                {isSelected && (
                  <Check className="h-4 w-4 text-primary shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function RoleBadge({ role }: { role: RoomRole }) {
  const config = roleConfig[role];
  const Icon = config.icon;

  if (role === "participant") return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "absolute -top-1 -left-1 flex items-center justify-center w-5 h-5 rounded-full shadow-md",
        config.bgColor
      )}
    >
      <Icon className="h-3 w-3 text-white" strokeWidth={2.5} />
    </motion.div>
  );
}
