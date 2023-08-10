"use client";
import React from "react";

type InfoSectionProps = {
  title: string;
  content?: string | null;
};

const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => (
  <div>
    <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
      {title}
    </h4>
    <div className="mt-[20px]">
      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
        {content}
      </p>
    </div>
  </div>
);

export default InfoSection;
