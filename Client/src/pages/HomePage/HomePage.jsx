import React, { useEffect, useRef, useState } from 'react';
import FOG from 'vanta/src/vanta.fog.js';
import * as THREE from 'three';
import Hero from "../../components/Hero/Hero.jsx";
import Features from "../../components/Features/Features.jsx";

export default function HomePage() {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(FOG({
                el: vantaRef.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                highlightColor: 0xbde9fc,
                midtoneColor: 0x94c8d6,
                lowlightColor: 0xb2d1ed,
                baseColor: 0xfcf6f6,
                blurFactor: 0.59,
                speed: 1.30,
                zoom: 0.70
            }));
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div className="bg" ref={vantaRef}>
            <Hero />
            <Features />
        </div>
    );
}
