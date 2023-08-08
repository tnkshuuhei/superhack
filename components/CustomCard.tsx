"use client";
type Review = {
  content: string;
  userAddress: string;
  number?: number;
  date: string;
  uid?: string;
};

type CustomCardProps = {
  reviews: Review[];
  baseUrl?: string;
};

import React from "react";

const CustomCard: React.FC<CustomCardProps> = ({ reviews, baseUrl }) => {
  return (
    <div className="flex flex-col items-center">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="border p-4 my-2 flex flex-col rounded-xl md:w-3/4"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <p className="text-left">{review.userAddress}</p>
              <span className="text-sm text-gray-500">
                Created {review.date}
              </span>
            </div>
            {review.number && (
              <span className="text-right">{review.number}pt</span>
            )}
          </div>
          <p className="text-left text-[#808191] mb-2">{review.content}</p>
          <div className="mt-2">
            <a
              href={`${baseUrl}/${review.uid}`}
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
