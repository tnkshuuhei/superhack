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
  InfoSection,
  Updates,
  Forms,
} from "@/components";
import { optimism } from "@/assets";
import { SCHEMA_UID, formatDecodedData, BASE_URL } from "@/utils";
import {
  GET_SIMPLE_ATTESTATION,
  GET_ATTESTATION_BY_REFID,
  GET_ALL_ATTESTATIONS,
} from "../graphql";
import { useQuery } from "@apollo/client";
import { signIn, useSession } from "next-auth/react";
import { useStateContext } from "@/context";
type ProjectType = {
  ProjectName?: string;
  ProjectDescription?: string;
  PublicGoods?: string;
  Sustainability?: string;
  TeamSize?: string;
  SubmittedDate?: string;
  Links?: string[];
  Website?: string;
  Github?: string;
  Twitter?: string;
  PayoutAddress?: string;
  Round?: string;
  ImageUrl?: string;
  id?: number | null;
};
type RoundInfoType = {
  Organization: string;
  GrantPool: number;
  BudgeHolders: string[];
};
type VoteType = {
  ProjectUid: any;
  AllocatedAmountsOfPoints: number;
  TextField: string;
};
const ProjectPage: NextPage = () => {
  const router = useRouter();
  const { addAttestation, address, currentChainId, baseUrl } =
    useStateContext();
  const project_uid = router.query.address;

  // Project & Reputation States
  const [project, setProject] = useState<ProjectType>({});
  const [reputation, setReputation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("About");
  const [milestonedata, setMilestoneData] = useState({});
  // Reputation State for the form
  const [reputationState, setReputationState] = useState({
    ProjectUid: project_uid,
    TextField: "",
    VerifiedWithWorldid: true,
  });
  // Vote State for the form
  const [voteState, setVoteState] = useState({
    ProjectUid: project_uid,
    AllocatedAmountsOfPoints: 0,
    TextField: "",
  });
  const schemaId = SCHEMA_UID.REPUTATION_SCHEMA[currentChainId];
  const { data: session, status } = useSession();
  console.log("session", session);

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
  // Fetch Round Data
  // Ideally we should be able to fetch the all rounds data and match each project,
  // and project schema has a round refUID of the round schema
  const { data: roundData } = useQuery(GET_SIMPLE_ATTESTATION, {
    variables: {
      id: "0x89124f1740b8180dcce36fe32fe5347b97221988fc9db0c7c0dfc0535b297b1b",
    },
  });
  const [roundInfo, setRoundInfo] = useState<RoundInfoType>({
    Organization: "",
    GrantPool: 0,
    BudgeHolders: [],
  });
  useEffect(() => {
    if (roundData) {
      const roundattestation = formatDecodedData(roundData.attestation);
      setRoundInfo(roundattestation);
      console.log("roundattestation", roundattestation);
    }
  }, [roundData, address]);

  const isBudgetHolder: boolean = roundInfo.BudgeHolders.includes(address);
  useEffect(() => {
    if (data && data.attestation && project_uid) {
      const project_data = formatDecodedData(data.attestation);
      setProject(project_data);
    }
  }, [data, project_uid]);

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
  const [votes, setVotes] = useState([]);
  useEffect(() => {
    if (!VoteData || !VoteData.attestations) return;
    const vote_data = VoteData.attestations.map(formatDecodedData);

    setVotes(vote_data);
  }, [VoteData]);
  useEffect(() => {
    if (!MilestoneData || !MilestoneData.attestations) return;
    const milestone_data = MilestoneData.attestations.map(formatDecodedData);
    setMilestoneData(milestone_data);
  }, [MilestoneData]);

  const handleChange = (fieldName: string, e: any) => {
    setReputationState((prevState) => ({
      ...prevState,
      ProjectUid: project_uid,
      [fieldName]: e.target.value,
    }));
  };
  const handleVoteChange = (fieldName: string, e: any) => {
    setVoteState((prevState) => ({
      ...prevState,
      ProjectUid: project_uid,
      [fieldName]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      await addAttestation(
        schemaId,
        address,
        reputationState,
        "Reputation",
        project_uid
      );
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      router.push(`/${project_uid}`);
      console.log(e);
    }
    e.preventDefault();
  };
  const handleVoteSubmit = async (e: React.FormEvent) => {
    if (voteState.AllocatedAmountsOfPoints === 0) {
      console.log("You need to allocate points more than 0 to vote");
    } else {
      try {
        e.preventDefault();
        setIsLoading(true);
        await addAttestation(
          SCHEMA_UID.EVALUATION_AND_VOTING_SCHEMA[currentChainId],
          address,
          voteState,
          "Evaluation",
          project_uid
        );
        setIsLoading(false);
        router.push(`/${project_uid}`);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    }
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
              {!isBudgetHolder ? (
                <div className="flex-1 space-y-6">
                  <div className="p-6 bg-gray-100 rounded-lg shadow-lg space-y-6">
                    <p className="font-epilogue font-semibold text-[22px] uppercase text-center text-black">
                      Add Reputation
                    </p>
                    <textarea
                      rows={3}
                      placeholder="I support this project because..."
                      className="w-full p-4 outline-none border rounded-lg bg-white font-epilogue text-black text-[18px] leading-[28px] placeholder-gray-400"
                      onChange={(e) => handleChange("TextField", e)}
                    ></textarea>
                    <div className="p-6 bg-white rounded-lg space-y-4">
                      <h4 className="font-epilogue font-semibold text-[16px] text-black">
                        Show gratitude with action.
                      </h4>
                      <p className="font-epilogue font-normal text-gray-600">
                        Share your impressions and experiences to pave the way
                        for a brighter future.
                      </p>
                    </div>
                    {/*TODO: should be !session */}
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
                        handleClick={(e) => handleSubmit(e)}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 space-y-6">
                  <div className="p-6 bg-gray-100 rounded-lg shadow-lg space-y-6">
                    <p className="font-epilogue font-semibold text-[22px] uppercase text-center text-black">
                      You are a budget holder!
                    </p>
                    <div className="p-6 bg-white rounded-lg space-y-2">
                      <h4 className="font-epilogue font-semibold text-[16px] text-black">
                        Vote for this project?
                      </h4>
                      <p className="font-epilogue font-normal text-gray-600">
                        make sure you have checked the project details and
                        reputations by community members.
                      </p>
                    </div>
                    <Forms
                      labelName="Amount of Vote"
                      inputType="number"
                      placeholder="Enter amount of Vote"
                      handleChange={(e) =>
                        handleVoteChange("AllocatedAmountsOfPoints", e)
                      }
                      value={voteState.AllocatedAmountsOfPoints}
                    />
                    <textarea
                      rows={3}
                      placeholder="I wanna vote for this project because..."
                      className="w-full p-4 outline-none border rounded-lg bg-white font-epilogue text-black text-[18px] leading-[28px] placeholder-gray-400"
                      value={voteState.TextField}
                      onChange={(e) => handleVoteChange("TextField", e)}
                    ></textarea>
                    <Button
                      btnType="button"
                      title="Confirm vote"
                      styles="w-full bg-gray-700 text-white hover:bg-gray-800"
                      handleClick={(e) => handleVoteSubmit(e)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === "Vote" && (
            <CustomCard reviews={votes} baseUrl={baseUrl} />
          )}
          {activeTab === "Reputation" && (
            <CustomCard reviews={reputation} baseUrl={baseUrl} />
          )}

          {activeTab === "Updates" && (
            <Updates
              showButton={false}
              projectId={project_uid}
              milestones={milestonedata}
            />
          )}
        </div>
      )}
    </Layout>
  );
};
export default ProjectPage;
