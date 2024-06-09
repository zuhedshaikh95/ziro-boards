import React from "react";

type Props = {};

const Participants: React.FC<Props> = ({}) => {
  return (
    <div
      className="
        absolute top-2 right-2
        h-12
        bg-white
        rounded-md
        p-3
        flex items-center
        shadow-md"
    >
      List of users
    </div>
  );
};

export default Participants;
