"use client";
import React from "react";
import { AlertDialog } from "@/components/ui";

type Props = {
  children: React.ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
  headerTitle: string;
  description?: string;
};

const ConfirmModal: React.FC<Props> = ({ children, headerTitle, onConfirm, description, disabled }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{headerTitle}</AlertDialog.Title>
          <AlertDialog.Description>{description}</AlertDialog.Description>
        </AlertDialog.Header>

        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action disabled={disabled} onClick={handleConfirm}>
            Confirm
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ConfirmModal;
