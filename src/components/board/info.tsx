"use client";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Actions, Hint } from "@/components/global";
import { Button, Separator, Skeleton } from "@/components/ui";
import { useRenameBoardModal } from "@/hooks";
import { cn } from "@/libs/utils";
import { api } from "../../../convex/_generated/api";

type Props = {
  boardId: string;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Info: React.FC<Props> = ({ boardId }) => {
  const { onOpen } = useRenameBoardModal();

  // @ts-ignore
  const data = useQuery(api.board.get, { _id: boardId });

  if (!data) {
    return (
      <Skeleton
        className="
        w-[300px]
        absolute top-2 left-2
        rounded-md
        h-12
        shadow-sm
        flex items-center
        bg-gray-200"
      />
    );
  }

  return (
    <div
      className="
        absolute top-2 left-2
        bg-white
        rounded-md
        px-1.5
        h-12
        flex items-center
        shadow-md"
    >
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button className="px-2" variant="board" asChild>
          <Link href="/" passHref>
            <Image src="/ziro-boards-logo.svg" height={40} width={40} alt="board-logo" />
            <span className={cn("font-semibold text-xl ml-2 text-black", font.className)}>Board</span>
          </Link>
        </Button>
      </Hint>

      <div className="h-1/2 px-1.5">
        <Separator orientation="vertical" />
      </div>

      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button className="text-base font-normal px-2" variant="board" onClick={() => onOpen(data?._id, data?.title)}>
          {data?.title}
        </Button>
      </Hint>

      <div className="h-1/2 px-1.5">
        <Separator orientation="vertical" />
      </div>

      <Actions id={data?._id} title={data?.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export default Info;
