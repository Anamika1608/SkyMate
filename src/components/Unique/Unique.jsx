"use client";
import React from "react";
import { WobbleCard } from "../ui/wobble-card.tsx";
const features = [
  {
    icon: '🏃‍♂️',
    title: 'Activity Planner',
    description: 'Get personalized outdoor activity suggestions  based on current and forecasted weather conditions.'
  },
  {
    icon: '🫁',
    title: 'Health Alerts',
    description: 'Get info about affecting allergies, air quality, and overall wellness.'
  },
  {
    icon: '💡',
    title: 'Energy Saver',
    description: 'Discover daily tips to reduce energy consumption and costs based on weather patterns.'
  },
  {
    icon: '📸',
    title: 'Weather Gallery',
    description: 'Share and explore user-submitted weather photos from around the world.'
  }
];


export function WobbleCardDemo() {
  return (
    <div className="sm:flex gap-4 sm:max-w-7xl mx-auto w-full h-10">
      {features.map((feature, index) => (
        <WobbleCard containerClassName="col-span-1 sm:min-h-[300px] bg-blue-700 mb-4 " >
          <div className="text-4xl pb-3 -mt-9">{feature.icon}</div>
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            {feature.title}
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200 -mb-14">
            {feature.description}
          </p>
        </WobbleCard>
      ))}
    </div>
  );
}
