import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

export const SCHEMAS = {
  Project:
    "string Round,string ProjectName,string ProjectDescription,uint256 SubmittedDate,address PayoutAddress,string Twitter,string Github,string Website,string[] Links,string TeamSize,string PublicGoods,string Sustainability,string ImageUrl",
  Evaluation:
    "bytes32 ProjectUid,uint64 AllocatedAmountsOfPoints,string TextField",
  Reputation: "bytes32 ProjectUid,string TextField,bool VerifiedWithWorldid",
  PaymentForRound:
    "address PayoutAddress,string ProjectUid,uint256 AmountDistributed,string TransactionHash,string[] ArrayOfCommunityReputationUid,string[] ArrayOfEvaluationUid",
  MilestoneApplication:
    "bytes32 ProjectUid,uint64 RequestedAmount,string CurrentStatusOfProject,string MilestoneDescription,string UseOfFunds,bool ContinueWithLowerAmount,uint256 Deadline",
  ReviewOfMilestoneApplication:
    "bytes32 ProjectUid,bytes32 MilestoneApplicationUid,uint64 ApprovedAmount,string Description",
  ProofOfWork:
    "bytes32 ProjectUid,bytes32 MilestoneApplicationUid,bytes32 ApplicationReviewUid,string ProofOfAccomplishment",
  PaymentForMilestone:
    "	bytes32 ProjectUid,bytes32 ProofOfWorkUid,string TranscationHash",
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
