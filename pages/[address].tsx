"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Layout, Loader, CustomCard } from "@/components";
import { optimism } from "@/assets";
import { formatDecodedData } from "@/utils";
import { reputation, votes } from "../utils/sampleproject";
import { GET_SIMPLE_ATTESTATION } from "../graphql";
import { useQuery } from "@apollo/client";
import { signIn, signOut, useSession } from "next-auth/react";

const ProjectPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("About");
  const [amount, setAmount] = useState("");
  const [project, setProject] = useState({
    ProjectName: "",
    ProjectDescription: "",
    PublicGoods: "",
    Sustainability: "",
    TeamSize: "",
    SubmittedDate: "",
    Links: [],
    Website: "",
    Github: "",
    Twitter: "",
    PayoutAddress: "",
    Round: "",
    ImageUrl: "",
    id: null,
  });
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();
  const uid = router.query;
  const { data } = useQuery(GET_SIMPLE_ATTESTATION, {
    variables: { id: uid.address },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.attestation) {
        setIsLoading(true);
        const project_data = await formatDecodedData(data.attestation);
        if (project_data) {
          console.log("fetched data:", project_data);
          setProject(project_data);
        }
        setIsLoading(false);
      }
    };
    console.log("project", project);
    fetchData();
  }, [data]);
  return (
    <Layout>
      {/* {isLoading && <Loader />} */}
      {project && (
        <div className="bg-white p-10 rounded-xl">
          <div className="w-full flex md:flex-row flex-col gap-[30px]">
            <div className="bg-white w-[150px] w-[150px] rounded-xl">
              <img
                src={project.ImageUrl || optimism}
                alt="campaign"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex items-center">
              <div className="mt-[20px]">
                <p className="font-epilogue font-bold text-[30px] md:text-[50px] text-[#808191] leading-[26px] text-justify">
                  {project?.ProjectName}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-row overflow-x-auto whitespace-nowrap md:gap-8 py-4 my-2">
              {["About", "Vote", "Reputation", "Updates"].map((tab) => (
                <span
                  key={tab}
                  className={`cursor-pointer py-2 px-4 mx-2 text- ${
                    activeTab === tab
                      ? "bg-gray-200 text-black rounded-full"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
          {activeTab === "About" && (
            <div className="flex mt-[20px] lg:flex-row flex-col gap-5">
              <div className="flex-[2] flex flex-col gap-[40px]">
                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Project Description
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.ProjectDescription}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Public Goods
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.PublicGoods}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Sustainability
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.Sustainability}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Team Size
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.TeamSize}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Website
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.Website}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Github
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.Github}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Twitter
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.Twitter}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Payout Address
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.PayoutAddress}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Add Reputation
                </h4>

                <div className="mt-[20px] flex flex-col p-4 bg-gray-200 rounded-[10px]">
                  <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-black">
                    Attest to the project reputation
                  </p>
                  <div className="mt-[30px]">
                    <textarea
                      rows={3}
                      placeholder="I support this project because..."
                      className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[#808191] text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                      onChange={(e) => setAmount(e.target.value)}
                    ></textarea>

                    <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                      <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                        Show gratitude with action.
                      </h4>
                      <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                        Share your impressions and experiences to pave the way
                        for a brighter future.
                      </p>
                    </div>
                    {!session ? (
                      <div>
                        <Button
                          btnType="button"
                          title="Sign In with Worldcoin"
                          styles="w-full bg-[#3a3a43]"
                          handleClick={(e) => {
                            e.preventDefault();
                            signIn("worldcoin");
                          }}
                        />
                      </div>
                    ) : (
                      <Button
                        btnType="button"
                        title="Confirm"
                        styles="w-full bg-[#3a3a43]"
                        handleClick={() => {}}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Vote" && (
            <CustomCard
              reviews={votes}
              baseUrl={"https://sepolia.easscan.org/attestation/view/"}
            />
          )}
          {activeTab === "Reputation" && (
            <CustomCard
              reviews={reputation}
              baseUrl={"https://sepolia.easscan.org/attestation/view/"}
            />
          )}

          {activeTab === "Updates" && <div></div>}
        </div>
      )}
    </Layout>
  );
};
export default ProjectPage;
