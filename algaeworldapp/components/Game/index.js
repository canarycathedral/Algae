"use client"

import { useState, useRef, useEffect } from 'react';

export default function Game() {
    const [cursor] = useState('default');
    const [activeTool, setActiveTool] = useState(null); // 'magnifier' or 'net'
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const [surfaceAssets, setSurfaceAssets] = useState([]);
    const [floorAssets, setFloorAssets] = useState([]);
    const divRef = useRef(null);

    const surfaceSvgs = [
        'Carpet Algae.svg',
        'Chlorella.svg',
        'Cyanobacteria.svg',
        'Dinoflagellates.svg',
        'Spirogyra.svg'
    ];

    const floorSvgs = [
        'Bubble Algae.svg',
        'Gracilaria.svg',
        'Gulfweed.svg',
        "Peacock's Tail.svg",
        'Sea Lettuce.svg'
    ]

    useEffect(() => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            const numAssets = 3;
            const assets = [];
            const centerY = rect.height * 0.35;
            const minDistance = 350; // Minimum distance between assets

            for (let i = 0; i < numAssets; i++) {
                let attempts = 0;
                let x, y, overlaps;
                do {
                    x = Math.random() * (rect.width - 250);
                    y = centerY + (Math.random() - 0.5) * 50;
                    overlaps = assets.some(asset => 
                        Math.abs(asset.x - x) < minDistance && Math.abs(asset.y - y) < minDistance
                    );
                    attempts++;
                } while (overlaps && attempts < 50); // Prevent infinite loop

                if (!overlaps) {
                    const src = surfaceSvgs[Math.floor(Math.random() * surfaceSvgs.length)];
                    assets.push({ src, x: Math.max(0, Math.min(x, rect.width - 50)), y: Math.max(0, Math.min(y, rect.height - 50)) });
                }
            }
            setSurfaceAssets(assets);
        }
    }, []);

    useEffect(() => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            const numAssets = 3;
            const assets = [];
            const centerY = rect.height * 0.65;
            const minDistance = 350; // Minimum distance between assets

            for (let i = 0; i < numAssets; i++) {
                let attempts = 0;
                let x, y, overlaps;
                do {
                    x = Math.random() * (rect.width - 250);
                    y = centerY + (Math.random() - 0.5) * 50;
                    overlaps = assets.some(asset => 
                        Math.abs(asset.x - x) < minDistance && Math.abs(asset.y - y) < minDistance
                    );
                    attempts++;
                } while (overlaps && attempts < 50); // Prevent infinite loop

                if (!overlaps) {
                    const src = floorSvgs[Math.floor(Math.random() * floorSvgs.length)];
                    assets.push({ src, x: Math.max(0, Math.min(x, rect.width - 50)), y: Math.max(0, Math.min(y, rect.height - 50)) });
                }
            }
            setFloorAssets(assets);
        }
    }, []);

    const handleToolClick = (tool) => {
        setActiveTool(tool);
    };

    const handleOverlayClick = () => {
        setActiveTool(null);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (activeTool && divRef.current) {
                const rect = divRef.current.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                x = Math.max(75, Math.min(x, rect.width - 75));
                y = Math.max(75, Math.min(y, rect.height - 75));
                setMousePos({x, y});
            }
        };

        if (activeTool) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [activeTool]);

    return(
        <div 
            ref={divRef}
            style={{
                position: "relative",
                width: "70%",
                aspectRatio: 16/9,
                margin: "0 auto",
                paddingTop: "60%",
                backgroundImage: "url(/images/Background.svg)",
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                cursor: activeTool ? 'none' : cursor
            }}
        >
            {surfaceAssets.map((asset, i) => (
                <img 
                    key={i}
                    src={`/images/surface_algae/${asset.src}`}
                    alt={asset.src}
                    style={{
                        position: "absolute",
                        left: asset.x,
                        top: asset.y,
                        width: "250px",
                        height: "250px",
                        pointerEvents: "none"
                    }}
                />
            ))}
            {floorAssets.map((asset, i) => (
                <img 
                    key={`floor-${i}`}
                    src={`/images/floor_algae/${asset.src}`}
                    alt={asset.src}
                    style={{
                        position: "absolute",
                        left: asset.x,
                        top: asset.y,
                        width: "100px",
                        height: "100spx",
                        pointerEvents: "none"
                    }}
                />
            ))}
            {!activeTool && (
                <>
                    <img 
                        src="/images/Mangifying Glass.svg" 
                        alt="Magnifying Glass" 
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            width: "150px",
                            height: "150px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleToolClick('magnifier')}
                    />
                    <img 
                        src="/images/Net.svg" 
                        alt="Net" 
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "10px",
                            width: "150px",
                            height: "150px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleToolClick('net')}
                    />
                </>
            )}
            {activeTool && (
                <div 
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 10
                    }}
                    onClick={handleOverlayClick}
                >
                    <img 
                        src={activeTool === 'magnifier' ? "/images/Mangifying Glass.svg" : "/images/Net.svg"} 
                        alt={`${activeTool} Overlay`} 
                        style={{
                            position: "absolute",
                            left: mousePos.x - 75,
                            top: mousePos.y - 75,
                            width: "150px",
                            height: "150px",
                            pointerEvents: "none"
                        }}
                    />
                </div>
            )}
        </div>
    )
}