"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout, Loader } from "@/components";
import { useStateContext } from "../context";
import { optimism } from "@/assets";

const ProjectPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, decoded, fetchAttestation } = useStateContext();
  const [amount, setAmount] = useState("");
  const [project, setProject] = useState({
    projectName: "",
    projectDescription: "",
    publicGoods: "",
    sustainability: "",
    teamSize: "",
    submittedDate: "",
    links: [],
    website: "",
    github: "",
    twitter: "",
    payoutAddress: "",
    id: null,
  });

  const router = useRouter();
  const recipient = router.query;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchAttestation(recipient.address);
      console.log("fetched data:", data);
      setProject(data);
      setIsLoading(false);
    };
    fetchData();
  }, [recipient]);
  console.log("project:", project);
  return (
    <Layout>
      {isLoading && <Loader />}
      {project && (
        <div className="bg-white p-10 rounded-xl">
          <div className="w-full flex md:flex-row flex-col gap-[30px]">
            <div className="bg-white w-[150px] w-[150px] rounded-xl">
              <Image
                src={optimism}
                alt="campaign"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex items-center">
              <div className="mt-[20px]">
                <p className="font-epilogue font-bold text-[50px] text-[#808191] leading-[26px] text-justify">
                  {project?.projectName}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Project Description
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {project?.projectDescription}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Public Goods
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {project?.publicGoods}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Sustainability
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {project?.sustainability}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Team Size
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {project?.teamSize}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Website
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {project?.website}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Github
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {project?.github}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Twitter
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {project?.twitter}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Payout Address
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {project?.payoutAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default ProjectPage;
