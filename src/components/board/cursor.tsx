"use client";
import React from "react";
import { MousePointer2 } from "lucide-react";

import { connectionIdToColor } from "@/libs/utils";
import { useOther } from "../../../liveblocks.config";

type Props = {
  connectionId: number;
};

const Cursor: React.FC<Props> = ({ connectionId }) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = info?.name || `Member ${connectionId}`;

  if (!cursor) return null;

  const { x, y } = cursor;

  return (
    <foreignObject
      className="relative drop-shadow-md"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      height={50}
      width={name.length * 10 + 24}
    >
      <MousePointer2
        className="h-5 w-5"
        fill={connectionIdToColor(connectionId)}
        color={connectionIdToColor(connectionId)}
      />

      <span
        className="
          absolute left-5
          px-1.5 py-0.5
          rounded-md
          text-xs font-semibold"
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
      >
        {name}
      </span>
    </foreignObject>
  );
};

Cursor.displayName = "Cursor";

export default React.memo(Cursor);
