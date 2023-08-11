import React, { useState } from "react";
import { Button, Loader } from ".";
import Modal from "../components/Modal";
import Forms from "../components/Forms";
import { useStateContext } from "@/context";
import { useQuery } from "@apollo/client";
import { GET_ATTESTATION_BY_REFID } from "@/graphql";
import { BASE_URL, formatDecodedData, SCHEMA_UID } from "@/utils";
import { useRouter } from "next/router";
interface MilestoneProps {
  ProjectUid: string;
  RequestedAmount: BNtype;
  CurrentStatusOfProject: string;
  MilestoneDescription: string;
  UseOfFunds: string;
  ContinueWithLowerAmount: string;
  Deadline: BNtype;
  id: string;
  showButton?: boolean;
  onButtonClick?: () => void;
  isApproved?: boolean;
  isCompleted?: boolean;
}
interface BNtype {
  type: string;
  hex: string;
}
interface Proof {
  ProjectUid: string;
  MilestoneApplicationUid: string;
  ApplicationReviewUid: string;
  ProofOfAccomplishment: string;
}
const MilestoneCard: React.FC<MilestoneProps> = ({
  ProjectUid,
  RequestedAmount,
  CurrentStatusOfProject,
  MilestoneDescription,
  UseOfFunds,
  ContinueWithLowerAmount,
  Deadline,
  showButton = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [proof, setProof] = useState<Proof>({} as Proof);
  const { address, currentChainId, addAttestation } = useStateContext();
  const { data: reviwData } = useQuery(GET_ATTESTATION_BY_REFID, {
    variables: {
      refUID: id,
      schemaId:
        SCHEMA_UID.REVIEW_FOR_APPLICATION_OF_MILESTONE_SCHEMA[currentChainId],
    },
  });
  const { data: proofData } = useQuery(GET_ATTESTATION_BY_REFID, {
    variables: {
      refUID: id,
      schemaId: SCHEMA_UID.PROOF_OF_WORK_SCHEMA[currentChainId],
    },
  });
  const isReviewDataPresent =
    reviwData && reviwData.attestations && reviwData.attestations.length > 0;
  const isProofDataPresent =
    proofData && proofData.attestations && proofData.attestations.length > 0;
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  console.log(proof);
  const handleChange = (fieldName: string, e: any) => {
    setProof((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
      ProjectUid: ProjectUid,
      MilestoneApplicationUid: id,
      ApplicationReviewUid: reviwData.attestations[0].id,
    }));
  };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await addAttestation(
      SCHEMA_UID.PROOF_OF_WORK_SCHEMA[currentChainId],
      address,
      proof,
      "ProofOfWork",
      id
    );
    setIsLoading(false);
    router.push(`/user/${ProjectUid}`);
  };
  const baseUrl = BASE_URL[currentChainId];
  let formattedDeadline = "N/A";
  if (Deadline && typeof Deadline.hex === "string") {
    const timestamp = parseInt(Deadline.hex, 16) * 1000;
    const dateObject = new Date(timestamp);
    formattedDeadline = `${("0" + (dateObject.getMonth() + 1)).slice(-2)}/${(
      "0" + dateObject.getDate()
    ).slice(-2)}/${dateObject.getFullYear()}`;
  }

  return (
    <div className="border p-5 rounded-lg space-y-4 shadow-md bg-white mb-[21px]">
      {isLoading && <Loader />}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex flex-col space-y-2 transition duration-200 p-2 rounded"
      >
        <div className="flex md:gap-4 gap-2 items-center">
          <p
            className={`text-xl font-semibold tracking-wide ${
              isReviewDataPresent && isProofDataPresent
                ? "text-green-600"
                : isReviewDataPresent
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {isReviewDataPresent && isProofDataPresent
              ? "Completed!"
              : isReviewDataPresent
              ? "Reviewed!"
              : "Draft"}
          </p>
          <div className="flex flex-col p-2 rounded-md">
            <span className="text-gray-500 text-sm">Deadline</span>
            <span className="text-gray-700 font-medium">
              {formattedDeadline}
            </span>
          </div>
          <div className="flex flex-col p-2 rounded-md">
            <span className="text-gray-500 text-sm">Requested</span>
            <span className="text-gray-700 font-medium">
              ${parseInt(RequestedAmount.hex, 16).toString()}
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-epilogue font-semibold text-[16px] text-black uppercase">
            Milestone Description
          </h4>
          <div className="mt-[12px]">
            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
              {MilestoneDescription}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-epilogue font-semibold text-[16px] text-black uppercase">
            Current Status{" "}
          </h4>
          <div className="mt-[12px]">
            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
              {CurrentStatusOfProject}
            </p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 space-y-2 p-2 rounded">
          <div>
            <h4 className="font-epilogue font-semibold text-[16px] text-black uppercase">
              Use of Funds
            </h4>
            <div className="mt-[12px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {UseOfFunds}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="mt-2">
              <a
                href={`${baseUrl}/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#808191] hover:text-[#606060] hover:underline"
              >
                milestone attestation
              </a>
            </div>
            {isReviewDataPresent && (
              <div className="mt-2">
                <a
                  href={`${baseUrl}/${reviwData.attestations[0].id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#808191] hover:text-[#606060] hover:underline"
                >
                  review attestation
                </a>
              </div>
            )}
            {isProofDataPresent && (
              <div className="mt-2">
                <a
                  href={`${baseUrl}/${proofData.attestations[0].id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#808191] hover:text-[#606060] hover:underline"
                >
                  proof attestation
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {showButton && isReviewDataPresent && !isProofDataPresent && (
        <div className="mt-4">
          <Button
            btnType="button"
            title="Submit proof"
            styles="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 ease-in"
            handleClick={handleOpenModal}
          />
        </div>
      )}
      <Modal isOpen={isModalOpen}>
        <div className="space-y-4 bg-white p-4">
          <h2 className="text-2xl font-bold border-b pb-2">
            Submit your proof of work
          </h2>
          <Forms
            labelName="add some links, images, or text to prove your works below"
            inputType="text"
            placeholder=""
            isTextArea={true}
            row={4}
            handleTextChange={(e) => handleChange("ProofOfAccomplishment", e)}
            value={proof.ProofOfAccomplishment}
          />
          <div className="flex justify-between space-x-4 mt-4">
            <Button
              title="Back"
              styles="w-1/2 bg-gray-300 hover:bg-gray-400 text-black"
              handleClick={() => handleCloseModal()}
            />
            <Button
              title="Confirm"
              styles="w-1/2 bg-gray-700 text-white hover:bg-gray-800"
              handleClick={(e) => handleSubmit(e)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default MilestoneCard;
