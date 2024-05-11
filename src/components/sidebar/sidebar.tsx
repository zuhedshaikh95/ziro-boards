import React from "react";
import { AddOrganization, OrganizationsList } from "@/components/sidebar";

type Props = {};

const Sidebar: React.FC<Props> = ({}) => {
  return (
    <aside
      className="
        fixed
        z-[1]
        left-0
        bg-blue-950 text-white
        h-full w-[60px]
        p-3
        flex flex-col gap-y-4"
    >
      <OrganizationsList />
      <AddOrganization />
    </aside>
  );
};

export default Sidebar;
