"use client";
import { shallow } from "@liveblocks/client";
import React from "react";

import { Cursor, Path } from "@/components/board";
import { rgbToHex } from "@/libs/utils";
import { useOthersConnectionIds, useOthersMapped } from "../../../liveblocks.config";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (others) => ({
      pencilDraft: others.presence.pencilDraft,
      penColor: others.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? rgbToHex(other.penColor) : "#000"}
            />
          );
        }

        return null;
      })}
    </>
  );
};

const CursorsPresence = ({}) => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
};

CursorsPresence.displayName = "CursorsPresence";

export default React.memo(CursorsPresence);
