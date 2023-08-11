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
import { formatDecodedData, SCHEMA_UID } from "@/utils";
import { reputation, votes } from "../../utils/sampleproject";
import { GET_SIMPLE_ATTESTATION } from "../../graphql";
import { useQuery } from "@apollo/client";
import { useStateContext } from "@/context";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const uid = router.query;
  const { addAttestation, address, currentChainId } = useStateContext();
  const project_uid = router.query.address;
  const schemaId =
    SCHEMA_UID.PROJECT_APPLICATION_FOR_MILESTONE_GRANT_SCHEMA[currentChainId];

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
    ProjectUid: project_uid,
    RequestedAmount: 0,
    CurrentStatusOfProject: "",
    MilestoneDescription: "",
    UseOfFunds: "",
    ContinueWithLowerAmount: "true",
    Deadline: 1691744871,
  });

  useEffect(() => {
    if (!data || !data.attestation) return;
    setIsLoading(true);
    const project_data = formatDecodedData(data.attestation);
    if (project_data) {
      setProject(project_data);
    }
    setIsLoading(false);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await addAttestation(
      schemaId,
      address,
      milestones,
      "MilestoneApplication",
      project_uid
    );
    setIsLoading(false);
    router.push(`/user/${address}`);
  };
  const handleChange = (fieldName: string, value: any) => {
    let processedValue = value;

    // convert deadline to unix timestamp
    if (fieldName === "Deadline") {
      const dateObj = new Date(value);
      processedValue = Math.floor(dateObj.getTime() / 1000);
    }

    setMilestones((prevState) => ({
      ...prevState,
      ProjectUid: project_uid,
      [fieldName]: processedValue,
    }));
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

                  <div>
                    <Forms
                      labelName="Description of Milestone"
                      inputType="textarea"
                      isTextArea={true}
                      row={2}
                      placeholder=""
                      handleTextChange={(e) =>
                        handleChange("MilestoneDescription", e.target.value)
                      }
                      value={milestones.MilestoneDescription}
                    />
                    <Forms
                      labelName="Current status of your project"
                      inputType="textarea"
                      isTextArea={true}
                      row={2}
                      placeholder=""
                      handleTextChange={(e) =>
                        handleChange("CurrentStatusOfProject", e.target.value)
                      }
                      value={milestones.CurrentStatusOfProject}
                    />
                    <Forms
                      labelName="Use of fund"
                      inputType="textarea"
                      isTextArea={true}
                      row={2}
                      placeholder=""
                      handleTextChange={(e) =>
                        handleChange("UseOfFunds", e.target.value)
                      }
                      value={milestones.UseOfFunds}
                    />
                    <Forms
                      labelName="Requested Amount"
                      inputType="input"
                      isTextArea={false}
                      placeholder=""
                      handleChange={(e) =>
                        handleChange("RequestedAmount", e.target.value)
                      }
                      value={milestones.RequestedAmount}
                    />
                    <Forms
                      labelName="Deadline"
                      inputType="date"
                      isTextArea={false}
                      placeholder="deadline of milestone"
                      handleChange={(e) =>
                        handleChange("Deadline", e.target.value)
                      }
                      value={new Date(milestones.Deadline * 1000)
                        .toISOString()
                        .substr(0, 10)}
                    />
                    <select
                      id="confirmation"
                      onChange={(e) =>
                        handleChange(
                          "ContinueWithLowerAmount",
                          e.target.value === "true"
                        )
                      }
                      value={
                        milestones.ContinueWithLowerAmount ? "true" : "false"
                      }
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <Button
                    btnType="button"
                    title="Confirm"
                    styles="w-full bg-gray-700 text-white hover:bg-gray-800"
                    handleClick={(e) => handleSubmit(e)}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "Vote" && (
            <div></div>
            // <CustomCard
            //   reviews={votes}
            //   baseUrl={"https://sepolia.easscan.org/attestation/view/"}
            // />
          )}
          {activeTab === "Reputation" && (
            <div></div>
            // <CustomCard
            //   reviews={reputation}
            //   baseUrl={"https://sepolia.easscan.org/attestation/view/"}
            // />
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
