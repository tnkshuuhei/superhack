"use client";
import React, { ReactNode } from "react";

import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative sm:-8 p-4 bg-gray-100 min-h-screen flex flex-row">
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
