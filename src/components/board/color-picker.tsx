import React from "react";
import { ColorT } from "../../../types";
import { rgbToHex } from "@/libs/utils";

type Props = {
  onColorPick: (color: ColorT) => void;
};

const ColorPicker: React.FC<Props> = ({ onColorPick }) => {
  return (
    <div
      className="
        grid grid-cols-5 gap-x-1
        items-center max-w-[164px]
        pr-2 mr-2
        border-r border-neutral-200"
    >
      <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onColorPick} />
      <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={onColorPick} />
      <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onColorPick} />
      <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onColorPick} />
      <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onColorPick} />
      <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onColorPick} />
      <ColorButton color={{ r: 95, g: 125, b: 75 }} onClick={onColorPick} />
      <ColorButton color={{ r: 249, g: 55, b: 48 }} onClick={onColorPick} />
      <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onColorPick} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onColorPick} />
    </div>
  );
};

type ColorButtonProps = {
  onClick: (color: ColorT) => void;
  color: ColorT;
};

const ColorButton: React.FC<ColorButtonProps> = ({ color, onClick }) => {
  return (
    <button
      className="
        w-6 h-6 
        flex items-center justify-center
        hover:opacity-75
        transition"
      onClick={() => onClick(color)}
    >
      <div
        className="
            w-full h-full
            rounded-md
            border
            border-neutral-300"
        style={{ background: rgbToHex(color) }}
      />
    </button>
  );
};

export default ColorPicker;
