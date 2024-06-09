"use client";
import { Info, Participants, Toolbar } from "@/components/board";
import React from "react";
import { useSelf } from "../../../liveblocks.config";

type Props = {
  boardId: string;
};

const Canvas: React.FC<Props> = ({ boardId }) => {
  const { info } = useSelf();
  console.log({ info });

  return (
    <main
      className="
        h-full w-full
        relative
        bg-neutral-100
        touch-none"
    >
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
