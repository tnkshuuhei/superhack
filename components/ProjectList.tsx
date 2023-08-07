import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ProjectCard from "./ProjectCard";
import { loader } from "../assets";

const ProjectList = ({ title, isLoading, projects }: any) => {
  const router = useRouter();
  const handleRoute = (project: any) => {
    router.push({
      pathname: `/${project.title}`,
      query: project,
    });
  };

  return (
    <div className="mb-10">
      <h1 className="font-epilogue font-semibold text-[18px] text-black text-left">
        {title} ({projects.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <Image
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && projects.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            any project has not created yet
          </p>
        )}

        {!isLoading &&
          projects.length > 0 &&
          projects.map((project: any) => (
            <ProjectCard
              key={project.id}
              {...project}
              handleClick={() => handleRoute(project)}
            />
          ))}
      </div>
    </div>
  );
};

export default ProjectList;
