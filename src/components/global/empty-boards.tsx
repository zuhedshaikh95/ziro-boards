"use client";
import { Button } from "@/components/ui";
import { useApiMutation } from "@/hooks";
import { cn } from "@/libs/utils";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { api } from "../../../convex/_generated/api";
import Loader from "./loader";
import { toast } from "sonner";

type Props = {};

const EmptyBoards: React.FC<Props> = ({}) => {
  const { mutate, pending } = useApiMutation(api.board.create);
  const { organization } = useOrganization();

  const handleCreateBoard = async () => {
    if (!organization) return;

    const response = await mutate({
      organizationId: organization?.id!,
      title: "Untitled",
    });

    if (response.error) {
      toast.error("Something went wrong!", {
        description: response.error,
        action: {
          label: "X",
          onClick: () => {},
        },
      });
      return;
    }

    toast.success("Board created!", {
      description: "Happy collaborating.",
      action: {
        label: "X",
        onClick: () => {},
      },
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" height={110} width={110} alt="note" />

      <h2 className="text-2x font-semibold mt-6">Create your first board!</h2>

      <p className="text-muted-foreground text-sm mt-2">Start by creating a board for your organization</p>

      <div className="mt-6">
        <Button
          size="lg"
          onClick={handleCreateBoard}
          disabled={pending}
          className={cn({ "text-transparent": pending })}
        >
          Create board
          {pending && <Loader size="2rem" />}
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
