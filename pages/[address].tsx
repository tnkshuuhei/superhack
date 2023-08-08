"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Layout, Loader, CustomCard } from "@/components";
import { useStateContext } from "../context";
import { optimism } from "@/assets";

const ProjectPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("About");
  const { address, decoded, fetchAttestation } = useStateContext();
  const [amount, setAmount] = useState("");
  const [project, setProject] = useState({
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
    id: null,
  });

  const router = useRouter();
  const recipient = router.query;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchAttestation(recipient.address);
      console.log("fetched data:", data);
      setProject(data);
      setIsLoading(false);
    };
    fetchData();
  }, [recipient.address]);
  return (
    <Layout>
      {isLoading && <Loader />}
      {project && (
        <div className="bg-white p-10 rounded-xl">
          <div className="w-full flex md:flex-row flex-col gap-[30px]">
            <div className="bg-white w-[150px] w-[150px] rounded-xl">
              <Image
                src={optimism}
                alt="campaign"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex items-center">
              <div className="mt-[20px]">
                <p className="font-epilogue font-bold text-[30px] md:text-[50px] text-[#808191] leading-[26px] text-justify">
                  {project?.projectName}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-row overflow-x-auto whitespace-nowrap md:gap-8 py-4 my-2">
              {["About", "Vote", "Reputation", "Updates"].map((tab) => (
                <span
                  key={tab}
                  className={`cursor-pointer py-2 px-4 mx-2 text- ${
                    activeTab === tab
                      ? "bg-gray-200 text-black rounded-full"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
          {activeTab === "About" && (
            <div className="flex mt-[20px] lg:flex-row flex-col gap-5">
              <div className="flex-[2] flex flex-col gap-[40px]">
                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Project Description
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.projectDescription}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Public Goods
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.publicGoods}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Sustainability
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.sustainability}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Team Size
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.teamSize}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Website
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.website}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Github
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.github}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Twitter
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.twitter}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                    Payout Address
                  </h4>
                  <div className="mt-[20px]">
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {project?.payoutAddress}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                  Add Reputation
                </h4>

                <div className="mt-[20px] flex flex-col p-4 bg-gray-200 rounded-[10px]">
                  <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-black">
                    Attest to the project reputation
                  </p>
                  <div className="mt-[30px]">
                    <textarea
                      rows={3}
                      placeholder="I support this project because..."
                      className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[#808191] text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                      onChange={(e) => setAmount(e.target.value)}
                    ></textarea>

                    <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                      <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                        Show gratitude with action.
                      </h4>
                      <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                        Share your impressions and experiences to pave the way
                        for a brighter future.
                      </p>
                    </div>
                    <Button
                      btnType="button"
                      title="Confirm"
                      styles="w-full bg-[#3a3a43]"
                      handleClick={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Vote" && (
            <CustomCard
              reviews={votes}
              baseUrl={"https://sepolia.easscan.org/attestation/view/"}
            />
          )}
          {activeTab === "Reputation" && (
            <CustomCard
              reviews={reputation}
              baseUrl={"https://sepolia.easscan.org/attestation/view/"}
            />
          )}

          {activeTab === "Updates" && <div></div>}
        </div>
      )}
    </Layout>
  );
};
export default ProjectPage;

const reputation = [
  {
    content:
      "I've been using this product for a few months now, and I must say it's a game-changer. The interface is user-friendly, and it offers features that other products in the market don't. I highly recommend giving it a try.",
    userAddress: "hironothero.eth",
    date: "08/01/2023",
    uid: "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd",
  },
  {
    content:
      "At first, I was a bit skeptical about its capabilities, but after using it extensively, I can vouch for its efficiency. It's now an essential tool in my daily workflow.",
    userAddress: "aliceinchainz.eth",
    date: "08/01/2023",
    uid: "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd",
  },
  {
    content:
      "The product is good, but I think there's still room for improvement. I encountered a few bugs, but their support team was prompt in resolving them.",
    userAddress: "cryptobob.eth",
    date: "08/01/2023",
    uid: "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd",
  },
  {
    content:
      "It's rare to find a product that genuinely delivers on its promises. This one does, and then some. Kudos to the team behind it!",
    userAddress: "defiking.eth",
    date: "08/01/2023",
    uid: "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd",
  },
];

const votes = [
  {
    content:
      "Having reviewed the project's documentation and its recent updates, I believe it has a lot of potentials. I'm casting my vote in its favor.",
    userAddress: "hironothero.eth",
    number: 1500,
    date: "08/01/2023",
    uid: "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd",
  },
  {
    content:
      "There are still concerns regarding the scalability of this project. I'd suggest the team looks into optimizing the current infrastructure. Until then, I'm holding back my votes.",
    userAddress: "shutanaka.eth",
    number: 500,
    date: "08/01/2023",
    uid: "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd",
  },
  {
    content:
      "Impressed with the team's dedication and the community support. They've hit all their milestones so far. I'm allocating a good portion of my votes.",
    userAddress: "blockchainjane.eth",
    number: 2200,
    date: "08/01/2023",
    uid: "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd",
  },
  {
    content:
      "I've been following this project since its inception. They have a clear vision and a road map that stands out. I'm in full support.",
    userAddress: "cryptocarl.eth",
    number: 3000,
    date: "08/01/2023",
    uid: "0xca2804c2e3908ce0d3cc07739b0e84a7df9f0f80b3fafa1e7fdc7c102bcc4cbd",
  },
];
