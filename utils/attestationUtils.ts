import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

export const SCHEMAS = {
  Project:
    "string Round,string ProjectName,string ProjectDescription,uint256 SubmittedDate,address PayoutAddress,string Twitter,string Github,string Website,string[] Links,string TeamSize,string PublicGoods,string Sustainability,string ImageUrl",
  Evaluation:
    "bytes32 ProjectUid,uint64 AllocatedAmountsOfPoints,string TextField",
  Reputation: "bytes32 ProjectUid,string TextField",
  PaymentForRound:
    "address PayoutAddress,string ProjectUid,uint256 AmountDistributed,string TransactionHash,string[] ArrayOfCommunityReputationUid,string[] ArrayOfEvaluationUid",
  MilestoneApplication:
    "bytes32 ProjectUid,uint64 RequestedAmount,string CurrentStatusOfProject,string MilestoneDescription,string UseOfFunds,bool ContinueWithLowerAmount,uint256 Deadline",
  ReviewOfMilestoneApplication:
    "bytes32 ProjectUid,bytes32 MilestoneApplicationUid,uint64 ApprovedAmount,string Description",
  ProofOfWork:
    "bytes32 ProjectUid,bytes32 MilestoneApplicationUid,bytes32 ApplicationReviewUid,string ProofOfAccomplishment",
  PaymentForMilestone:
    "bytes32 ProjectUid,bytes32 ProofOfWorkUid,string TranscationHash",
  Round:
    "string Organizer,string Round,address[] BudgeHolders,uint256 GrantPool",
};

export const ROUND_CONTRACT = {
  11155111:
    "0x89124f1740b8180dcce36fe32fe5347b97221988fc9db0c7c0dfc0535b297b1b",
  420: "0x571dbe4ad6b218799bd8d826a503aaade6e47f9980e5f2b9edad71eab75f3018",
};
export const generateFieldsFromSchemaString = (schemaString: string) => {
  return schemaString.split(",").map((field) => {
    const [type, name] = field.trim().split(" ");
    return { name, type };
  });
};

export const transformFormToSchema = (form: any, schemaType: string) => {
  const fields = generateFieldsFromSchemaString(SCHEMAS[schemaType]);
  return fields.map((field) => ({
    name: field.name,
    value: form[field.name],
    type: field.type,
  }));
};

export const encodeSchemaData = (data: any, schemaType: string) => {
  const encoder = new SchemaEncoder(SCHEMAS[schemaType]);
  return encoder.encodeData(data);
};
