"use client";
import { Kalam } from "next/font/google";
import React from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn, getContrastingTextColor, rgbToHex } from "@/libs/utils";
import { useMutation } from "../../../liveblocks.config";
import { NoteLayerT } from "../../../types";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnWidth, fontSizeBasedOnHeight, maxFontSize);
};

type Props = {
  id: string;
  layer: NoteLayerT;
  onPointerDown: (event: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const StickyNote: React.FC<Props> = ({ id, layer, onPointerDown, selectionColor }) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(
    ({ storage }, newValue: string) => {
      const liveLayers = storage.get("layers");
      liveLayers.get(id)?.set("value", newValue);
    },
    [id]
  );

  const handleContentChange = (event: ContentEditableEvent) => {
    updateValue(event.target.value);
  };

  return (
    <foreignObject
      className="shadow-md drop-shadow-xl"
      x={x}
      y={y}
      height={height}
      width={width}
      onPointerDown={(event) => onPointerDown(event, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? rgbToHex(fill) : "#000",
      }}
    >
      <ContentEditable
        className={cn("h-full w-full flex items-center justify-center text-center outline-none", font.className)}
        html={value ?? "Text"}
        onChange={handleContentChange}
        style={{ color: fill ? getContrastingTextColor(fill) : "#000", fontSize: calculateFontSize(width, height) }}
      />
    </foreignObject>
  );
};

export default StickyNote;