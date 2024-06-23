"use client";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  CursorsPresence,
  Info,
  LayerPreview,
  Participants,
  Path,
  SelectionBox,
  SelectionTools,
  Toolbar,
} from "@/components/board";
import { useDeleteLayers, useDisabledScrollBounds } from "@/hooks";
import {
  connectionIdToColor,
  findInterceptingLayersWithRectangle,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
  rgbToHex,
} from "@/libs/utils";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from "../../../liveblocks.config";
import { CameraT, CanvasModeE, CanvasStateT, ColorT, LayerE, PointT, SideE, XYWHT } from "../../../types";

const MAX_LAYERS = 100;

type Props = {
  boardId: string;
};

const Canvas: React.FC<Props> = ({ boardId }) => {
  useDisabledScrollBounds();
  const deleteLayers = useDeleteLayers();
  const layerIds = useStorage((root) => root.layerIds);
  const selection = useSelf((user) => user.presence.selection);
  const pencilDraft = useSelf((user) => user.presence.pencilDraft);

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();

      switch (event.key) {
        case "Delete":
          deleteLayers();
          break;

        case "z":
          if (event.ctrlKey || event.metaKey) {
            if (event.shiftKey) {
              history.redo();
            } else {
              history.undo();
            }
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [deleteLayers, history]);

  const insertLayer = useMutation(
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

  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: PointT) => {
      if (canvasState.mode !== CanvasModeE.Translating) return;

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasModeE.Translating, current: point });
    },
    [canvasState]
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: PointT) => {
      if (canvasState.mode !== CanvasModeE.Resizing) return;

      const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point);

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const unSelectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const startMultiSelection = useCallback((current: PointT, origin: PointT) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({ mode: CanvasModeE.SelectionNet, origin, current });
    }
  }, []);

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: PointT, origin: PointT) => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({ mode: CanvasModeE.SelectionNet, origin, current });

      const ids = findInterceptingLayersWithRectangle(layerIds, layers, origin, current);

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  const setFill = useMutation(
    ({ storage }, fill: ColorT) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);

      selection.forEach((id) => liveLayers.get(id)?.set("fill", fill));
    },
    [selection, setLastUsedColor]
  );

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(id, new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor)));

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasModeE.Pencil });
    },
    [lastUsedColor]
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: PointT, pressure: number) => {
      setMyPresence({ pencilDraft: [[point.x, point.y, pressure]], penColor: lastUsedColor });
    },
    [lastUsedColor]
  );

  const continueDrawing = useMutation(
    ({ setMyPresence, self }, point: PointT, event: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (canvasState.mode !== CanvasModeE.Pencil || event.buttons !== 1 || pencilDraft == null) return;

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 && pencilDraft[0][0] === point.x && pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, event.pressure]],
      });
    },
    [canvasState.mode]
  );

  const sendToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      liveLayerIds.forEach((liveLayerId, index) => {
        if (selection.includes(liveLayerId)) {
          indices.push(index);
        }
      });

      indices.forEach((indice, index) => liveLayerIds.move(indice, index));
    },
    [selection]
  );

  const sendToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      liveLayerIds.forEach((liveLayerId, index) => {
        if (selection.includes(liveLayerId)) {
          indices.push(index);
        }
      });

      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(indices[i], liveLayerIds.length - 1 - (indices.length - 1 - i));
      }
    },
    [selection]
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
      }
      setCanvasState({ mode: CanvasModeE.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: SideE, initialBounds: XYWHT) => {
      history.pause();

      setCanvasState({ mode: CanvasModeE.Resizing, initialBounds, corner });
    },
    [history]
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, event: React.PointerEvent) => {
      event.preventDefault();
      const current = pointerEventToCanvasPoint(event, camera);

      if (canvasState.mode === CanvasModeE.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasModeE.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasModeE.Translating) {
        translateSelectedLayers(current);
      } else if (canvasState.mode === CanvasModeE.Resizing) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasModeE.Pencil) {
        continueDrawing(current, event);
      }

      setMyPresence({ cursor: current });
    },
    [
      canvasState,
      resizeSelectedLayer,
      camera,
      translateSelectedLayers,
      continueDrawing,
      startMultiSelection,
      updateSelectionNet,
    ]
  );

  const onPointerLeave = useMutation(({ setMyPresence }, event: React.PointerEvent) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({}, event: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(event, camera);

      if ([CanvasModeE.None, CanvasModeE.Pressing].includes(canvasState.mode)) {
        unSelectLayers();
        setCanvasState({ mode: CanvasModeE.None });
      } else if (canvasState.mode === CanvasModeE.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasModeE.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasModeE.None });
      }

      history.resume();
    },
    [canvasState, camera, history, insertLayer, unSelectLayers, insertPath, setCanvasState]
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(event, camera);

      if (canvasState.mode === CanvasModeE.Inserting) return;

      if (canvasState.mode === CanvasModeE.Pencil) {
        startDrawing(point, event.pressure);
        return;
      }

      setCanvasState({ origin: point, mode: CanvasModeE.Pressing });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
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

      <SelectionTools camera={camera} onColorPick={setFill} sendToBack={sendToBack} sendToFront={sendToFront} />

      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
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
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />

          {canvasState.mode === CanvasModeE.SelectionNet && canvasState.current != null && (
            <rect
              className="fill-blue-500/5 stroke-blue-500 stroke-1"
              x={Math.min(canvasState.origin.x, canvasState.current.x)}
              y={Math.min(canvasState.origin.y, canvasState.current.y)}
              width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              height={Math.abs(canvasState.origin.y - canvasState.current.y)}
            />
          )}

          <CursorsPresence />

          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path points={pencilDraft} fill={rgbToHex(lastUsedColor)} x={0} y={0} />
          )}
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
