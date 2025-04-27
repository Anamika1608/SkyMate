import React, { useEffect, useRef, useState } from 'react';
import FOG from 'vanta/src/vanta.fog.js';
import * as THREE from 'three';

export default function VantaBackground({ children }) {
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
        <div className="vanta-background fixed inset-0 -z-10" ref={vantaRef}>
            <div className="z-0">{children}</div>
        </div>
    );
}