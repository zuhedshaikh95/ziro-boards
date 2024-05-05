"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const Navbar: React.FC<Props> = ({}) => {
  return (
    <nav
      className="
        flex items-center gap-x-4
        p-5
        bg-green-500"
    >
      <div className="hidden lg:flex flex-1 bg-yellow-500">
        {/* TODO: Add search */}
        Search
      </div>

      <UserButton />
    </nav>
  );
};

export default Navbar;
