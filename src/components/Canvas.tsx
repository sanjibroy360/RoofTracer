import React, { useRef } from "react";
import { Stage, Layer, Line, Circle, Image } from "react-konva";
import useImage from "use-image";
import { useDrawing } from "../hooks/useDrawing";
import roofsImage from "../assets/Images/roofs.webp";
import {
  ArrowDownTrayIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Canvas: React.FC = () => {
  const stageRef = useRef<any>(null);
  const [image] = useImage(roofsImage);
  const [lines, dots, drawingHandlers] = useDrawing();
  const { handleMouseDown } = drawingHandlers;

  const handleExportClick = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL({ mimeType: "image/png" });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-10/12 mx-auto relative pb-6">
      <div className="flex justify-end pt-6">
        <button
          onClick={handleExportClick}
          className="neumorphic-button bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 border border-gray-300 rounded-md shadow-lg p-4 transition duration-300"
        >
          <ArrowDownTrayIcon className="inline w-6 h-6 mr-3" />
          <span>Export as Image</span>
        </button>
      </div>
      <div className="overflow-hidden rounded my-6 h-80vh bg-gray-100 shadow-neumorphic">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          ref={stageRef}
        >
          <Layer>
            <Image
              image={image}
              width={window.innerWidth}
              className="block mx-auto p-4"
            />
            {dots.map((dot, i) => (
              <Circle key={i} x={dot.x} y={dot.y} radius={10} fill="yellow" />
            ))}
            {lines.map((line, i) => (
              <Line key={i} points={line.points} stroke="red" strokeWidth={6} />
            ))}
          </Layer>
        </Stage>
      </div>
      <div className="flex items-start opacity-80 bg-gray-200 py-4 px-3 rounded text-slate-900">
        <InformationCircleIcon className="block mr-2 w-6 pt-1"/>
        <p>
          Draw lines around house roofs by clicking on the image. Click to place
          a dot on the first edge, then click on another edge to draw a line
          between the dots. Repeat to continue drawing connected lines.
        </p>
      </div>
    </div>
  );
};

export default Canvas;
