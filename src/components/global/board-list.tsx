"use client";
import { BoardCard } from "@/components/board-card";
import { EmptyBoards, EmptyFavorites, EmptySearch, NewBoardButton } from "@/components/global";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { Skeleton } from "@/components/ui";

type Props = {
  organizationId: string;
  query: {
    search?: string;
    favorites?: string;
  };
};

const BoardList: React.FC<Props> = ({ organizationId, query }) => {
  const boards = useQuery(api.boards.get, { organizationId, ...query });

  if (boards === undefined) {
    return (
      <div>
        <h2 className="text-3xl">{query.favorites ? "Favorite boards" : "Team boards"}</h2>
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-4
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            mt-8 pb-10
            gap-5"
        >
          <NewBoardButton organizationId={organizationId} disabled />
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="
                  aspect-[100/127]
                  rounded-lg
                  overflow-hidden"
              >
                <Skeleton className="h-full w-full" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (!boards?.length && query.search) {
    return <EmptySearch />;
  }

  if (!boards?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!boards?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">{query.favorites ? "Favorite boards" : "Team boards"}</h2>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          mt-8 pb-10
          gap-5"
      >
        <NewBoardButton organizationId={organizationId} />
        {boards.map((board) => (
          <BoardCard key={board._id} {...board} />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
