import { FaLongArrowAltLeft } from "react-icons/fa";

export default function Button() {
    return (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded fixed top-2 right-2 flex items-center gap-2 cursor-pointer">
            <FaLongArrowAltLeft />
            Back
        </button>
    );
}
