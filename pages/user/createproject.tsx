"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import { useStateContext } from "../../context";
import { Layout, Button, Loader, Forms } from "@/components";

const CreateProject: NextPage = () => {
  const { address, decoded } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    projectName: "",
    projectDescription: "",
    publicGoods: "",
    sustainability: "",
    teamSize: "",
    submittedDate: "",
    links: [],
    website: "",
    github: "",
    twitter: "",
    payoutAddress: "",
    image_url: "",
    id: null,
  });
  console.log("links", formState.links);
  const addLink = () => {
    setFormState((prevState: any) => ({
      ...prevState,
      links: [...prevState.links, ""],
    }));
  };

  const removeLink = (index: number) => {
    const updatedLinks = formState.links.filter((_, i) => i !== index);
    setFormState((prevState) => ({ ...prevState, links: updatedLinks }));
  };

  const updateLink = (index: number, value: string) => {
    const updatedLinks: any = [...formState.links];
    updatedLinks[index] = value;
    setFormState((prevState) => ({ ...prevState, links: updatedLinks }));
  };

  const handleChange = (fieldName: string, e: any) => {
    setFormState({
      ...formState,
      [fieldName]: e.target.value,
    });
  };

  // TODO: add a attest function to attest project application

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div className="bg-white flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 md:w-3/4">
          {isLoading && <Loader />}
          <p className="font-bold font-epilogue text-[32px]">Create Project</p>
          <form
            onSubmit={(e) => {}}
            className="w-full flex flex-col gap-[30px]"
          >
            <Forms
              labelName="Project Name"
              inputType="text"
              placeholder="Enter Project Name"
              handleChange={(e) => handleChange("projectName", e)}
              value={formState.projectName}
            />

            <Forms
              labelName="Description"
              isTextArea={true}
              inputType="text"
              placeholder="Enter Description"
              handleTextChange={(e) => handleChange("projectDescription", e)}
              value={formState.projectDescription}
            />
            <Forms
              labelName="Image URL"
              inputType="text"
              placeholder="Enter Image URL"
              handleChange={(e) => handleChange("image_url", e)}
              value={formState.image_url}
            />

            <Forms
              labelName="Payout Address"
              inputType="text"
              placeholder="Enter Payout Address"
              handleChange={(e) => handleChange("payoutAddress", e)}
              value={formState.payoutAddress}
            />
            <div className="flex flex-wrap gap-[40px]">
              <Forms
                labelName="Twitter"
                inputType="text"
                placeholder="Enter Twitter URL"
                handleChange={(e) => handleChange("twitter", e)}
                value={formState.twitter}
              />

              <Forms
                labelName="GitHub"
                inputType="text"
                placeholder="Enter GitHub URL"
                handleChange={(e) => handleChange("github", e)}
                value={formState.github}
              />
            </div>
            <div className="flex flex-wrap gap-[40px]">
              <Forms
                labelName="Website"
                inputType="text"
                placeholder="Enter Website URL"
                handleChange={(e) => handleChange("website", e)}
                value={formState.website}
              />

              <Forms
                labelName="Team Size"
                inputType="number"
                placeholder="Enter Team Size"
                handleChange={(e) => handleChange("teamSize", e)}
                value={formState.teamSize}
              />
            </div>
            {/* You might need a separate component for an array of links or a dynamic list */}

            <Forms
              labelName="How this project impact as public goods?"
              inputType="textarea"
              isTextArea={true}
              placeholder="How do you support development and usage of the OP Stack? What public good do you provide to the Collective?"
              handleChange={(e) => handleChange("publicGoods", e)}
              value={formState.publicGoods}
            />

            <Forms
              labelName="How this project is sustainable?"
              inputType="textarea"
              isTextArea={true}
              placeholder="How do you sustain yourself? Please list sources of funding and revenue."
              handleChange={(e) => handleChange("sustainability", e)}
              value={formState.sustainability}
            />
            <div>
              <p className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                Add related links
              </p>
              {formState.links.map((link, index) => (
                <div key={index} className="flex items-center space-x-2 mb-4">
                  <Forms
                    inputType="url"
                    placeholder="Enter link URL"
                    handleChange={(e) => updateLink(index, e.target.value)}
                    value={link}
                  />
                  <Button
                    btnType="button"
                    title="Remove"
                    styles="bg-red-500 "
                    handleClick={() => removeLink(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                btnType="button"
                title="Add Link"
                styles="bg-[#3a3a43] "
                handleClick={addLink}
              >
                Add Link
              </Button>
            </div>

            <div className="flex justify-center items-center">
              <Button
                btnType="submit"
                title="Create a new project"
                styles="bg-[#3a3a43]"
                handleClick={() => {}}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default CreateProject;
