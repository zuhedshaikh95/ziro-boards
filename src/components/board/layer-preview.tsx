"use client";
import React from "react";

import { useStorage } from "../../../liveblocks.config";
import { LayerE } from "../../../types";
import { Rectangle } from "@/components/board";

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

    default:
      console.warn("LayerPreview: Unknown layer type");
      return null;
  }
};

LayerPreview.displayName = "LayerPreview";

export default React.memo(LayerPreview);
