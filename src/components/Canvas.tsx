import React, { useState } from "react";
import { Stage, Layer, Line, Image } from "react-konva";
import useImage from "use-image";

interface CanvasProps {}

interface LineProps {
  points: number[];
}

const Canvas: React.FC<CanvasProps> = () => {
  const [lines, setLines] = useState<LineProps[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [image] = useImage("/Images/roofs.webp");

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
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

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Image
            image={image}
            width={window.innerWidth}
            height={window.innerHeight}
          />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="red"
              strokeWidth={10}
              tension={0}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
