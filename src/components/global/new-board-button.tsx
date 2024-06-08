"use client";
import { useApiMutation } from "@/hooks";
import { cn } from "@/libs/utils";
import { Plus } from "lucide-react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  organizationId: string;
  disabled?: boolean;
};

const NewBoardButton: React.FC<Props> = ({ organizationId, disabled }) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);

  const handleCreateNewBoard = async () => {
    const response = await mutate({
      organizationId,
      title: "Untitled",
    });

    if (response.error) {
      return toast.error("Something went wrong!", {
        description: response.error,
        action: {
          label: "X",
          onClick: () => {},
        },
      });
    }

    toast.success("Board created!", {
      description: "Happy collaborating.",
      action: {
        label: "X",
        onClick: () => {},
      },
    });

    router.push(`board/${response.data}`);
  };

  return (
    <button
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        {
          "opacity-75 hover:bg-blue-600 cursor-not-allowed": disabled || pending,
        }
      )}
      disabled={disabled || pending}
      onClick={handleCreateNewBoard}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-2" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};

export default NewBoardButton;
