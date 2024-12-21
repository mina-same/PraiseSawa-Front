import React, { useState } from 'react';
import logo from "../assets/images/praise sawa  (1).svg";
import home from "../assets/images/home.svg";
import FullHeart from "../assets/images/FullHeart.svg";
import history from "../assets/images/history.svg";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("home"); // Track the active link

  const handleActiveLink = (link) => {
    setActiveLink(link); // Set the active link when a link is clicked
  };

  return (
    <div className='w-[257px] h-full fixed bg-[#a5a5a5] flex justify-between flex-col'>

      {/* Logo */}
      <div>
        <img src={logo} alt="logo" className='w-[250px] h-[150px]' />

        {/* Links */}
        <div className='flex flex-col gap-7'>
          <div 
            className={`flex p-3 rounded-xl mx-3 gap-2 cursor-pointer ${
              activeLink === "home" ? "bg-[#D9D9D9]" : "border"
            }`} 
            onClick={() => handleActiveLink("home")}
          >
            <img src={home} alt="home icon" />
            <a href="/">Home</a>
          </div>

          <div 
            className={`flex p-3 rounded-xl mx-3 gap-2 cursor-pointer ${
              activeLink === "popular" ? "bg-[#D9D9D9]" : "border"
            }`} 
            onClick={() => handleActiveLink("popular")}
          >
            <img src={history} alt="history icon" />
            <a href="/">Popular Songs</a>
          </div>

          <div 
            className={`flex p-3 rounded-xl mx-3 gap-2 cursor-pointer ${
              activeLink === "library" ? "bg-[#D9D9D9]" : "border"
            }`} 
            onClick={() => handleActiveLink("library")}
          >
            <img src={FullHeart} alt="heart icon" />
            <a href="/">Your Library</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='text-[15px] mb-3 text-center'>
        <div className='border border-[#D9D9D9] mb-3'/>
        © 2024 PraiseSawa
      </div>
    </div>
  );
};

export default Sidebar;
