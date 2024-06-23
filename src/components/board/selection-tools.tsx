"use client";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import React from "react";

import { ColorPicker } from "@/components/board";
import { Hint } from "@/components/global";
import { Button } from "@/components/ui";
import { useDeleteLayers, useSelectionBounds } from "@/hooks";
import { CameraT, ColorT } from "../../../types";

type Props = {
  camera: CameraT;
  onColorPick: (color: ColorT) => void;
  sendToBack: () => void;
  sendToFront: () => void;
};

const SelectionTools: React.FC<Props> = ({ camera, onColorPick, sendToBack, sendToFront }) => {
  const selectionBounds = useSelectionBounds();
  const deleteLayers = useDeleteLayers();

  if (!selectionBounds) return null;

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div
      className="
        absolute
        rounded-xl
        p-2
        bg-white
        shadow-sm
        border
        flex
        select-none"
      style={{ transform: `translate(calc(${x}px - 50%),calc(${y - 10}px - 100%))` }}
    >
      <ColorPicker onColorPick={onColorPick} />

      <div className="flex flex-col">
        <Hint label="Bring to front" side="top">
          <Button variant="board" size="icon" onClick={sendToFront}>
            <BringToFront />
          </Button>
        </Hint>

        <Hint label="Send to back" side="bottom">
          <Button variant="board" size="icon" onClick={sendToBack}>
            <SendToBack />
          </Button>
        </Hint>
      </div>

      <div
        className="
          flex items-center
          pl-2
          ml-2
          border-l border-neutral-200"
      >
        <Hint label="Delete">
          <Button variant="board" size="icon" onClick={deleteLayers}>
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

SelectionTools.displayName = "SelectionTools";

export default React.memo(SelectionTools);
