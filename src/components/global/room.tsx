"use client";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import React from "react";

import { RoomProvider } from "../../../liveblocks.config";
import { LayerT } from "../../../types";

type Props = {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<React.ReactNode | null>;
};

const Room: React.FC<Props> = ({ children, roomId, fallback }) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null, selection: [], pencilDraft: null, penColor: null }}
      initialStorage={{ layers: new LiveMap<string, LiveObject<LayerT>>(), layerIds: new LiveList<string>() }}
    >
      <ClientSideSuspense fallback={fallback}>{() => children}</ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
