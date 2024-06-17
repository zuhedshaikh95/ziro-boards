"use client";
import { BoardList, EmptyOrganization } from "@/components/global";
import { useOrganization } from "@clerk/nextjs";

export default function Favorites() {
  const { organization } = useOrganization();

  return (
    <section className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrganization />
      ) : (
        <BoardList organizationId={organization.id} query={{ favorites: "true" }} />
      )}
    </section>
  );
}
