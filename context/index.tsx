import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import React, { useState, useContext, createContext, useEffect } from "react";
import { useNetwork } from "wagmi";
import { useAccount } from "wagmi";
import { CONTRACT_ADDRESS, SCHEMA_UID } from "@/utils";
const StateContext = createContext<any>(null);
import { useEthersSigner } from "./ethers";
export const StateContextProvider = ({ children }: any) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [currentChainId, setCurrentChainId] = useState<number>(11155111);
  if (chain) {
    setCurrentChainId(chain.id);
  }
  const EASContractAddress = CONTRACT_ADDRESS[currentChainId];
  const eas = new EAS(EASContractAddress);
  const signer: any = useEthersSigner({ chainId: currentChainId });
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const projectSchemaEncoder = new SchemaEncoder(
    "string Round,string ProjectName,string ProjectDescription,uint256 SubmittedDate,address PayoutAddress,string Twitter,string Github,string Website,string[] Links,string TeamSize,string PublicGoods,string Sustainability,string ImageUrl"
  );

  const transformFormStateToSchema = (form: any) => {
    return [
      { name: "Round", value: form.Round, type: "string" },
      { name: "ProjectName", value: form.ProjectName, type: "string" },
      {
        name: "ProjectDescription",
        value: form.ProjectDescription,
        type: "string",
      },
      {
        name: "SubmittedDate",
        value: form.SubmittedDate,
        type: "uint256",
      },
      { name: "PayoutAddress", value: form.PayoutAddress, type: "address" },
      { name: "Twitter", value: form.Twitter, type: "string" },
      { name: "Github", value: form.Github, type: "string" },
      { name: "Website", value: form.Website, type: "string" },
      { name: "Links", value: form.Links, type: "string[]" },
      { name: "TeamSize", value: form.TeamSize, type: "string" },
      { name: "PublicGoods", value: form.PublicGoods, type: "string" },
      { name: "Sustainability", value: form.Sustainability, type: "string" },
      { name: "ImageUrl", value: form.ImageUrl, type: "string" },
    ];
  };

  const addAttestation = async (uid: string, recipient: string, forms: any) => {
    const schema = transformFormStateToSchema(forms);
    const encodedData = projectSchemaEncoder.encodeData(schema);
    const tx = await eas.attest({
      schema: uid,
      data: {
        recipient: recipient,
        expirationTime: BigInt(0),
        revocable: true,
        data: encodedData,
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
        addAttestation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
