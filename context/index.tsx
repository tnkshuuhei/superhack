import { ethers } from "ethers";
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
const sampleContract: any = {
  address: "0xfE96C671F6BEa573d690C253821Bb1Aa011747ac",
  abi: ABI,
};

export const StateContextProvider = ({ children }: any) => {
  ///////////////////////////////////////
  // Wagmi hooks
  ///////////////////////////////////////
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const { data: ensName } = useEnsName({ address: address });
  const { data: ensAvatar } = useEnsAvatar({ address: address });

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
