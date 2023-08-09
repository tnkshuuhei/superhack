"use client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { Layout, ProjectList, Button } from "@/components";
import { NextPage } from "next";
import { GET_USER_ATTESTATIONS } from "../graphql";
import { useQuery } from "@apollo/client";
import { formatDecodedData } from "@/utils";

const User: NextPage = () => {
  const [attestationsData, setAttestationsData] = useState([]);
  const { address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const schemaIdValue =
    "0xfb388c197362bcecd068bdf640604c86424eb55d60fd92d83e27cb6bdb22c7f3";
  const { data } = useQuery(GET_USER_ATTESTATIONS, {
    variables: { schemaId: schemaIdValue, attester: address },
  });
  useEffect(() => {
    if (data && data.attestations) {
      setIsLoading(true);
      const formattedData = data.attestations.map(formatDecodedData);
      setAttestationsData(formattedData);
      setIsLoading(false);
    }
  }, [data]);
  const handleClick = () => {
    router.push("/user/createproject");
  };
  console.log("created projects", attestationsData);
  return (
    <Layout>
      {attestationsData.length > 0 ? (
        <ProjectList
          title="Your Projects"
          isLoading={isLoading}
          projects={attestationsData}
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
              styles="bg-[#3a3a43]"
              handleClick={handleClick}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};
export default User;
