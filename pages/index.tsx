"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useStateContext } from "../context";
import { Layout, ProjectList } from "@/components";
import { projects } from "../utils/sampleproject";
import { NextPage } from "next";

const Home: NextPage = () => {
  const { address, decoded } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      {projects ? (
        <ProjectList
          title="All Projects"
          isLoading={isLoading}
          projects={projects}
        />
      ) : (
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          No Projects to display
        </p>
      )}
    </Layout>
  );
};
export default Home;
