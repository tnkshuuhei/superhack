import { ethers } from "ethers";
const decodeData = (encodedData: any) => {
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

export default decodeData;
