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
    <div className="flex flex-wrap">
      {milestones.length === 0 && (
        <div className="w-full text-center text-[#808191]">
          No milestone added yet
        </div>
      )}
      {milestones.map((milestone, index) => (
        <div className="w-full lg:w-1/2 p-2" key={index}>
          <MilestoneCard {...milestone} showButton={showButton} />
        </div>
      ))}
    </div>
  );
};

export default Updates;
