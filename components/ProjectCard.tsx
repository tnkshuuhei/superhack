import React from "react";
import Image from "next/image";
import { vercel, next, optimism } from "../assets";

function extractTwitterUsername(url) {
  const pattern = /https:\/\/twitter\.com\/([a-zA-Z0-9_]+)/;
  const match = url.match(pattern);
  if (match && match[1]) {
    return match[1];
  }
  return url;
}

const ProjectCard = ({
  projectName,
  projectDescription,
  image,
  handleClick,
  twitter,
}: any) => {
  const username = extractTwitterUsername(twitter);

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-white cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={image || optimism}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">
            {projectName}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {projectDescription}
          </p>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <Image
              src={image || optimism}
              alt="user"
              className="object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-semibold text-[14px] truncate">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-green-600">
              {username}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
