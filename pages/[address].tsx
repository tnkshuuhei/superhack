"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout, Loader } from "@/components";
import { useStateContext } from "../context";
import { optimism } from "@/assets";

const ProjectPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, decoded, fetchAttestation } = useStateContext();
  const [amount, setAmount] = useState("");
  const [project, setProject] = useState(null);
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
  }, [recipient]);
  console.log("project:", project);
  return (
    <Layout>
      {isLoading && <Loader />}
      <div className="bg-white p-10 rounded-xl">
        <div className="w-full flex md:flex-row flex-col gap-[30px]">
          <div className="bg-gray-200 w-[200px] w-[200px] rounded-xl">
            <Image
              src={optimism}
              alt="campaign"
              className="w-full h-full object-cover rounded-xl p-4"
            />
          </div>
        </div>
        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                Recipient
              </h4>
              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <Image
                    src={optimism}
                    alt="user"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-black break-all">
                    {recipient.address}
                  </h4>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                Story
              </h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {/* {query.description} */}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                Supporters
              </h4>

              {/* <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                      {item.donation} DAIx / month
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div> */}
            </div>
          </div>
          {/* 
        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Stream / Withdraw Funds
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Start Streaming
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="100 DAIx"
                step="1"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={100}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>
              {query.recipient === address ? (
                <CustomButton
                  btnType="button"
                  title="Withdraw Funds"
                  styles="w-full bg-[#8c6dfd]"
                  handleClick={handlewithdraw}
                />
              ) : (
                <CustomButton
                  btnType="button"
                  title="Fund Campaign"
                  styles="w-full bg-[#8c6dfd]"
                  handleClick={handleDonate}
                />
              )}
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </Layout>
  );
};
export default ProjectPage;
