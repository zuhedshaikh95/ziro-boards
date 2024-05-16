"use client";
import { CreateOrganization, useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button, Dialog } from "@/components/ui";

type Props = {};

const EmptyOrganization: React.FC<Props> = ({}) => {
  const { organization } = useOrganization();

  return (
    <div
      className="
        h-full
        flex flex-col items-center justify-center"
    >
      <Image src="/elements.svg" alt="elements" height={200} width={200} />

      <h2 className="text-2xl font-semibold mt-6">Welcome to Ziro Boards</h2>

      <p className="text-muted-foreground text-sm mt-2">Create an Organization to get started</p>

      <div className="mt-6">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button size="lg">Create organization</Button>
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
      </div>
    </div>
  );
};

export default EmptyOrganization;
