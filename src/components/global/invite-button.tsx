import { Button, Dialog } from "@/components/ui";
import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";

type Props = {};

const InviteButton: React.FC<Props> = ({}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Invite members
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="p-0 bg-transparent border-none w-auto max-w-[880px]">
        <OrganizationProfile
          routing="hash"
          appearance={{
            elements: {
              cardBox: {
                height: 500,
              },
            },
          }}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default InviteButton;
