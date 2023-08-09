import { ethers } from "ethers";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
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
  // Gets a default provider (in production use something else like infura/alchemy)
  // const provider = ethers.providers.getDefaultProvider("sepolia");
  const signer: any = useEthersSigner({ chainId: 11155111 }); //Sepolia
  // eas.connect(provider);
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const projectSchemaEncoder = new SchemaEncoder(
    "string ProjectName,string ProjectDescription,uint256 Submitted_date,address PayoutAddress,string Twitter,string Github,string Website,string TeamSize,string[] Links,string Publicgoods,string Sustainability"
  );

  const getProjectsAttestations = async () => {
    const attestations = await eas.getAttestation(uid);
    const decodedData = Decode(attestations.data);
    // const decodedData = projectSchemaEncoder.decodeData(attestations.data);
    // console.log("decoded data", decodedData);
    return decodedData;
  };
  const transformFormStateToSchema = (form: any) => {
    return [
      { name: "ProjectName", value: form.projectName, type: "string" },
      {
        name: "ProjectDescription",
        value: form.projectDescription,
        type: "string",
      },
      {
        name: "Submitted_date",
        value: form.submittedDate,
        type: "uint256",
      },
      { name: "PayoutAddress", value: form.payoutAddress, type: "address" },
      { name: "Twitter", value: form.twitter, type: "string" },
      { name: "Github", value: form.github, type: "string" },
      { name: "Website", value: form.website, type: "string" },
      { name: "TeamSize", value: form.teamSize, type: "string" },
      { name: "Links", value: form.links, type: "string[]" },
      { name: "Publicgoods", value: form.publicGoods, type: "string" },
      { name: "Sustainability", value: form.sustainability, type: "string" },
      // Add other fields from formState as needed
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjectsAttestations();
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

  return (
    <StateContext.Provider
      value={{
        address,
        decoded,
        fetchAttestation,
        addAttestation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
