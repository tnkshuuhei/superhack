import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import React, { useState, useContext, createContext, useEffect } from "react";
import { useNetwork } from "wagmi";
import { useAccount } from "wagmi";
import {
  BASE_URL,
  CONTRACT_ADDRESS,
  SCHEMA_UID,
  encodeSchemaData,
  transformFormToSchema,
} from "@/utils";
const StateContext = createContext<any>(null);
import { useEthersSigner } from "./ethers";
const ZERO_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const StateContextProvider = ({ children }: any) => {
  const { address } = useAccount();
  const { chain, chains } = useNetwork();
  const [currentChainId, setCurrentChainId] = useState<number>(11155111);
  useEffect(() => {
    if (chain) {
      setCurrentChainId(chain.id);
    }
  }, [chain]);
  const EASContractAddress = CONTRACT_ADDRESS[currentChainId];
  const eas = new EAS(EASContractAddress);
  const signer: any = useEthersSigner({ chainId: currentChainId });
  eas.connect(signer);
  const baseUrl = BASE_URL[currentChainId];
  const addAttestation = async (
    uid: string,
    recipient: string,
    forms: any,
    schemaType: string,
    refUID: string = ZERO_BYTES32
  ) => {
    const schemaData = transformFormToSchema(forms, schemaType);
    console.log("schemaData", schemaData);
    const encodedData = encodeSchemaData(schemaData, schemaType);
    console.log("encodedData", encodedData);
    const tx = await eas.attest({
      schema: uid,
      data: {
        recipient: recipient,
        expirationTime: BigInt(0),
        revocable: false, // check here
        data: encodedData,
        refUID: refUID,
      },
    });
    console.log("tx", tx);

    // const newAttestationID = await tx.wait();
    // console.log("new attestation id", newAttestationID);
    // return newAttestationID;
  };
  return (
    <StateContext.Provider
      value={{
        address,
        currentChainId,
        baseUrl,
        addAttestation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
