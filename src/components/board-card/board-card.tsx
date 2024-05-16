"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { Footer, Overlay } from "@/components/board-card";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";

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

const BoardCard: React.FC<Props> = ({
  _creationTime,
  _id,
  authorId,
  authorName,
  imageUrl,
  isFavorite,
  organizationId,
  title,
}) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;

  const createdAtLabel = formatDistanceToNow(_creationTime, { addSuffix: true });

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

export default BoardCard;
