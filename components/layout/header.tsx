import React from 'react';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => (
  <div className="container mx-auto flex justify-between font-semibold">
    <div>
      <a href="/">jisonnn&apos;s story</a>
    </div>
    <div className="flex flex-row gap-10">
      <ThemeToggle />
      <div>
        <a href="/resume">resume</a>
      </div>
    </div>
  </div>
);

export default Header;
