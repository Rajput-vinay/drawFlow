
import {  FaRedo, FaUndo, FaTrash } from "react-icons/fa";
import {  MdTextFields } from "react-icons/md";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa6";
import { GiPencil } from "react-icons/gi";
import { CiEraser } from "react-icons/ci";
import { FiMinus } from "react-icons/fi";

interface ToolbarProps {
    activeTool: string;
    setActiveTool: (Tool: string) => void;
    }

export default function Toolbar({activeTool,setActiveTool}: ToolbarProps) {
 
  return (
    <div className=" top-2 left-110 justify-center fixed flex items-center bg-gray-700 p-2 shadow-md border-b border-gray-300 rounded-md">
      <button className={`p-2 mx-1 rounded cursor-pointer ${activeTool === 'rect' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setActiveTool("rect")}>
      <RiRectangleLine />
      </button>
      <button className={`p-2 mx-1 rounded cursor-pointer ${activeTool === 'circle' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setActiveTool("circle")}>
      <FaRegCircle />
      </button>
      <button className={`p-2 mx-1 rounded cursor-pointer ${activeTool === 'pencil' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setActiveTool("pencil")}>
      <GiPencil />
      </button>
      <button className={`p-2 mx-1 rounded cursor-pointer ${activeTool === 'text' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setActiveTool("text")}>
        <MdTextFields />
      </button>
      <button className={`p-2 mx-1 rounded cursor-pointer ${activeTool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setActiveTool("eraser")}>
      <CiEraser />
      </button>
      <button className={`p-2 mx-1 rounded cursor-pointer ${activeTool === 'line' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setActiveTool("line")}>
      <FiMinus />
      </button>
      <div className="flex-1"></div>
      <button className="p-2 mx-1 cursor-pointer bg-white rounded hover:bg-gray-200">
        <FaUndo />
      </button>
      <button className="p-2 mx-1 cursor-pointer bg-white rounded hover:bg-gray-200">
        <FaRedo />
      </button>
      <button className="p-2 mx-1 cursor-pointer bg-white rounded hover:bg-red-200 text-red-500">
        <FaTrash />
      </button>
    </div>
  );
}
