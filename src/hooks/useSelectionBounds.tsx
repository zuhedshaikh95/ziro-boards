import { shallow } from "@liveblocks/client";

import { useSelf, useStorage } from "../../liveblocks.config";
import { LayerT, XYWHT } from "../../types";

type Props = {};

const boundingBox = (layers: LayerT[]): XYWHT | null => {
  const [first] = layers;

  if (!first) return null;

  let left = first.x,
    right = first.x + first.width,
    top = first.y,
    bottom = first.y + first.height;

  layers.slice(1).forEach((layer, index) => {
    const { x, y, width, height } = layer;

    if (left > x) {
      left = x;
    }

    if (right < x + width) {
      right = x + width;
    }

    if (top > y) {
      top = y;
    }

    if (bottom < y + height) {
      bottom = y + height;
    }
  });

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  } satisfies XYWHT;
};

const useSelectionBounds = (): XYWHT | null => {
  const selection = useSelf((user) => user.presence.selection);

  return useStorage((root) => {
    const selectedLayers = selection.map((laterId) => root.layers.get(laterId)!).filter(Boolean);

    return boundingBox(selectedLayers);
  }, shallow);
};

export default useSelectionBounds;
