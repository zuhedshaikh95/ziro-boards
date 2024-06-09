import React from "react";

type Props = {};

const Toolbar: React.FC<Props> = ({}) => {
  return (
    <aside
      className="
        absolute top-[50%] left-2
        -translate-y-[50%]
        flex flex-col gap-y-4"
    >
      <div
        className="
        bg-white
        rounded-md
        p-1.5
        flex items-center flex-col gap-y-1
        shadow-md
        "
      >
        <div>Pencil</div>
        <div>Square</div>
        <div>Circle</div>
        <div>Ellipsis</div>
      </div>

      <div
        className="
            bg-white
            rounded-md
            flex flex-col items-center
            shadow-md
            p-1.5"
      >
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </aside>
  );
};

export default Toolbar;
