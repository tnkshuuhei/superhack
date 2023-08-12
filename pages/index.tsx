"use client";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { Layout, ProjectList } from "@/components";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { GET_ALL_ATTESTATIONS, GET_ATTESTATION_BY_REFID } from "../graphql";
import { calculateMatching, formatDecodedData, SCHEMA_UID } from "@/utils";
import { useApolloClient } from "@apollo/client";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [attestationsData, setAttestationsData] = useState([]);
  const { address, currentChainId } = useStateContext();
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

  useEffect(() => {
    if (!data || !data.attestations) return;
    const fetchAndSetData = async () => {
      setIsLoading(true);
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
        const result = calculateMatching(projectsWithVotes, 1000);
        console.log("result: ", result);
        const attestationsWithMatching = attestation_data.map((attestation) => {
          const matchingAmount = result[attestation.id]?.matchingAmount;
          return { ...attestation, matchingAmount };
        });
        setAttestationsData(attestationsWithMatching);
        console.log("Attestations with matching: ", attestationsWithMatching);
        setIsLoading(false);
      }
    };
    fetchAndSetData();
  }, [data]);

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
