"use client";
import React from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "../../../liveblocks.config";

type Props = {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<React.ReactNode | null>;
};

const Room: React.FC<Props> = ({ children, roomId, fallback }) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>{() => children}</ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
