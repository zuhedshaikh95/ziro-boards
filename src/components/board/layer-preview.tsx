"use client";
import React from "react";

import { Ellipse, Note, Path, Rectangle, Text } from "@/components/board";
import { rgbToHex } from "@/libs/utils";
import { useStorage } from "../../../liveblocks.config";
import { LayerE } from "../../../types";

type Props = {
  id: string;
  onLayerPointerDown: (event: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

const LayerPreview: React.FC<Props> = ({ id, onLayerPointerDown, selectionColor }) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) return null;

  switch (layer.type) {
    case LayerE.Rectangle:
      return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />;

    case LayerE.Ellipse:
      return <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />;

    case LayerE.Text:
      return <Text id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />;

    case LayerE.Note:
      return <Note id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />;

    case LayerE.Path:
      return (
        <Path
          points={layer.points}
          onPointerDown={(event) => onLayerPointerDown(event, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? rgbToHex(layer.fill) : "#000"}
          stroke={selectionColor}
        />
      );

    default:
      console.warn("LayerPreview: Unknown layer type");
      return null;
  }
};

LayerPreview.displayName = "LayerPreview";

export default React.memo(LayerPreview);
