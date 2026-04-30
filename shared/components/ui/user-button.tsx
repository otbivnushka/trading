import { cn } from "@/shared/lib/utils";
import { User } from "lucide-react";
import React from "react";

interface UserButtonProps {
  className?: string;
}

const UserButton: React.FC<UserButtonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        "rounded-xl border border-input bg-background p-1 text-foreground",
      )}
    >
      <User />
    </div>
  );
};

export { UserButton };
