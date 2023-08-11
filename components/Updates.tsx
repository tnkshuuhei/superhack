import React from "react";
import MilestoneCard from "../components/MilestoneCard";

interface UpdatesProps {
  showButton?: boolean;
  projectId?: string | undefined | string[];
  milestones: any;
}
const Updates: React.FC<UpdatesProps> = ({
  showButton = false,
  projectId,
  milestones,
}) => {
  return (
    <div>
      {milestones.length === 0 && (
        <div className="text-center text-[#808191]">No milestone added yet</div>
      )}
      {milestones.map(
        (milestone, index) => (
          console.log("Milestone:", milestone.Deadline),
          (<MilestoneCard key={index} {...milestone} showButton={showButton} />)
        )
      )}
    </div>
  );
};

export default Updates;
