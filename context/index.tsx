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
const ABI =
  require("../smartcontracts/artifacts-zk/contracts//Mycontract.sol/Mycontract.json").abi;
const StateContext = createContext<any>(null);
export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const uid =
  "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd";

const sampleContract: any = {
  address: "0xfE96C671F6BEa573d690C253821Bb1Aa011747ac",
  abi: ABI,
};
// import { useEthersProvider } from "./ethers";

export const StateContextProvider = ({ children }: any) => {
  const [decoded, setDecoded] = useState<any>(null);
  const provider: any = ethers.providers.getDefaultProvider("sepolia");
  const eas = new EAS(EASContractAddress);
  // Gets a default provider (in production use something else like infura/alchemy)
  // const provider = ethers.providers.getDefaultProvider("sepolia");
  eas.connect(provider);

  const getAttestations = async () => {
    const attestations = await eas.getAttestation(uid);
    const decodedData = decodeData(attestations.data);
    // console.log("Attestation: ", attestations);

    return decodedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAttestations();
      setDecoded(data);
    };

    fetchData();
  }, [eas]);

  ///////////////////////////////////////
  // Wagmi hooks
  ///////////////////////////////////////
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const { data: ensName } = useEnsName({ address: address });
  ///////////////////////////////////////
  // Read contract with wagmi
  ///////////////////////////////////////
  const { data: getBalance }: any = useContractRead({
    ...sampleContract,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: getTokenContract }: any = useContractReads({
    contracts: [
      {
        ...sampleContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...sampleContract,
        functionName: "decimals",
      },
      {
        ...sampleContract,
        functionName: "symbol",
      },
    ],
  });

  if (getTokenContract !== undefined) {
    console.log(
      "getbalance: ",
      ethers.utils.formatEther(getBalance?.toString()),
      getTokenContract[2].toString()
    );
  }

  ///////////////////////////////////////
  // Execute contract with wagmi
  ///////////////////////////////////////
  const { config }: any = usePrepareContractWrite({
    ...sampleContract,
    functionName: "transfer",
    args: [address, ethers.utils.parseEther("1")],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const send = async (sendto: any, amount: any) => {
    /*eslint-disable */
    await useContractWrite({
      ...sampleContract,
      functionName: "transfer",
      args: [sendto, ethers.utils.parseEther(amount)],
    });
  };

  return (
    <StateContext.Provider
      value={{
        address,
        decoded,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

const decodeData = (encodedData) => {
  const ethersUtils = ethers.utils;

  const parsed = ethersUtils.defaultAbiCoder.decode(
    [
      "string",
      "string",
      "uint256",
      "address",
      "string",
      "string",
      "string",
      "string",
      "string[]",
      "string",
      "string",
    ],
    encodedData
  );

  return {
    projectName: parsed[0],
    projectDescription: parsed[1],
    submittedDate: parsed[2].toNumber(),
    payoutAddress: parsed[3],
    twitter: parsed[4],
    github: parsed[5],
    website: parsed[6],
    teamSize: parsed[7],
    links: parsed[8],
    publicGoods: parsed[9],
    sustainability: parsed[10],
  };
};
