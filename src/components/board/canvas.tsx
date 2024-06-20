"use client";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useState } from "react";

import { CursorsPresence, Info, LayerPreview, Participants, SelectionBox, Toolbar } from "@/components/board";
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/libs/utils";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useStorage,
} from "../../../liveblocks.config";
import { CameraT, CanvasModeE, CanvasStateT, ColorT, LayerE, PointT } from "../../../types";

const MAX_LAYERS = 100;

type Props = {
  boardId: string;
};

const Canvas: React.FC<Props> = ({ boardId }) => {
  const layerIds = useStorage((root) => root.layerIds);

  const history = useHistory(),
    canUndo = useCanUndo(),
    canRedo = useCanRedo();

  const selections = useOthersMapped((other) => other.presence.selection);

  const laterIdsToColorSelection = useMemo<Record<string, string>>(() => {
    const colorSelections: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const laterId of selection) {
        colorSelections[laterId] = connectionIdToColor(connectionId);
      }
    }

    return colorSelections;
  }, [selections]);

  const [canvasState, setCanvasState] = useState<CanvasStateT>({ mode: CanvasModeE.None });
  const [camera, setCamera] = useState<CameraT>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<ColorT>({ b: 0, g: 0, r: 0 });

  const insertLater = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerE.Ellipse | LayerE.Rectangle | LayerE.Text | LayerE.Note,
      position: PointT
    ) => {
      const liveLayers = storage.get("layers");

      if (liveLayers.size >= MAX_LAYERS) {
        console.warn("Canvas: MAX_LAYERS limit reached!");
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        fill: lastUsedColor,
        height: 100,
        width: 100,
        x: position.x,
        y: position.y,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasModeE.None });
    },
    [lastUsedColor]
  );

  const onLayerPointerDown = useMutation(
    ({ setMyPresence, self }, event: React.PointerEvent, layerId: string) => {
      if ([CanvasModeE.Pencil, CanvasModeE.Inserting].includes(canvasState.mode)) {
        return;
      }
      event.stopPropagation();
      history.pause();

      const point = pointerEventToCanvasPoint(event, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({ mode: CanvasModeE.Translating, current: point });
      }
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const onPointerMove = useMutation(({ setMyPresence }, event: React.PointerEvent) => {
    event.preventDefault();
    const current = pointerEventToCanvasPoint(event, camera);
    setMyPresence({ cursor: current });
  }, []);

  const onPointerLeave = useMutation(({ setMyPresence }, event: React.PointerEvent) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({}, event: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(event, camera);

      if (canvasState.mode === CanvasModeE.Inserting) {
        insertLater(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasModeE.None });
      }

      history.resume();
    },
    [canvasState, camera, history, insertLater]
  );

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
        onPointerUp={onPointerUp}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={laterIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={() => {}} />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
