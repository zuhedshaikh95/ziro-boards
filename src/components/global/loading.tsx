import Image from "next/image";
import React from "react";

type Props = {
  width?: number;
  height?: number;
};

const Loading: React.FC<Props> = ({ height = 120, width = 120 }) => {
  return (
    <section
      className="
        h-screen w-screen
        flex flex-col justify-center items-center"
    >
      <Image
        src="/ziro-boards-logo.svg"
        className="animate-pulse duration-700"
        width={width}
        height={height}
        alt="logo"
      />
    </section>
  );
};

export default Loading;
