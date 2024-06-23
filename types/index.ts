export type ColorT = {
  r: number;
  b: number;
  g: number;
};

export type CameraT = {
  x: number;
  y: number;
};

export enum LayerE {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export type RectangleLayerT = {
  type: LayerE.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: ColorT;
  value?: string;
};

export type EllipseLayerT = {
  type: LayerE.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: ColorT;
  value?: string;
};

export type PathLayerT = {
  type: LayerE.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: ColorT;
  points: number[][];
  value?: string;
};

export type TextLayerT = {
  type: LayerE.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: ColorT;
  value?: string;
};

export type NoteLayerT = {
  type: LayerE.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: ColorT;
  value?: string;
};

export type PointT = {
  x: number;
  y: number;
};

export type XYWHT = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum SideE {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasStateT =
  | {
      mode: CanvasModeE.None;
    }
  | {
      mode: CanvasModeE.SelectionNet;
      origin: PointT;
      current?: PointT;
    }
  | {
      mode: CanvasModeE.Translating;
      current: PointT;
    }
  | {
      mode: CanvasModeE.Inserting;
      layerType: LayerE.Ellipse | LayerE.Rectangle | LayerE.Text | LayerE.Note;
    }
  | {
      mode: CanvasModeE.Pencil;
    }
  | {
      mode: CanvasModeE.Pressing;
      origin: PointT;
    }
  | {
      mode: CanvasModeE.Resizing;
      initialBounds: XYWHT;
      corner: SideE;
    };

export enum CanvasModeE {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type LayerT = RectangleLayerT | EllipseLayerT | PathLayerT | TextLayerT | NoteLayerT;
