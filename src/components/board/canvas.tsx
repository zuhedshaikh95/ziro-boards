"use client";
import React from "react";

import { Info, Participants, Toolbar } from "@/components/board";

type Props = {
  boardId: string;
};

const Canvas: React.FC<Props> = ({ boardId }) => {
  return (
    <main
      className="
        h-full w-full
        relative
        bg-neutral-100
        touch-none"
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
