import React, { useEffect, useState } from "react";
import MilestoneCard from "../components/MilestoneCard";
import Modal from "../components/Modal";
import { useQuery } from "@apollo/client";
import { formatDecodedData, SCHEMA_UID } from "@/utils";
import { GET_ALL_ATTESTATIONS_BY_ID } from "@/graphql";
interface UpdatesProps {
  showButton?: boolean;
  projectId?: string | undefined | string[];
}
const Updates: React.FC<UpdatesProps> = ({ showButton = false, projectId }) => {
  console.log("ProjectId:", projectId);
  // const [milestones, setMilestones] = useState([]);
  // // todo: query from graphql
  // const { data: milestoneData } = useQuery(GET_ALL_ATTESTATIONS_BY_ID, {
  //   variables: { id: projectId },
  // });
  // useEffect(() => {
  //   if (milestoneData && milestoneData.attestations) {
  //     const formattedMilestones =
  //       milestoneData.attestations.map(formatDecodedData);
  //     setMilestones(formattedMilestones);
  //     console.log("milestones: ", milestones);
  //   }
  // }, [milestoneData]);
  const milestones = [
    {
      projectId: "1",
      requestedAmount: "1000",
      currentStatus: "InProgress",
      milestoneDescription: "Development of new feature",
      useOfFunds: "Development and marketing",
      isContinue: true,
      payoutAddress: "0x1234....",
      deadline: "2023-09-30",
      id: "1",
    },
    {
      projectId: "1",
      requestedAmount: "1000",
      currentStatus: "InProgress",
      milestoneDescription: "Development of new feature",
      useOfFunds: "Development and marketing",
      isContinue: true,
      payoutAddress: "0x1234....",
      deadline: "2023-09-30",
      id: "2",
    },
  ];
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h2>Project Updates</h2>

      {milestones.map((milestone, index) => (
        <MilestoneCard
          key={index}
          {...milestone}
          showButton={showButton}
          onButtonClick={handleOpenModal}
        />
      ))}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Milestone Details</h2>
      </Modal>
    </div>
  );
};

export default Updates;
