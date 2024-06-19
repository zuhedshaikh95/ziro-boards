"use client";
import React from "react";

import { useOthersConnectionIds } from "../../../liveblocks.config";
import { Cursor } from "@/components/board";

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

type Props = {};

const CursorsPresence: React.FC<Props> = ({}) => {
  return (
    <>
      {/* TODO: Draft pencil */}
      <Cursors />
    </>
  );
};

CursorsPresence.displayName = "CursorsPresence";

export default React.memo(CursorsPresence);
