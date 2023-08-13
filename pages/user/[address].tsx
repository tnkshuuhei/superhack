"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Button,
  Layout,
  Loader,
  Forms,
  InfoSection,
  Updates,
  CustomCard,
} from "@/components";
import {
  BASE_URL,
  calculateMatching,
  formatDecodedData,
  SCHEMA_UID,
} from "@/utils";
import {
  GET_ALL_ATTESTATIONS,
  GET_ATTESTATION_BY_REFID,
  GET_SIMPLE_ATTESTATION,
} from "@/graphql/queries";
import { useApolloClient, useQuery } from "@apollo/client";
import { useStateContext } from "@/context";
import { ProjectType, RoundInfoType } from "@/utils/types";
import { ethers } from "ethers";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const uid = router.query;
  const client = useApolloClient();
  const [amount, setAmount] = useState(0);
  const { addAttestation, address, currentChainId, baseUrl } =
    useStateContext();
  const project_uid = router.query.address;
  const [milestonedata, setMilestoneData] = useState({});
  const [reputation, setReputation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("About");
  const [project, setProject] = useState<ProjectType>({});
  const [roundInfo, setRoundInfo] = useState<RoundInfoType>({
    Organization: "",
    GrantPool: 0,
    BudgeHolders: [],
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
  // Fetch Project Data
  const { data } = useQuery(GET_SIMPLE_ATTESTATION, {
    variables: { id: project_uid },
  });
  // Fetch Reputation Data
  const { data: reputationData } = useQuery(GET_ATTESTATION_BY_REFID, {
    variables: {
      refUID: project_uid,
      schemaId: SCHEMA_UID.REPUTATION_SCHEMA[currentChainId],
    },
  });
  // Fetch Milestone Data
  const { data: MilestoneData } = useQuery(GET_ATTESTATION_BY_REFID, {
    variables: {
      refUID: project_uid,
      schemaId:
        SCHEMA_UID.PROJECT_APPLICATION_FOR_MILESTONE_GRANT_SCHEMA[
          currentChainId
        ],
    },
  });
  // Fetch Vote Data
  const { data: VoteData } = useQuery(GET_ATTESTATION_BY_REFID, {
    variables: {
      refUID: project_uid,
      schemaId: SCHEMA_UID.EVALUATION_AND_VOTING_SCHEMA[currentChainId],
    },
  });
  const { data: roundData } = useQuery(GET_SIMPLE_ATTESTATION, {
    variables: {
      id: "0x89124f1740b8180dcce36fe32fe5347b97221988fc9db0c7c0dfc0535b297b1b",
    },
  });
  const { data: allproject } = useQuery(GET_ALL_ATTESTATIONS, {
    variables: { schemaId: SCHEMA_UID.PROJECT_SCHEMA[currentChainId] },
  });

  useEffect(() => {
    if (!data || !data.attestation) return;
    const project_data = formatDecodedData(data.attestation);
    if (project_data) {
      setProject(project_data);
    }
  }, [data]);
  useEffect(() => {
    if (
      reputationData &&
      reputationData.attestations.length > 0 &&
      project_uid
    ) {
      const reputation_data =
        reputationData.attestations.map(formatDecodedData);
      setReputation(reputation_data);
    }
  }, [reputationData, project_uid]);
  useEffect(() => {
    if (roundData) {
      const roundattestation = formatDecodedData(roundData.attestation);
      setRoundInfo(roundattestation);
      console.log("roundattestation", roundattestation);
    }
  }, [roundData, address]);
  useEffect(() => {
    if (!MilestoneData || !MilestoneData.attestations) return;
    const milestone_data = MilestoneData.attestations.map(formatDecodedData);
    setMilestoneData(milestone_data);
  }, [MilestoneData]);
  const [votes, setVotes] = useState([]);
  useEffect(() => {
    if (!VoteData || !VoteData.attestations) return;
    const vote_data = VoteData.attestations.map(formatDecodedData);
    setVotes(vote_data);
  }, [VoteData]);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await addAttestation(
        SCHEMA_UID.PROJECT_APPLICATION_FOR_MILESTONE_GRANT_SCHEMA[
          currentChainId
        ],
        address,
        milestones,
        "MilestoneApplication",
        project_uid
      );
      setIsLoading(false);
      router.push(`/user/${address}`);
    } catch (e) {
      setIsLoading(false);
      router.push(`/user/${address}`);
      console.log(e);
    }
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
  const getLengthForTab = (tab: string): number => {
    switch (tab) {
      case "Vote":
        return votes.length;
      case "Reputation":
        return reputationData?.attestations.length ?? 0;
      case "Updates":
        return MilestoneData?.attestations.length ?? 0;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const fetchVotesForProject = async (projectUid: string) => {
      const { data: votes } = await client.query({
        query: GET_ATTESTATION_BY_REFID,
        variables: {
          refUID: projectUid,
          schemaId: SCHEMA_UID.EVALUATION_AND_VOTING_SCHEMA[currentChainId],
        },
      });
      return votes.attestations;
    };
    const fetchAndProcessData = async () => {
      if (!allproject || !allproject.attestations) return;

      const attestation_data = allproject.attestations.map(formatDecodedData);
      const projectsWithVotes = {};
      const pool: any = ethers.utils.formatUnits(roundInfo.GrantPool, 0);

      for (let project of attestation_data) {
        const votes = await fetchVotesForProject(project.id);
        const vote_data = votes.map(formatDecodedData);
        const projectVotes = {};
        for (let vote of vote_data) {
          projectVotes[vote.id] = ethers.utils.formatUnits(
            vote.AllocatedAmountsOfPoints,
            0
          );
        }
        projectsWithVotes[project.id] = projectVotes;
      }
      const result = calculateMatching(projectsWithVotes, pool);
      const attestationsWithMatching = attestation_data.map((attestation) => {
        const matchingAmount = result[attestation.id]?.matchingAmount;
        return { ...attestation, matchingAmount };
      });
      const getObjectByAddress = (array, uid) => {
        const matchedObject = array.find((obj) => obj.id === uid);
        return matchedObject?.matchingAmount;
      };
      setAmount(getObjectByAddress(attestationsWithMatching, project_uid));
    };
    fetchAndProcessData();
  }, [allproject, client, currentChainId, project_uid, roundInfo.GrantPool]);
  return (
    <Layout>
      {isLoading && <Loader />}
      {project && (
        <div className="bg-white p-10 rounded-xl">
          <div className="w-full flex md:flex-row flex-col md:gap-8 gap-4 items-center">
            <div className="w-36 rounded-xl overflow-hidden ">
              <img
                src={project.ImageUrl}
                alt="top image"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-epilogue font-bold text-3xl md:text-4xl text-gray-600 ml-4 md:ml-8 flex-grow text-left md:text-justify">
              {project?.ProjectName}
            </p>

            <p className="font-epilogue font-bold text-2xl md:text-3xl text-gray-600 ml-4 md:ml-8">
              $ {amount} raised
            </p>
            <a
              href={`${baseUrl}/${project_uid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-epilogue font-bold border rounded-xl m-2 p-4 shadow-sm text-red-600 ml-4 md:ml-8"
            >
              view attestation
            </a>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-row overflow-x-auto whitespace-nowrap md:gap-8 py-4 my-2">
              {["About", "Vote", "Reputation", "Updates"].map((tab) => {
                let length;
                if (tab !== "About") {
                  length = getLengthForTab(tab);
                }

                return (
                  <span
                    key={tab}
                    className={`cursor-pointer py-2 px-4 mx-2 text- ${
                      activeTab === tab
                        ? "bg-gray-200 text-black rounded-full"
                        : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab} {tab !== "About" && `(${length})`}
                  </span>
                );
              })}
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
              <div className="flex-1 space-y-6 ">
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg space-y-6">
                  <p className="font-epilogue font-semibold text-[22px] uppercase text-center text-black">
                    milestone application
                  </p>

                  <div className="space-y-4">
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
                    <div>
                      <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
                        continue if the approved amount is lower than requested?
                      </span>
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
                        className="mt-[12px] w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
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
            <CustomCard reviews={votes} baseUrl={baseUrl} />
          )}
          {activeTab === "Reputation" && (
            <div>
              <CustomCard reviews={reputation} baseUrl={baseUrl} />
            </div>
          )}

          {activeTab === "Updates" && (
            <div>
              <Updates
                showButton={true}
                projectId={uid.address}
                milestones={milestonedata}
              />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};
export default ProjectPage;
