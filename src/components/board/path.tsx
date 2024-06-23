import React from "react";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke, rgbToHex } from "@/libs/utils";
import { PathLayerT } from "../../../types";

type Props = {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  stroke?: string;
};

const Path: React.FC<Props> = ({ fill, points, x, y, onPointerDown, stroke }) => {
  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 10,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};

export default Path;
