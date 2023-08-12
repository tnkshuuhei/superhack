"use client";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { Layout, ProjectList } from "@/components";

import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { GET_ALL_ATTESTATIONS } from "../graphql";
import { formatDecodedData, SCHEMA_UID } from "@/utils";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [attestationsData, setAttestationsData] = useState([]);
  const { address, currentChainId } = useStateContext();
  const schemaIdValue = SCHEMA_UID.PROJECT_SCHEMA[currentChainId];
  const { data } = useQuery(GET_ALL_ATTESTATIONS, {
    variables: { schemaId: schemaIdValue },
  });
  useEffect(() => {
    if (data && data.attestations) {
      const formattedData = data.attestations.map(formatDecodedData);
      setAttestationsData(formattedData);
    }
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
