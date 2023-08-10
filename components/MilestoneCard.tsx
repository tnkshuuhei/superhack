import React, { useState } from "react";
import { Button } from ".";

interface MilestoneProps {
  projectId: string;
  requestedAmount: string;
  currentStatus: string;
  milestoneDescription: string;
  useOfFunds: string;
  isContinue: boolean;
  payoutAddress: string;
  deadline: string;
  showButton?: boolean;
  onButtonClick?: () => void;
  isApproved?: boolean;
  isCompleted?: boolean;
}

const MilestoneCard: React.FC<MilestoneProps> = ({
  projectId,
  requestedAmount,
  currentStatus,
  milestoneDescription,
  useOfFunds,
  isContinue,
  payoutAddress,
  deadline,
  showButton = false,
  onButtonClick,
  isApproved = false,
  isCompleted = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border p-4 rounded">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <p className={isCompleted ? "text-green-500" : "text-red-500"}>
          {isCompleted ? "Completed!" : "Not Completed"}
        </p>
        <h3>Project ID: {projectId}</h3>
        <p>Requested Amount: {requestedAmount}</p>
        <p>Current Status: {currentStatus}</p>
      </div>

      {isOpen && (
        <div className="mt-4">
          <p>Milestone Description: {milestoneDescription}</p>
          <p>Use of Funds: {useOfFunds}</p>
          <p>
            Continue even if approved amount is lower:{" "}
            {isContinue ? "Yes" : "No"}
          </p>
          <p>Payout Address: {payoutAddress}</p>
          <p>Deadline: {deadline}</p>
        </div>
      )}

      {showButton && (
        <Button
          btnType="button"
          title="Approve"
          styles="bg-green-500 hover:bg-green-700 text-white "
          handleClick={onButtonClick}
        >
          Approve
        </Button>
      )}
    </div>
  );
};

export default MilestoneCard;
