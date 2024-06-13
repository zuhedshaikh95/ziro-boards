"use client";
import { Loader } from "@/components/global";
import { Button, Dialog, Input } from "@/components/ui";
import { useApiMutation, useRenameBoardModal } from "@/hooks";
import { cn } from "@/libs/utils";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";

type Props = {};

const RenameBoardModal: React.FC<Props> = ({}) => {
  const { mutate, pending } = useApiMutation(api.board.update);
  const { isOpen, onClose, values } = useRenameBoardModal();
  const [title, setTitle] = useState<string>(values.title);

  useEffect(() => {
    setTitle(values.title);
  }, [values]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const response = await mutate({
      id: values.id,
      title,
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

    toast.success("Board renamed!", {
      description: "Hope this sticks",
      action: {
        label: "X",
        onClick: () => {},
      },
    });

    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit board title</Dialog.Title>
        </Dialog.Header>

        <Dialog.Description>Enter a new title for this board</Dialog.Description>

        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            disabled={pending}
            required
            maxLength={50}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Board title"
          />

          <Dialog.Footer>
            <Dialog.Close asChild disabled={pending}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Dialog.Close>

            <Button className={cn({ "text-transparent": pending })} disabled={pending} type="submit">
              Save
              {pending && <Loader />}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default RenameBoardModal;
