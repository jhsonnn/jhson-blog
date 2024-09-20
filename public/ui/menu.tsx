import React from "react";

const Menu = () => {
  return (
    <div>
      <div className="pb-3">Tag List</div>
      <ul className="flex flex-col space-y-4">
        <li className="hover:text-blue-500 cursor-pointer">Resume</li>
        <li className="hover:text-blue-500 cursor-pointer">Projects</li>
      </ul>
    </div>
  );
};

export default Menu;
