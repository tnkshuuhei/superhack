"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import { useStateContext } from "../../context";
import { Layout, Button, Loader, Forms } from "@/components";
import { useRouter } from "next/router";
const uid =
  "0xfb388c197362bcecd068bdf640604c86424eb55d60fd92d83e27cb6bdb22c7f3"; //schema uid v2
const CreateProject: NextPage = () => {
  const router = useRouter();
  const { address, addAttestation } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    // ProjectName: "",
    // ProjectDescription: "",
    // publicGoods: "",
    // sustainability: "",
    // teamSize: "",
    // submittedDate: Math.floor(new Date().getTime() / 1000),
    // links: [],
    // website: "",
    // github: "",
    // Twitter: "",
    // PayoutAddress: "",
    // ImageUrl: "",
    Round: "1",
    ProjectName: "Impact House",
    ProjectDescription: "Impact House is built for digital public goods",
    PublicGoods: "Impact House make public goods sustainable		",
    Sustainability:
      "As long as public goods grow up, Impact House can create Impact",
    TeamSize: "1",
    SubmittedDate: Math.floor(new Date().getTime() / 1000),
    Links: [
      "https://docs.attest.sh/docs/welcome",
      "https://optimism-goerli-bedrock.easscan.org/",
      "https://github.com/tnkshuuhei",
    ],
    Website: "https://twitter.com/shutanaka_jp",
    Github: "https://github.com/tnkshuuhei",
    Twitter: "https://twitter.com/shutanaka_jp",
    PayoutAddress: address,
    ImageUrl: "https://avatars.githubusercontent.com/u/60056322?s=280&v=4",
    // id: null,
  });
  // console.log("formState", formState);
  const addLink = () => {
    setFormState((prevState: any) => ({
      ...prevState,
      Links: [...prevState.Links, ""],
    }));
  };

  const removeLink = (index: number) => {
    const updatedLinks = formState.Links.filter((_, i) => i !== index);
    setFormState((prevState) => ({ ...prevState, Links: updatedLinks }));
  };

  const updateLink = (index: number, value: string) => {
    const updatedLinks: any = [...formState.Links];
    updatedLinks[index] = value;
    setFormState((prevState) => ({ ...prevState, Links: updatedLinks }));
  };

  const handleChange = (fieldName: string, e: any) => {
    setFormState({
      ...formState,
      [fieldName]: e.target.value,
    });
  };

  // TODO: add a attest function to attest project application
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    await addAttestation(uid, address, formState);
    setIsLoading(false);
    router.push("/user");
  };

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div className="bg-white flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 md:w-3/4">
          {isLoading && <Loader />}
          <p className="font-bold font-epilogue text-[32px]">Create Project</p>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-[30px]"
          >
            <Forms
              labelName="Project Name"
              inputType="text"
              placeholder="Enter Project Name"
              handleChange={(e) => handleChange("ProjectName", e)}
              value={formState.ProjectName}
            />
            <Forms
              labelName="Description"
              isTextArea={true}
              inputType="text"
              placeholder="Enter Description"
              handleTextChange={(e) => handleChange("ProjectDescription", e)}
              value={formState.ProjectDescription}
            />
            <Forms
              labelName="Image URL"
              inputType="text"
              placeholder="Enter Image URL"
              handleChange={(e) => handleChange("ImageUrl", e)}
              value={formState.ImageUrl}
            />

            <Forms
              labelName="Payout Address"
              inputType="text"
              placeholder="Enter Payout Address"
              handleChange={(e) => handleChange("PayoutAddress", e)}
              value={formState.PayoutAddress}
            />
            <div className="flex flex-wrap gap-[40px]">
              <Forms
                labelName="Twitter"
                inputType="text"
                placeholder="Enter Twitter URL"
                handleChange={(e) => handleChange("Twitter", e)}
                value={formState.Twitter}
              />

              <Forms
                labelName="GitHub"
                inputType="text"
                placeholder="Enter GitHub URL"
                handleChange={(e) => handleChange("Github", e)}
                value={formState.Github}
              />
            </div>
            <div className="flex flex-wrap gap-[40px]">
              <Forms
                labelName="Website"
                inputType="text"
                placeholder="Enter Website URL"
                handleChange={(e) => handleChange("Website", e)}
                value={formState.Website}
              />

              <Forms
                labelName="Team Size"
                inputType="text"
                placeholder="Enter Team Size"
                handleChange={(e) => handleChange("TeamSize", e)}
                value={formState.TeamSize}
              />
            </div>
            {/* You might need a separate component for an array of links or a dynamic list */}

            <Forms
              labelName="How this project impact as public goods?"
              inputType="textarea"
              isTextArea={true}
              placeholder="How do you support development and usage of the OP Stack? What public good do you provide to the Collective?"
              handleTextChange={(e) => handleChange("PublicGoods", e)}
              value={formState.PublicGoods}
            />

            <Forms
              labelName="How this project is sustainable?"
              inputType="textarea"
              isTextArea={true}
              placeholder="How do you sustain yourself? Please list sources of funding and revenue."
              handleTextChange={(e) => handleChange("sustainability", e)}
              value={formState.Sustainability}
            />
            <div>
              <p className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                Add related links
              </p>
              {formState.Links.map((link, index) => (
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
                    styles="bg-red-500 text-white"
                    handleClick={() => removeLink(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                btnType="button"
                title="Add Link"
                styles="bg-[#3a3a43] text-white"
                handleClick={addLink}
              >
                Add Link
              </Button>
            </div>

            <div className="flex justify-center items-center">
              <Button
                btnType="submit"
                title="Create a new project"
                styles="bg-[#3a3a43] text-white"
                handleClick={() => {
                  handleSubmit;
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default CreateProject;
