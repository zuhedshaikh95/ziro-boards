import React from "react";

import { rgbToHex } from "@/libs/utils";
import { EllipseLayerT } from "../../../types";

type Props = {
  id: string;
  layer: EllipseLayerT;
  onPointerDown: (event: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const Ellipse: React.FC<Props> = ({ id, layer, onPointerDown, selectionColor }) => {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(event) => onPointerDown(event, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fill ? rgbToHex(fill) : "#000"}
      stroke={selectionColor || "transparent"}
      strokeWidth={1}
    />
  );
};

export default Ellipse;
