"use client";
import { Dialog } from "@/components/ui";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";
import { Hint } from "@/components/global";

type Props = {};

const AddOrganization: React.FC<Props> = ({}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="aspect-square">
          <Hint label="Create organization" side="right" align="start" sideOffset={18}>
            <button
              className="
              bg-white/25
              h-full w-full
              rounded-md
              flex items-center justify-center
              opacity-60 hover:opacity-100
              transition"
            >
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </Dialog.Trigger>

      <Dialog.Content
        className="
          p-0
          w-auto
          bg-transparent
          border-none"
      >
        <CreateOrganization routing="hash" />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddOrganization;
