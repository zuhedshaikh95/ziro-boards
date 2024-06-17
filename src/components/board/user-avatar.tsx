import React from "react";

import { Hint } from "@/components/global";
import { Avatar } from "@/components/ui";

type Props = {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
};

const UserAvatar: React.FC<Props> = ({ borderColor, fallback, name, src }) => {
  return (
    <Hint label={name || "Member"} side="bottom" sideOffset={18}>
      <Avatar.Root className="h-8 w-8 border-2" style={{ borderColor }}>
        <Avatar.Image src={src} />
        <Avatar.Fallback className="text-xs font-semibold">{fallback}</Avatar.Fallback>
      </Avatar.Root>
    </Hint>
  );
};

export default UserAvatar;
