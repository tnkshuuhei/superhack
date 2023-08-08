"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSetValue = (e: { target: { value: any } }) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between my-[25px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 bg-gray-200 rounded-[100px]">
        <input
          type="text"
          placeholder="Search Project"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          onChange={(e: { target: { value: any } }) => handleSetValue(e)}
        />
      </div>
      <ConnectButton
        showBalance={false}
        accountStatus={{ smallScreen: "address", largeScreen: "full" }}
      />
    </div>
  );
};

export default Header;
