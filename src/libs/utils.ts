import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import { CameraT, ColorT, LayerE, LayerT, PathLayerT, PointT, SideE, XYWHT } from "../../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export const connectionIdToColor = (connectionId: number): string => {
  return COLORS[connectionId % COLORS.length];
};

export const pointerEventToCanvasPoint = (event: React.PointerEvent, camera: CameraT): PointT => ({
  x: Math.round(event.clientX - camera.x),
  y: Math.round(event.clientY - camera.y),
});

export const rgbToHex = (color: ColorT): string => {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
};

export const resizeBounds = (bounds: XYWHT, corner: SideE, point: PointT): XYWHT => {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  } satisfies XYWHT;

  if ((corner & SideE.Left) === SideE.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & SideE.Right) === SideE.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & SideE.Top) === SideE.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & SideE.Bottom) === SideE.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
};

export const findInterceptingLayersWithRectangle = (
  layerIds: Readonly<string[]>,
  layers: ReadonlyMap<string, LayerT>,
  a: PointT,
  b: PointT
) => {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);

    if (layer == null) continue;

    const { x, y, width, height } = layer;

    if (rect.x + rect.width > x && rect.x < x + width && rect.y + rect.height > y && rect.y < y + height) {
      ids.push(layerId);
    }
  }

  return ids;
};

export const getContrastingTextColor = (color: ColorT) => {
  const luminance = 0.299 * color.r + 0.587 + color.g + 0.114 + color.b;

  return luminance > 182 ? "black" : "white";
};

export const penPointsToPathLayer = (points: number[][], color: ColorT): PathLayerT => {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than 2 points");
  }

  let left = Number.POSITIVE_INFINITY,
    top = Number.POSITIVE_INFINITY,
    right = Number.NEGATIVE_INFINITY,
    bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerE.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
};

export const getSvgPathFromStroke = (stroke: number[][]) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], index, arr) => {
      const [x1, y1] = arr[(index + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};
