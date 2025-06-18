import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import { FaLayerGroup } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdLogin, MdLogout } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="">
      <div className="bg-[#0071dc] px-3 py-2 lg:px-8 text-white flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-x-3 shrink-0">
          <Link to="/" className="hover:bg-[#06529a] p-2 rounded-full">
            <img src={logo} alt="" className="h-12" />
          </Link>

          <div className="md:flex items-center gap-2 hidden hover:bg-[#06529a] p-3 rounded-full">
            <FaLayerGroup className="text-[17px]" />
            <p className="text-[16px] font-semibold">Sections</p>
          </div>
          <div className="md:flex hidden items-center gap-2 hover:bg-[#06529a] p-3 rounded-full">
            <HiUserGroup className="text-[20px]" />
            <p className="text-[16px] font-semibold">Partners</p>
          </div>
        </div>
        {/* Middle */}
        <div className="hidden relative lg:flex items-center flex-1 mx-6">
          <input type="search" className="rounded-full py-1.5 outline-0 flex-1" />
          <div className="absolute bg-[#ffc220] p-1.5 rounded-full left-1.5">
            <GoSearch className="text-black" />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full">
            <MdLogin className="text-[17px] rotate-90" />
            <p className="text-[16px] font-semibold">Register</p>
          </div>
          <div className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full whitespace-nowrap">
            <MdLogout className="text-[20px] -rotate-90" />
            <p className="text-[16px] font-semibold">Sign in</p>
          </div>
          <Link to="/cart" className="hover:bg-[#06529a] p-3 rounded-full flex items-center gap-2">
            <AiOutlineShoppingCart className="text-[20px]" />
            <span className="text-[16px] font-semibold">Cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;