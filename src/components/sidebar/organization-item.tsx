"use client";
import { cn } from "@/libs/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import React, { useMemo } from "react";
import { Hint } from "@/components/global";

type Props = {
  id: string;
  name: string;
  imageUrl: string;
};

const OrganizationItem: React.FC<Props> = ({ id, imageUrl, name }) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = useMemo<boolean>(() => organization?.id === id, [organization, id]);

  const onClick = () => {
    if (!setActive) return null;

    setActive({ organization: id });
  };

  return (
    <li className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          fill
          src={imageUrl}
          className={cn("rounded-md cursor-pointer opacity-75 hover:opacity-100", {
            "opacity-100": isActive,
          })}
          onClick={onClick}
          alt={name}
        />
      </Hint>
    </li>
  );
};

export default OrganizationItem;
