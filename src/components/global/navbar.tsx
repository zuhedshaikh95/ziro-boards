"use client";
import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs";
import React from "react";
import { InviteButton, SearchInput } from "@/components/global";

type Props = {};

const Navbar: React.FC<Props> = ({}) => {
  const { organization } = useOrganization();

  return (
    <nav className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex flex-1">
        <SearchInput />
      </div>

      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
              },
              organizationSwitcherTrigger: {
                padding: ".5rem",
                width: "100%",
                borderRadius: ".5rem",
                border: "1px solid #E5E7EB",
                justifyContent: "space-between",
                backgroundColor: "@fff",
              },
            },
          }}
        />
      </div>

      {organization && <InviteButton />}

      <UserButton />
    </nav>
  );
};

export default Navbar;
