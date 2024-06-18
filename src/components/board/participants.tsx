"use client";
import React from "react";

import { UserAvatar } from "@/components/board";
import { useOthers, useSelf } from "../../../liveblocks.config";
import { connectionIdToColor } from "@/libs/utils";

type Props = {};

const MAX_SHOWN_USERS = 1;

const Participants: React.FC<Props> = ({}) => {
  const users = useOthers();
  const user = useSelf();

  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div
      className="
        absolute top-2 right-2
        h-12
        bg-white
        rounded-md
        p-3
        flex items-center
        shadow-md"
    >
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            borderColor={connectionIdToColor(connectionId)}
            key={connectionId}
            src={info?.avatar}
            name={info?.name}
            fallback={info?.name?.charAt(0) || "M"}
          />
        ))}

        {user && (
          <UserAvatar
            borderColor={connectionIdToColor(user.connectionId)}
            src={user.info?.avatar}
            name={`${user.info?.name} (You)`}
            fallback={user.info?.name?.charAt(0)}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+ ${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export default Participants;
