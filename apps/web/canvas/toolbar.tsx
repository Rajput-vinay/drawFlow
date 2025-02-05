

import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa6";
import { GiPencil } from "react-icons/gi";
import { CiEraser } from "react-icons/ci";
import { FiMinus } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Tool } from "./Canavas";


interface ToolbarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;

}

export default  function Toolbar({ activeTool, setActiveTool}: ToolbarProps) {
  
  return (
    <div className="lg:top-2 lg:left-110 md:top-2 md:left-10 justify-center fixed flex items-center bg-gray-700 p-2 shadow-md border-b border-gray-300 rounded-md">
      <button
        className={`p-2 mx-1 rounded cursor-pointer ${
          activeTool === "rect" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        onClick={() => setActiveTool("rect")}
      >
        <RiRectangleLine />
      </button>
      <button
        className={`p-2 mx-1 rounded cursor-pointer ${
          activeTool === "circle" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        onClick={() => setActiveTool("circle")}
      >
        <FaRegCircle />
      </button>
      <button
        className={`p-2 mx-1 rounded cursor-pointer ${
          activeTool === "pencil" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        onClick={() => setActiveTool("pencil")}
      >
        <GiPencil />
      </button>
      <button
        className={`p-2 mx-1 rounded cursor-pointer ${
          activeTool === "arrow" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        onClick={() => setActiveTool("arrow")}
      >
        <FaArrowRightLong />
      </button>
      <button
        className={`p-2 mx-1 rounded cursor-pointer ${
          activeTool === "erase" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        onClick={() => setActiveTool("erase")}
      >
        <CiEraser />
      </button>
      <button
        className={`p-2 mx-1 rounded cursor-pointer ${
          activeTool === "line" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        onClick={() => setActiveTool("line")}
      >
        <FiMinus />
      </button>
      
      
    </div>
  );
}
