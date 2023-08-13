"use client";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { Layout, ProjectList } from "@/components";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_ATTESTATIONS,
  GET_ATTESTATION_BY_REFID,
  GET_SIMPLE_ATTESTATION,
} from "../graphql";
import { calculateMatching, formatDecodedData, SCHEMA_UID } from "@/utils";
import { useApolloClient } from "@apollo/client";
import { RoundInfoType } from "@/utils/types";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [attestationsData, setAttestationsData] = useState([]);
  const { address, currentChainId } = useStateContext();
  const client = useApolloClient();
  const [roundInfo, setRoundInfo] = useState<RoundInfoType>({
    Organization: "",
    GrantPool: 0,
    BudgeHolders: [],
  });
  const { data } = useQuery(GET_ALL_ATTESTATIONS, {
    variables: { schemaId: SCHEMA_UID.PROJECT_SCHEMA[currentChainId] },
  });
  const { data: roundData } = useQuery(GET_SIMPLE_ATTESTATION, {
    variables: {
      id: "0x89124f1740b8180dcce36fe32fe5347b97221988fc9db0c7c0dfc0535b297b1b",
    },
  });

  useEffect(() => {
    if (roundData) {
      const roundattestation = formatDecodedData(roundData.attestation);
      setRoundInfo(roundattestation);
    }
  }, [roundData, address]);

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
        const attestationsWithMatching = attestation_data.map((attestation) => {
          const matchingAmount = result[attestation.id]?.matchingAmount;
          return { ...attestation, matchingAmount };
        });
        setAttestationsData(attestationsWithMatching);
      }
    };
    fetchAndSetData();
  }, [client, currentChainId, data, roundInfo.GrantPool]);

  return (
    <Layout>
      {attestationsData.length > 0 ? (
        <ProjectList
          title="All Projects"
          isLoading={isLoading}
          projects={attestationsData}
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
