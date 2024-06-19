import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import { CameraT } from "../../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export const connectionIdToColor = (connectionId: number): string => {
  return COLORS[connectionId % COLORS.length];
};

export const pointerEventToCanvasPoint = (event: React.PointerEvent, camera: CameraT) => ({
  x: Math.round(event.clientX - camera.x),
  y: Math.round(event.clientY - camera.y),
});
