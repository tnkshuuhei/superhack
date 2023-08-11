"use client";
type Review = {
  content?: string;
  userAddress?: string;
  number?: number;
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

import React from "react";
const formatDate = (unixTimestamp: string) => {
  const date = new Date(Number(unixTimestamp) * 1000);
  return date.toLocaleString();
};

const CustomCard: React.FC<CustomCardProps> = ({ reviews, baseUrl }) => {
  return (
    <div className="flex flex-col items-center">
      {reviews.length === 0 && (
        <div className="text-center text-[#808191]">
          No reputation added yet
        </div>
      )}
      {reviews.map((review, index) => (
        <div
          key={index}
          className="border p-4 my-2 flex flex-col rounded-xl md:w-3/4"
        >
          <div className="flex justify-between items-center">
            <div className="flex md:flex-row flex-col items-center space-x-2">
              <p className="text-left">{review.attester}</p>
              <span className="text-sm text-right text-gray-500">
                Created {formatDate(review.timeCreated)}
              </span>
            </div>
            {review.number && (
              <span className="text-right">{review.number}pt</span>
            )}
          </div>
          <p className="text-left text-[#808191] mb-2">{review.TextField}</p>
          <div className="mt-2">
            <a
              href={`${baseUrl}/${review.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#808191] hover:text-[#606060] hover:underline"
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
