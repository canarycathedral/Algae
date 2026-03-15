"use client"

import { useState, useRef, useEffect } from 'react';

export default function Game() {
    const [cursor, setCursor] = useState('default');
    const [activeTool, setActiveTool] = useState(null); // 'magnifier' or 'net'
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const divRef = useRef(null);

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
            {!activeTool && (
                <>
                    <img 
                        src="/images/Mangifying Glass.svg" 
                        alt="Magnifying Glass" 
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            width: "70px",
                            height: "70px",
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
                            width: "70px",
                            height: "70px",
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