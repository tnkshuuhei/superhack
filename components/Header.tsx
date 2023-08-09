"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { vercel } from "@/assets";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  // const [searchValue, setSearchValue] = useState("");

  // const handleSetValue = (e: { target: { value: any } }) => {
  //   setSearchValue(e.target.value);
  // };
  return (
    // <div className="flex md:flex-row flex-col-reverse justify-between my-[25px] gap-6">
    //   <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 bg-gray-200 rounded-[100px]">
    //     <input
    //       type="text"
    //       placeholder="Search Project"
    //       className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
    //       onChange={(e: { target: { value: any } }) => handleSetValue(e)}
    //     />
    //   </div>
    //   <ConnectButton
    //     showBalance={false}
    //     accountStatus={{ smallScreen: "address", largeScreen: "full" }}
    //   />
    // </div>
    <header>
      <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mb-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="./" className="flex items-center">
            <img
              src="https://avatars.githubusercontent.com/u/60056322?s=280&v=4"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              ZORA
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <ConnectButton
              showBalance={false}
              accountStatus={{ smallScreen: "address", largeScreen: "full" }}
            />
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/user"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Created Projects
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/tnkshuuhei/superhack"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
