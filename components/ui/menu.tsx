import React from "react";

const Menu = () => {
  return (
    <div>
      <div className="pr-20 pb-3 font-bold text-xl">Tag List</div>
      <ul className="flex flex-col space-y-4">
        <li className="hover:text-blue-500 cursor-pointer">
          <a href="/resume">Resume</a>
        </li>
        <li className="hover:text-blue-500 cursor-pointer">
          <a href="/projects">Projects</a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
