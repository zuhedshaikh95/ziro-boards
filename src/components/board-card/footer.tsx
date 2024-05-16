import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/libs/utils";

type Props = {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
};

const Footer: React.FC<Props> = ({ authorLabel, createdAtLabel, disabled, isFavorite, onClick, title }) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text-sm truncate max-w-[calc(100%-20px)]">{title}</p>

      <p
        className="
            opacity-0 group-hover:opacity-100
            transition-opacity
            text-xs
            text-muted-foreground
            truncate"
      >
        {authorLabel}, {createdAtLabel}
      </p>

      <button
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          { "cursor-not-allowed opacity-75": disabled }
        )}
        disabled={disabled}
        onClick={onClick}
      >
        <Star className={cn("h-5 w-5", { "fill-blue-600 text-blue-600": isFavorite })} />
      </button>
    </div>
  );
};

export default Footer;
