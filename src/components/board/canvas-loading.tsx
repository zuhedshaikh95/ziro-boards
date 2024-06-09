import React from "react";

import { Skeleton } from "@/components/ui";
import { Loader } from "@/components/global";

type Props = {};

const CanvasLoading: React.FC<Props> = ({}) => {
  return (
    <main
      className="
        h-full w-full
        relative
        bg-neutral-100
        touch-none
        flex items-center justify-center"
    >
      {/* <Loader size="50" color="text-muted-foreground" /> */}

      {/* Info Skeleton */}
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

      {/* Participants Skeleton */}
      <Skeleton
        className="
            absolute top-2 right-2
            h-12
            rounded-md
            flex items-center
            shadow-sm
            w-[100px]
            bg-gray-200"
      />

      {/* Toolbar Skeleton */}
      <Skeleton
        className="absolute top-[50%] left-2
            -translate-y-[50%]
            h-[250px] w-[150px]
            flex flex-col gap-y-4
            shadow-sm
            rounded-md
            bg-gray-200"
      />
    </main>
  );
};

export default CanvasLoading;
