import React from 'react';

const Menu = () => {
  return (
    <div>
      <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
        <li className="hover:text-blue-400 cursor-pointer mb-1">
          <a href="/resume">Resume</a>
        </li>
        <li className="hover:text-blue-400 cursor-pointer">
          <a href="/projects">Projects</a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
