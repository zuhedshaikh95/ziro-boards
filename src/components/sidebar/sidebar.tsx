import React from "react";

type Props = {};

const Sidebar: React.FC<Props> = ({}) => {
  return (
    <aside
      className="
        fixed
        z-[1]
        left-0
        bg-blue-950 text-white
        h-full
        w-[60px]
        p-3
        flex flex-col gap-y-4"
    >
      Side
    </aside>
  );
};

export default Sidebar;
