import { ethers } from "ethers";
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import React, { useState, useContext, createContext, useEffect } from "react";
import {
  useAccount,
  useBalance,
  useEnsAvatar,
  useEnsName,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
const StateContext = createContext<any>(null);
export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const uid =
  "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd";
import { Decode } from "@/utils";
import { projects } from "../utils/sampleproject";

export const StateContextProvider = ({ children }: any) => {
  const [decoded, setDecoded] = useState<any>(null);
  const [project, setProject] = useState(null);
  const provider: any = ethers.providers.getDefaultProvider("sepolia");
  const eas = new EAS(EASContractAddress);
  // Gets a default provider (in production use something else like infura/alchemy)
  // const provider = ethers.providers.getDefaultProvider("sepolia");
  eas.connect(provider);

  const getAttestations = async () => {
    const attestations = await eas.getAttestation(uid);
    const decodedData = Decode(attestations.data);
    return decodedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAttestations();
      setDecoded(data);
    };

    fetchData();
  }, [eas]);
  const fetchAttestation = async (address: string) => {
    const matchedProject: any = projects.find(
      (proj) => proj.payoutAddress === address
    );
    return matchedProject;
  };
  ///////////////////////////////////////
  // Wagmi hooks
  ///////////////////////////////////////
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <StateContext.Provider
      value={{
        address,
        decoded,
        fetchAttestation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
