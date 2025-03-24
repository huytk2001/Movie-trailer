import React, { useState } from "react";
import PropTypes from "prop-types";

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

function Header({ onSearch }) {
  const [search, setSearch] = useState("");
  return (
    <div className="p-4 flex justify-between  fixed top-0 left-0 w-full z-[9999]  bg-black">
      <div className="flex items-center gap-8">
        <h1 className="text-[30px] uppercase text-red-700 font-bold ">Movie</h1>
        <nav className="  md:flex items-center space-x-5 text-white ">
          <a href="#" className="hover:text-red-700 text-white">
            Home
          </a>
          <a href="#" className="hover:text-red-700">
            About
          </a>
          <a href="#" className="hover:text-red-700">
            Contact
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-5">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 p-2  rounded-lg text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => onSearch(search)}
          className="bg-red-700 text-white px-3 py-1 rounded-lg">
          Search
        </button>
      </div>
    </div>
  );
}

export default Header;
