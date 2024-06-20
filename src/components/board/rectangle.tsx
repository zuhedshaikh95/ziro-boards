import React from "react";

import { RectangleLayerT } from "../../../types";
import { rgbToHex } from "@/libs/utils";

type Props = {
  id: string;
  layer: RectangleLayerT;
  onPointerDown: (event: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const Rectangle: React.FC<Props> = ({ id, layer, onPointerDown, selectionColor }) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(event) => onPointerDown(event, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? rgbToHex(fill) : "#000"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Rectangle;
