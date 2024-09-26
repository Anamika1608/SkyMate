"use client";
import React from "react";
import { WobbleCard } from "../ui/wobble-card.tsx";
import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🏃‍♂️',
    link : '/activity-suggestion',
    title: 'Activity Planner',
    description: 'Get AI-based activity suggestions tailored to your current weather and mood. Whether solo, with family, or seeking adventure,find the perfect experience for any forecast.'
  },
  // {
  //   icon: '🫁',
  //   link : '',
  //   title: 'Health Alerts',
  //   description: 'Get info about affecting allergies, air quality, and overall wellness according to weather conditions.'
  // },
  {
    icon: '💡',
    link : '',
    title: 'Energy Saver',
    description: 'Personalized recipes and energy-saving tips based on current weather and Seasonal insights with actionable advice for every climate condition.'
  },
  {
    icon: '📸',
    link : '/login',
    title: 'Weather Gallery',
    description: 'Share your weather photos and explore global captures. Bookmark favorites, comment, and engage with the community.Share, connect, and experience the beauty of weather globally! '
  }
];


export function WobbleCardDemo() {
  return (
    <div className="sm:flex gap-4 sm:max-w-7xl mx-auto w-full ">
      {features.map((feature, index) => (
        <Link to= {feature.link} className="col-span-1 sm:min-h-[300px] mb-4 cursor-pointer">
          <WobbleCard containerClassName="" >
            <div className="text-4xl pb-3 -mt-9">{feature.icon}</div>
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              {feature.title}
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200 -mb-14">
              {feature.description}
            </p>
          </WobbleCard>
        </Link>

      ))}
    </div>
  );
}
