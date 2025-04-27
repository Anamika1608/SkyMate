import React from 'react';
import Hero from "../../components/Hero/Hero.jsx";
import Features from "../../components/Features/Features.jsx";
import VantaBackground from "../../components/ui/vanta-background.jsx";

export default function HomePage() {
    return (
        <>
            <VantaBackground />
            <div className="bg-transparent">
                <Hero />
                <Features />
            </div>
        </>
    );
}
