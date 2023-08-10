"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Button,
  Layout,
  Loader,
  CustomCard,
  Forms,
  InfoSection,
  Updates,
} from "@/components";
import { optimism } from "@/assets";
import { formatDecodedData } from "@/utils";
import { reputation, votes } from "../../utils/sampleproject";
import { GET_SIMPLE_ATTESTATION } from "../../graphql";
import { useQuery } from "@apollo/client";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const uid = router.query;
  const { data } = useQuery(GET_SIMPLE_ATTESTATION, {
    variables: { id: uid.address },
  });
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
  const [milestones, setMilestones] = useState({
    id: uid.address,
    requestedAmount: "",
    status: "",
    description: "",
    links: [],
    use: "",
    address: project.PayoutAddress,
    approval: "",
    deadline: "",
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const handleChange = (fieldName: string, e: any) => {
    setMilestones({
      ...milestones,
      [fieldName]: e.target.value,
    });
  };
  return (
    <Layout>
      {isLoading && <Loader />}
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
                    milestone application
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-[30px]"
                  >
                    <div>
                      <Forms
                        labelName="How this project impact as public goods?"
                        inputType="textarea"
                        isTextArea={true}
                        row={2}
                        placeholder=""
                        handleTextChange={(e) => handleChange("", e)}
                        value={""}
                      />
                    </div>
                    <Button
                      btnType="button"
                      title="Confirm"
                      styles="w-full bg-gray-700 text-white hover:bg-gray-800"
                      handleClick={() => {
                        handleSubmit;
                      }}
                    />
                  </form>
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

          {activeTab === "Updates" && (
            <div>
              <Updates showButton={true} projectId={uid.address} />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};
export default ProjectPage;
