"use client";
import React from "react";
import { LayerE, SideE, XYWHT } from "../../../types";
import { useSelf, useStorage } from "../../../liveblocks.config";
import { useSelectionBounds } from "@/hooks";

type Props = {
  onResizeHandlePointerDown: (corner: SideE, initialBounds: XYWHT) => void;
};

const HANDLE_WIDTH = 6;

const SelectionBox: React.FC<Props> = ({ onResizeHandlePointerDown }) => {
  const soleLayerId = useSelf((user) => (user.presence.selection.length === 1 ? user.presence.selection[0] : null));

  const isShowingHandlers = useStorage((root) => soleLayerId && root.layers.get(soleLayerId)?.type !== LayerE.Path);

  const bounds = useSelectionBounds();

  if (!bounds) return null;

  return (
    <>
      <rect
        className="
          fill-transparent
          stroke-blue-800
          pointer-events-none"
        style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />

      {isShowingHandlers && (
        <>
          <rect
            className="
              fill-white
              stroke-1
              stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              // TODO: Add resize handler
            }}
          />

          <rect
            className="
              fill-white
              stroke-1
              stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              // TODO: Add resize handler
            }}
          />

          <rect
            className="
              fill-white
              stroke-1
              stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              // TODO: Add resize handler
            }}
          />

          <rect
            className="
              fill-white
              stroke-1
              stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              // TODO: Add resize handler
            }}
          />

          <rect
            className="
              fill-white
              stroke-1
              stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              // TODO: Add resize handler
            }}
          />

          <rect
            className="
              fill-white
              stroke-1
              stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              // TODO: Add resize handler
            }}
          />

          <rect
            className="
              fill-white
              stroke-1
              stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              // TODO: Add resize handler
            }}
          />

          <rect
            className="
              fill-white
              stroke-1
              stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px)`,
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              // TODO: Add resize handler
            }}
          />
        </>
      )}
    </>
  );
};

SelectionBox.displayName = "SelectionBox";

export default React.memo(SelectionBox);
