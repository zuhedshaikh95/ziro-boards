"use client";
import { DropdownMenu } from "@/components/ui";
import { useApiMutation } from "@/hooks";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";

type Props = {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
};

const Actions: React.FC<Props> = ({ children, id, title, side, sideOffset }) => {
  const { mutate, pending } = useApiMutation(api.board.remove);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/board/${id}`);

    toast.success("Link copied!", { closeButton: true });
  };

  const handleDelete = async () => {
    const response = await mutate({ id });

    if (response.error) {
      return toast.error("Something went wrong!", {
        description: response.error,
        action: {
          label: "X",
          onClick: () => {},
        },
      });
    }

    toast.error(`${title} deleted successfully!`, {
      description: "Sad to see you go",
      action: {
        label: "X",
        onClick: () => {},
      },
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Content side={side} sideOffset={sideOffset} onClick={(event) => event.stopPropagation()}>
        <DropdownMenu.Item className="p-3 cursor-pointer" onClick={handleCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenu.Item>

        <DropdownMenu.Item className="p-3 cursor-pointer" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Actions;
