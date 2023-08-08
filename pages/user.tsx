"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useStateContext } from "../context";
import { Layout, ProjectList, Button } from "@/components";
import { projects } from "../utils/sampleproject";
import { NextPage } from "next";

const User: NextPage = () => {
  const { address, decoded } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    router.push("/user/createproject");
  };

  return (
    <Layout>
      {/* {projects ? (
        <ProjectList
          title="Created Projects"
          isLoading={isLoading}
          projects={projects}
        />
      ) : ( */}
      <div className="flex justify-center my-[50px]">
        <div className="m-auto">
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No Projects to display
          </p>
          <Button
            btnType="button"
            title="Create Project"
            styles="bg-[#3a3a43]"
            handleClick={handleClick}
          />
        </div>
      </div>

      {/* )} */}
    </Layout>
  );
};
export default User;
