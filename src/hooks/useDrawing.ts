import { useState } from "react";
import Konva from "konva";

export interface LineProps {
  points: number[];
}

export interface DotProps {
  x: number;
  y: number;
}

export interface DrawingHandlers {
  handleMouseDown: (e: Konva.KonvaEventObject<MouseEvent> | any) => void;
}

export const useDrawing = (): [LineProps[], DotProps[], DrawingHandlers] => {
  const [lines, setLines] = useState<LineProps[]>([]);
  const [dots, setDots] = useState<DotProps[]>([]);
  const [prevDot, setPrevDot] = useState<DotProps | null>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent> | any) => {
    const pos = e.target.getStage().getPointerPosition();
    if (pos) {
      const newDot = { x: pos.x, y: pos.y };
      const newDots = [...dots, newDot];

      // Connect the new dot to the previous dot
      if (prevDot) {
        const newLine = {
          points: [prevDot.x, prevDot.y, pos.x, pos.y],
        };
        setLines([...lines, newLine]);
      }

      setDots(newDots);
      setPrevDot(newDot);
    }
  };

  const drawingHandlers: DrawingHandlers = {
    handleMouseDown,
  };

  return [lines, dots, drawingHandlers];
};
