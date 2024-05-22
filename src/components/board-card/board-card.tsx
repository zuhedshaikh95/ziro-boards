"use client";
import { Footer, Overlay } from "@/components/board-card";
import { Skeleton } from "@/components/ui";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Actions } from "@/components/global";
import { MoreHorizontal } from "lucide-react";

type Props = {
  _id: string;
  _creationTime: number;
  organizationId: string;
  title: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  isFavorite: boolean;
};

const BoardCard = ({
  _creationTime,
  _id,
  authorId,
  authorName,
  imageUrl,
  isFavorite,
  organizationId,
  title,
}: Props) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;

  const createdAtLabel = formatDistanceToNow(_creationTime, { addSuffix: true, includeSeconds: true });

  return (
    <Link href={`/board/${_id}`} passHref>
      <div
        className="
          group
          aspect-[100/127]
          border
          rounded-lg
          flex flex-col justify-between
          overflow-hidden"
      >
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} className="object-contain" alt="board-thumbnail" fill />
          <Overlay />
          <Actions id={_id} title={title} side="right">
            <button
              className="
                absolute top-1 right-1
                opacity-0 group-hover:opacity-100
                transition-opacity
                px-3 py-2
                outline-none"
            >
              <MoreHorizontal
                className="
                text-white
                opacity-75 hover:opacity-100
                transition-opacity"
              />
            </button>
          </Actions>
        </div>

        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = () => {
  return (
    <div
      className="
        aspect-[100/127]
        rounded-lg
        overflow-hidden"
    >
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default BoardCard;
