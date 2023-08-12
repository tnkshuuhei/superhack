"use client";
import React from "react";
import { ethers } from "ethers";
type Review = {
  AllocatedAmountsOfPoints?: ethers.BigNumber;
  timeCreated: string;
  uid?: string;
  ProjectUid?: string;
  TextField?: string;
  id?: string;
  attester?: string;
};

type CustomCardProps = {
  reviews: Review[];
  baseUrl?: string;
};

const formatDate = (unixTimestamp: string) => {
  const date = new Date(Number(unixTimestamp) * 1000);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const CustomCard: React.FC<CustomCardProps> = ({ reviews, baseUrl }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-xl mx-auto p-4">
      {reviews.length === 0 && (
        <div className="text-center text-gray-400 font-medium col-span-2">
          Not yet added
        </div>
      )}
      {reviews.map((review, index) => (
        <div
          key={index}
          className="border p-6 bg-white shadow-md rounded-xl w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              <p className="md:font-medium text-xs">{review.attester}</p>
              <div className="gap-2 flex flex-row items-center">
                <span className="text-xs text-gray-500">
                  {formatDate(review.timeCreated)}
                </span>
                {/* not good idea?? */}
                {/* {review.AllocatedAmountsOfPoints && (
                  <span className="md:text-xl font-medium text-blue-500">
                    {ethers.utils.formatUnits(
                      review.AllocatedAmountsOfPoints,
                      0
                    )}
                    pt
                  </span>
                )} */}
              </div>
            </div>
          </div>
          <p className="text-gray-500 mb-4">{review.TextField}</p>
          <div>
            <a
              href={`${baseUrl}/${review.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              view attestation
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomCard;
