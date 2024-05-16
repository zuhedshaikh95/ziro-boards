import Image from "next/image";
import React from "react";

type Props = {};

const EmptyFavorites: React.FC<Props> = ({}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-favorites.svg" height={140} width={140} alt="empty-favorites" />

      <h2 className="text-2x font-semibold mt-6">No favorite boards!</h2>

      <p className="text-muted-foreground text-sm mt-2">Try adding a board to favorites</p>
    </div>
  );
};

export default EmptyFavorites;
