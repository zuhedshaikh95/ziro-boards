"use client";
import { useOrganizationList } from "@clerk/nextjs";
import React from "react";
import { OrganizationItem } from "@/components/sidebar";

type Props = {};

const OrganizationList: React.FC<Props> = ({}) => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data.map(({ organization }) => (
        <OrganizationItem
          key={organization.id}
          id={organization.id}
          name={organization.name}
          imageUrl={organization.imageUrl}
        />
      ))}
    </ul>
  );
};

export default OrganizationList;
