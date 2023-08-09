"use client";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { Layout, ProjectList } from "@/components";

import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { GET_ALL_ATTESTATIONS } from "../graphql";
import { formatDecodedData } from "@/utils";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [attestationsData, setAttestationsData] = useState([]);
  const { address } = useStateContext();
  const schemaIdValue =
    "0xfb388c197362bcecd068bdf640604c86424eb55d60fd92d83e27cb6bdb22c7f3";
  const { data } = useQuery(GET_ALL_ATTESTATIONS, {
    variables: { schemaId: schemaIdValue },
  });
  useEffect(() => {
    if (data && data.attestations) {
      setIsLoading(true);
      const formattedData = data.attestations.map(formatDecodedData);
      setAttestationsData(formattedData);
      setIsLoading(false);
    }
  }, [data]);
  console.log("attestationsData", attestationsData);
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
