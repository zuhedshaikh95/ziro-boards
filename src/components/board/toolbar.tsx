import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react";
import React from "react";

import { ToolButton } from "@/components/board";
import { CanvasModeE, CanvasStateT, LayerE } from "../../../types";

type Props = {
  canvasState: CanvasStateT;
  setCanvasState: (newState: CanvasStateT) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const Toolbar: React.FC<Props> = ({ canRedo, canUndo, canvasState, redo, setCanvasState, undo }) => {
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
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasModeE.None })}
          isActive={[
            CanvasModeE.None,
            CanvasModeE.Translating,
            CanvasModeE.SelectionNet,
            CanvasModeE.Pressing,
            CanvasModeE.Resizing,
          ].includes(canvasState.mode)}
        />

        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => setCanvasState({ mode: CanvasModeE.Inserting, layerType: LayerE.Text })}
          isActive={canvasState.mode === CanvasModeE.Inserting && canvasState.layerType === LayerE.Text}
        />

        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() => setCanvasState({ mode: CanvasModeE.Inserting, layerType: LayerE.Note })}
          isActive={canvasState.mode === CanvasModeE.Inserting && canvasState.layerType === LayerE.Note}
        />

        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => setCanvasState({ mode: CanvasModeE.Inserting, layerType: LayerE.Rectangle })}
          isActive={canvasState.mode === CanvasModeE.Inserting && canvasState.layerType === LayerE.Rectangle}
        />

        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => setCanvasState({ mode: CanvasModeE.Inserting, layerType: LayerE.Ellipse })}
          isActive={canvasState.mode === CanvasModeE.Inserting && canvasState.layerType === LayerE.Ellipse}
        />

        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => setCanvasState({ mode: CanvasModeE.Pencil })}
          isActive={canvasState.mode === CanvasModeE.Pencil}
        />
      </div>

      <div
        className="
            bg-white
            rounded-md
            flex flex-col items-center
            shadow-md
            p-1.5"
      >
        <ToolButton label="Undo" icon={Undo2} onClick={undo} isDisabled={!canUndo} />

        <ToolButton label="Redo" icon={Redo2} onClick={redo} isDisabled={!canRedo} />
      </div>
    </aside>
  );
};

export default Toolbar;
