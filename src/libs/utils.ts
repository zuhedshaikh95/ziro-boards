import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import { CameraT, ColorT, PointT } from "../../types";

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
