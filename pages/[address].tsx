"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Layout, Loader, CustomCard, InfoSection } from "@/components";
import { optimism } from "@/assets";
import { formatDecodedData } from "@/utils";
import { reputation, votes } from "../utils/sampleproject";
import { GET_SIMPLE_ATTESTATION, GET_ALL_ATTESTATIONS_BY_ID } from "../graphql";
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
                <InfoSection
                  title="Project Description"
                  content={project?.ProjectDescription}
                />
                <InfoSection
                  title="Public Goods"
                  content={project?.PublicGoods}
                />
                <InfoSection
                  title="Sustainability"
                  content={project?.Sustainability}
                />
                <InfoSection title="Team Size" content={project?.TeamSize} />
                <InfoSection title="Website" content={project?.Website} />
                <InfoSection title="Github" content={project?.Github} />
                <InfoSection title="Twitter" content={project?.Twitter} />
                <InfoSection
                  title="Payout Address"
                  content={project?.PayoutAddress}
                />
              </div>

              <div className="flex-1 space-y-6">
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg space-y-6">
                  <p className="font-epilogue font-semibold text-[22px] uppercase text-center text-black">
                    Add Reputation
                  </p>
                  <textarea
                    rows={3}
                    placeholder="I support this project because..."
                    className="w-full p-4 outline-none border rounded-lg bg-white font-epilogue text-black text-[18px] leading-[28px] placeholder-gray-400"
                    onChange={(e) => setAmount(e.target.value)}
                  ></textarea>
                  <div className="p-6 bg-white rounded-lg space-y-4">
                    <h4 className="font-epilogue font-semibold text-[16px] text-black">
                      Show gratitude with action.
                    </h4>
                    <p className="font-epilogue font-normal text-gray-600">
                      Share your impressions and experiences to pave the way for
                      a brighter future.
                    </p>
                  </div>
                  {!session ? (
                    <Button
                      btnType="button"
                      title="Sign In with Worldcoin"
                      styles="w-full bg-white text-black"
                      handleClick={(e) => {
                        e.preventDefault();
                        signIn("worldcoin");
                      }}
                    />
                  ) : (
                    <Button
                      btnType="button"
                      title="Confirm"
                      styles="w-full bg-gray-700 text-white hover:bg-gray-800"
                      handleClick={() => {}}
                    />
                  )}
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
