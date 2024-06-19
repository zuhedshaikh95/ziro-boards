import React from "react";

import Room from "@/components/global/room";
import { Canvas, CanvasLoading } from "@/components/board";

type Props = {
  params: {
    boardId: string;
  };
};

export default async function Board({ params }: Props) {
  return (
    <Room roomId={params.boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
}
