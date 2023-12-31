"use client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { Layout, ProjectList, Button } from "@/components";
import {
  GET_ALL_ATTESTATIONS,
  GET_ATTESTATION_BY_REFID,
  GET_SIMPLE_ATTESTATION,
} from "@/graphql";
import { useQuery, useApolloClient } from "@apollo/client";
import {
  formatDecodedData,
  SCHEMA_UID,
  calculateMatching,
  ROUND_CONTRACT,
} from "@/utils";
import { RoundInfoType } from "@/utils/types";

const User: NextPage = () => {
  const [attestationsData, setAttestationsData] = useState([]);
  const [filteredAttestations, setFilteredAttestations] = useState([]);
  const { address, currentChainId } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const client = useApolloClient();

  const { data } = useQuery(GET_ALL_ATTESTATIONS, {
    variables: { schemaId: SCHEMA_UID.PROJECT_SCHEMA[currentChainId] },
  });

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
  const { data: roundData } = useQuery(GET_SIMPLE_ATTESTATION, {
    variables: {
      id: ROUND_CONTRACT[currentChainId],
    },
  });
  const [roundInfo, setRoundInfo] = useState<RoundInfoType>({
    Organization: "",
    GrantPool: 0,
    BudgeHolders: [],
  });
  useEffect(() => {
    if (data && data.attestations) {
      const formattedData = data.attestations.map(formatDecodedData);
      setAttestationsData(formattedData);
    }
  }, [data]);
  useEffect(() => {
    if (roundData) {
      const roundattestation = formatDecodedData(roundData.attestation);
      setRoundInfo(roundattestation);
    }
  }, [roundData, address]);
  useEffect(() => {
    if (!data || !data.attestations) return;
    const fetchAndSetData = async () => {
      const pool: any = ethers.utils.formatUnits(roundInfo.GrantPool, 0);

      const attestation_data = data.attestations.map(formatDecodedData);
      if (attestation_data) {
        const projectsWithVotes = {};

        for (let project of attestation_data) {
          const votes = await fetchVotesForProject(project.id);
          const vote_data = votes.map(formatDecodedData);

          // Format votes data to match the structure expected by calculateMatching function
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
        console.log("result: ", result);
        const attestationsWithMatching = attestation_data.map((attestation) => {
          const matchingAmount = result[attestation.id]?.matchingAmount;
          return { ...attestation, matchingAmount };
        });
        const addressFilteredAttestations = attestationsWithMatching.filter(
          (attestation) => attestation.attester === address
        );
        setAttestationsData(attestationsWithMatching);
        setFilteredAttestations(addressFilteredAttestations);
        console.log("Attestations with matching: ", attestationsWithMatching);
      }
    };
    fetchAndSetData();
  }, [data, roundInfo.GrantPool]);
  const handleClick = () => {
    router.push("/user/createproject");
  };
  return (
    <Layout>
      {filteredAttestations.length > 0 ? (
        <ProjectList
          title="Your Projects"
          isLoading={isLoading}
          projects={filteredAttestations}
        />
      ) : (
        <div className="flex justify-center my-[50px]">
          <div className="m-auto">
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              No Projects to display
            </p>
            <Button
              btnType="button"
              title="Create Project"
              styles="bg-[#3a3a43] text-white"
              handleClick={handleClick}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};
export default User;
