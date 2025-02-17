import { ArrowRight } from "lucide-react";

const HoverButton = ({ text, handleClick }) => {

  return (
    <button onClick={handleClick} className="relative w-40 h-12 flex items-center justify-center bg-[#EE5023] text-white font-semibold transition-all duration-300 group overflow-hidden border-2 border-transparent hover:border-white">
      <span className="transition-all duration-300 transform group-hover:-translate-x-4">
        {text}
      </span>
      <div className="absolute right-4 w-8 h-8 flex items-center justify-center bg-white text-[#EE5023] opacity-0 group-hover:opacity-100 group-hover:right-2 transition-all duration-300">
        <ArrowRight size={18} />
      </div>
    </button>
  );
};  

export default HoverButton;
