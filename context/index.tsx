import { ethers } from "ethers";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import React, { useState, useContext, createContext, useEffect } from "react";
import { useAccount } from "wagmi";
const StateContext = createContext<any>(null);
export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const uid =
  "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd";
import { Decode } from "@/utils";
import { projects } from "../utils/sampleproject";
import { useEthersProvider, useEthersSigner } from "./ethers";
export const StateContextProvider = ({ children }: any) => {
  ///////////////////////////////////////
  // Wagmi hooks
  ///////////////////////////////////////
  const { address, isConnecting, isDisconnected } = useAccount();
  const [decoded, setDecoded] = useState<any>(null);
  const [project, setProject] = useState(null);
  const provider: any = ethers.providers.getDefaultProvider("sepolia");
  const eas = new EAS(EASContractAddress);
  const signer: any = useEthersSigner({ chainId: 11155111 }); //Sepolia
  // eas.connect(provider);
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
        decoded,
        addAttestation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
