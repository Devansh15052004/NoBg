import { useState } from "react";
import { assets } from "../Assest/assests.js";

const Menubar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-white px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          src={assets.logo}
          alt="logo"
          className="h-8 w-8 object-contain cursor-pointer"
        />
        <span className="text-2xl font-semibold text-blue-600 cursor-pointer">
          remove. <span className="text-gray-500 cursor-pointer">bg</span>
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-4 gap-1">
        <button className="text-gray-700 hover:text-blue-500 font-semibold">
            login
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full tansition-all">
            sign up
        </button>
      </div>
    </nav>
  );
};
export default Menubar;
