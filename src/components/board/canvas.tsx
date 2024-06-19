"use client";
import React, { useCallback, useState } from "react";

import { CursorsPresence, Info, Participants, Toolbar } from "@/components/board";
import { useCanRedo, useCanUndo, useHistory, useMutation } from "../../../liveblocks.config";
import { CameraT, CanvasModeE, CanvasStateT } from "../../../types";
import { pointerEventToCanvasPoint } from "@/libs/utils";

type Props = {
  boardId: string;
};

const Canvas: React.FC<Props> = ({ boardId }) => {
  const history = useHistory(),
    canUndo = useCanUndo(),
    canRedo = useCanRedo();

  const [canvasState, setCanvasState] = useState<CanvasStateT>({ mode: CanvasModeE.None });
  const [camera, setCamera] = useState<CameraT>({ x: 0, y: 0 });

  const onPointerMove = useMutation(({ setMyPresence }, event: React.PointerEvent) => {
    event.preventDefault();
    const current = pointerEventToCanvasPoint(event, camera);
    setMyPresence({ cursor: current });
  }, []);

  const onPointerLeave = useMutation(({ setMyPresence }, event: React.PointerEvent) => {
    setMyPresence({ cursor: null });
  }, []);

  const onWheel = useCallback((event: React.WheelEvent) => {
    setCamera((prevCamera) => ({ x: prevCamera.x - event.deltaX, y: prevCamera.y - event.deltaY }));
  }, []);

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
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />

      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
