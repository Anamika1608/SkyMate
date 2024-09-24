"use client";
import React from "react";
import { WobbleCard } from "../ui/wobble-card.tsx";
import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🏃‍♂️',
    link : '',
    title: 'Activity Planner',
    description: 'Get personalized outdoor activity suggestions  based on current and forecasted weather conditions.'
  },
  {
    icon: '🫁',
    link : '',
    title: 'Health Alerts',
    description: 'Get info about affecting allergies, air quality, and overall wellness according to weather conditions.'
  },
  {
    icon: '💡',
    link : '',
    title: 'Energy Saver',
    description: 'Discover daily tips to reduce energy consumption and costs based on weather patterns xxxxxxxxx.'
  },
  {
    icon: '📸',
    link : '/login',
    title: 'Weather Gallery',
    description: 'Share and explore user-submitted weather photos from around the world xxxxxxxxxxxxxxxx.'
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
