"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

import { Hint } from "@/components/global";
import { Button } from "@/components/ui";

type Props = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

const ToolButton: React.FC<Props> = ({ icon: Icon, label, onClick, isActive, isDisabled }) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button disabled={isDisabled} onClick={onClick} size="icon" variant={isActive ? "boardActive" : "board"}>
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolButton;
