import { useState } from "react";
import Konva from "konva";

export interface LineProps {
  points: number[];
}

export interface DrawingHandlers {
  handleMouseDown: (e: Konva.KonvaEventObject<MouseEvent> | any) => void;
  handleMouseMove: (e: Konva.KonvaEventObject<MouseEvent> | any) => void;
  handleMouseUp: () => void;
}

export const useDrawing = (): [LineProps[], DrawingHandlers] => {
  const [lines, setLines] = useState<LineProps[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent> | any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    if (pos) {
      setLines([...lines, { points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent> | any) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;
    const lastLine = lines[lines.length - 1];
    const [lastX, lastY] = lastLine.points.slice(-2);

    // Only update the points if the mouse has moved significantly
    if (Math.abs(point.x - lastX) > 1 || Math.abs(point.y - lastY) > 1) {
      lastLine.points = lastLine.points.concat([
        lastX,
        lastY,
        point.x,
        point.y,
      ]);
      setLines([...lines.slice(0, -1), lastLine]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const drawingHandlers: DrawingHandlers = {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };

  return [lines, drawingHandlers];
};
