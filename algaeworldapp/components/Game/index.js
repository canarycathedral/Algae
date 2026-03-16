"use client";

import { useState, useRef, useEffect } from "react";

export default function Game() {
  const [cursor] = useState("default");
  const [activeTool, setActiveTool] = useState(null); // 'magnifier' or 'net'
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [surfaceAssets, setSurfaceAssets] = useState([]);
  const [floorAssets, setFloorAssets] = useState([]);
  const [badDistribution] = useState(() => {
    const surfaceBad = Math.floor(Math.random() * 4); // 0-3
    return { surfaceBad, floorBad: 3 - surfaceBad };
  });
  const divRef = useRef(null);

  // Surface algae
  const surfaceSvgs = [
    "Carpet Algae.svg",
    "Chlorella.svg",
    "Cyanobacteria.svg",
    "Dinoflagellates.svg",
    "Spirogyra.svg",
  ];

  // Floor algae
  const floorSvgs = [
    "Bubble Algae.svg",
    "Gracilaria.svg",
    "Gulfweed.svg",
    "Peacock's Tail.svg",
    "Sea Lettuce.svg",
    "Grape Algae.svg",
    "Benthic Mats.svg"
  ];

  // "Bad" algae
  const badSurfaceSvgs = ["Dinoflagellates.svg", "Cyanobacteria.svg"];
  const badFloorSvgs = ["Grape Algae.svg", "Benthic Mats.svg"];

  // Places 4 surface algae, with randomized bad count (total bad = 3 across both)
  useEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const assets = [];
      const centerY = rect.height * 0.35;
      const minDistance = 200; // Minimum distance between assets

      // Randomize bad distribution: total 3 bad algae
      const surfaceBadCount = badDistribution.surfaceBad;

      // Place surface bad algae
      for (let i = 0; i < surfaceBadCount; i++) {
        let attempts = 0;
        let x, y, overlaps;
        do {
          x = Math.random() * (rect.width - 250);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50);

        if (!overlaps) {
          const src = badSurfaceSvgs[Math.floor(Math.random() * badSurfaceSvgs.length)];
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - 50)),
            y: Math.max(0, Math.min(y, rect.height - 50)),
            isBad: true,
          });
        }
      }

      // Place good surface algae
      const goodSvgs = surfaceSvgs.filter(s => !badSurfaceSvgs.includes(s));
      for (let i = 0; i < 4 - surfaceBadCount; i++) {
        let attempts = 0;
        let x, y, overlaps;
        do {
          x = Math.random() * (rect.width - 250);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50);

        if (!overlaps) {
          const src = goodSvgs[Math.floor(Math.random() * goodSvgs.length)];
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - 50)),
            y: Math.max(0, Math.min(y, rect.height - 50)),
            isBad: false,
          });
        }
      }
      setSurfaceAssets(assets);
    }
  }, []);

  // Places 5 floor algae
  useEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const assets = [];
      const centerY = rect.height * 0.65;
      const minDistance = 200; // Minimum distance between assets

      // Place bad floor algae
      for (let i = 0; i < badDistribution.floorBad; i++) {
        let attempts = 0;
        let x, y, overlaps;
        do {
          x = Math.random() * (rect.width - 250);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50);

        if (!overlaps) {
          const src = badFloorSvgs[Math.floor(Math.random() * badFloorSvgs.length)];
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - 50)),
            y: Math.max(0, Math.min(y, rect.height - 50)),
            isBad: true,
          });
        }
      }

      // Place good floor algae
      const goodSvgs = floorSvgs.filter(s => !badFloorSvgs.includes(s));
      for (let i = 0; i < 5 - badDistribution.floorBad; i++) {
        let attempts = 0;
        let x, y, overlaps;
        do {
          x = Math.random() * (rect.width - 250);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50);

        if (!overlaps) {
          const src = goodSvgs[Math.floor(Math.random() * goodSvgs.length)];
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - 50)),
            y: Math.max(0, Math.min(y, rect.height - 50)),
            isBad: false,
          });
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

  const handleAssetClick = (asset, index, type) => {
    if (activeTool === 'net' && asset.isBad) {
      if (type === 'surface') {
        setSurfaceAssets(prev => prev.filter((_, idx) => idx !== index));
      } else if (type === 'floor') {
        setFloorAssets(prev => prev.filter((_, idx) => idx !== index));
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (activeTool && divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = Math.max(75, Math.min(x, rect.width - 75));
        y = Math.max(75, Math.min(y, rect.height - 75));
        setMousePos({ x, y });
      }
    };

    if (activeTool) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeTool]);

  return (
    <div
      ref={divRef}
      style={{
        position: "relative",
        width: "70%",
        aspectRatio: 16 / 9,
        margin: "0 auto",
        paddingTop: "60%",
        backgroundImage: "url(/images/Background.svg)",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        cursor: activeTool ? "none" : cursor,
      }}
    >
      {surfaceAssets.map((asset, i) => (
        <img
          key={i}
          src={`/images/surface_algae/${asset.src}`}
          alt={asset.src}
          data-bad={asset.isBad ? "true" : "false"}
          onClick={() => handleAssetClick(asset, i, 'surface')}
          style={{
            position: "absolute",
            left: asset.x,
            top: asset.y,
            width: "250px",
            height: "250px",
            pointerEvents: activeTool === 'net' ? 'auto' : 'none',
          }}
        />
      ))}
      {floorAssets.map((asset, i) => (
        <img
          key={`floor-${i}`}
          src={`/images/floor_algae/${asset.src}`}
          alt={asset.src}
          data-bad={asset.isBad ? "true" : "false"}
          onClick={() => handleAssetClick(asset, i, 'floor')}
          style={{
            position: "absolute",
            left: asset.x,
            top: asset.y,
            width: "100px",
            height: "100px",
            pointerEvents: activeTool === 'net' ? 'auto' : 'none',
          }}
        />
      ))}
      {(!activeTool || activeTool === 'net') && (
        <img
          src="/images/Mangifying Glass.svg"
          alt="Magnifying Glass"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            width: "150px",
            height: "150px",
            cursor: "pointer",
          }}
          onClick={() => handleToolClick("magnifier")}
        />
      )}
      {(!activeTool || activeTool === 'magnifier') && (
        <img
          src="/images/Net.svg"
          alt="Net"
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            width: "150px",
            height: "150px",
            cursor: "pointer",
          }}
          onClick={() => handleToolClick("net")}
        />
      )}
      {activeTool && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            pointerEvents: activeTool === 'net' ? 'none' : 'auto',
          }}
          onClick={handleOverlayClick}
        >
          <img
            src={
              activeTool === "magnifier"
                ? "/images/Mangifying Glass.svg"
                : "/images/Net.svg"
            }
            alt={`${activeTool} Overlay`}
            style={{
              position: "absolute",
              left: mousePos.x - 75,
              top: mousePos.y - 75,
              width: "150px",
              height: "150px",
              pointerEvents: "none",
            }}
          />
        </div>
      )}
    </div>
  );
}
