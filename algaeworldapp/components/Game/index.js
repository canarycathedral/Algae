"use client";

import { useState, useRef, useEffect } from "react";
import StartScreen from "../StartScreen";
import Scoreboard from "../Scoreboard";

export default function Game() {
  const [activeTool, setActiveTool] = useState(null); // 'magnifier' or 'net'
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [surfaceAssets, setSurfaceAssets] = useState([]);
  const [floorAssets, setFloorAssets] = useState([]);
  const [badDistribution] = useState(() => {
    const surfaceBad = Math.floor(Math.random() * 4); // 0-3 surface algae
    return { surfaceBad, floorBad: 3 - surfaceBad }; // remainder of bad algae to make a total of 3 bad algae
  });
  const divRef = useRef(null);
  const incorrectRemoval = useRef(0); // incorrect algae removal counter
  const [correctRemoval, setCorrectRemoval] = useState(0); // correct algae removal counter
  const [gameStarted, setGameStart] = useState(false);

  // Good urface algae array
  const surfaceSvgs = ["Carpet Algae.svg", "Chlorella.svg", "Spirogyra.svg"];

  // Good floor algae array
  const floorSvgs = [
    "Bubble Algae.svg",
    "Gracilaria.svg",
    "Gulfweed.svg",
    "Peacock's Tail.svg",
    "Sea Lettuce.svg",
  ];

  // Bad algae
  const badSurfaceSvgs = ["Dinoflagellates.svg", "Cyanobacteria.svg"]; // surface
  const badFloorSvgs = ["Grape Algae.svg", "Benthic Mats.svg"]; // floor

  // Places 4 surface algae, with randomized bad count (total bad = 3 across both)
  useEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect(); // rect = the size of the game container
      const assets = []; // array that holds the pushed algae
      const centerY = rect.height * 0.2; // adjusts the position of the line which the surface algae will be placed along
      const minDistance = 200; // Minimum distance between assets

      // Randomize bad distribution: total 3 bad algae
      const surfaceBadCount = badDistribution.surfaceBad;

      // Place surface bad algae
      for (let i = 0; i < surfaceBadCount; i++) {
        let attempts = 0; // attempts to place algae that don't overlap
        let x, y, overlaps;
        // loops until algae is placed without overlaps
        do {
          x = Math.random() * (rect.width - 250);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50); // prevents infinite looping

        // runs if algae does not overlap
        if (!overlaps) {
          const src =
            badSurfaceSvgs[Math.floor(Math.random() * badSurfaceSvgs.length)]; // chooses random bad surface algae
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - 50)),
            y: Math.max(0, Math.min(y, rect.height - 50)),
            isBad: true,
          });
        }
      }

      // Place good surface algae,
      const goodSvgs = surfaceSvgs;
      for (let i = 0; i < 4 - surfaceBadCount; i++) {
        let attempts = 0; // attempts to place algae that don't overlap
        let x, y, overlaps;
        // loops until algae is placed without overlaps
        do {
          x = Math.random() * (rect.width - 250);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50); // prevents infinite looping

        // runs if algae does not overlap
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

  // Places up to 4 floor algae
  useEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const assets = [];
      const centerY = rect.height * 0.7; // adjusts the position of the line which the floor algae will be placed along
      const minDistance = 200; // Minimum distance between assets

      // Place bad floor algae
      for (let i = 0; i < badDistribution.floorBad; i++) {
        let attempts = 0;
        let x, y, overlaps;
        // loops until algae can be placed without overlaps
        do {
          x = Math.random() * (rect.width - 250);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50); // prevents infinite loop

        // runs if algae can be placed without overlapping
        if (!overlaps) {
          const src =
            badFloorSvgs[Math.floor(Math.random() * badFloorSvgs.length)];
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - 50)),
            y: Math.max(0, Math.min(y, rect.height - 50)),
            isBad: true,
          });
        }
      }

      // Place good floor algae
      const goodSvgs = floorSvgs;
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

  // sets active tool
  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  // removing bad algae behaviour
  const handleAssetClick = (asset, index, type) => {
    if (activeTool === "net" && asset.isBad) {
      // if bad surface is algae clicked, it is removed from surfaceAssets
      if (type === "surface") {
        setSurfaceAssets((prev) => {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
      }
      // if bad floor algae is clicked, it is removed from floorAssets
      else if (type === "floor") {
        setFloorAssets((prev) => {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
      }
      setCorrectRemoval((prev) => prev + 1);
      console.log("Correct clicks: " + correctRemoval);
    } 
    else if (activeTool === "net" && !asset.isBad) {
      // if good surface algae is clicked, it is removed from surfaceAssets
      if (type === "surface") {
        setSurfaceAssets((prev) => {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
      }
      // if good floor algae is clicked, it is removed from surfaceAssets
      else if (type === "floor") {
        setFloorAssets((prev) => {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
      }
      incorrectRemoval.current++;
      console.log("Incorrect clicks: " + incorrectRemoval.current);
    }
  };

  // makes tool follow cursor (cursor is hidden)
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

  // UI render
  return (
    // main/outter container
    <div
      ref={divRef}
      style={{
        position: "relative",
        width: "70%",
        aspectRatio: 16 / 9,
        margin: "0 auto",
        paddingTop: "40%",
        backgroundImage: "url(/images/Background.svg)",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        cursor: activeTool ? "none" : "default", // if there is an active tool, cursor: "none". else, cursor will be default
      }}
    >
      {!gameStarted && <StartScreen onStart={() => setGameStart(true)}></StartScreen>}
      <Scoreboard correctRemoval={correctRemoval}></Scoreboard>
      {/* renders surface algae */}
      {surfaceAssets.map((asset, i) => (
        <img
          key={i}
          src={`/images/surface_algae/${asset.src}`}
          alt={asset.src}
          data-bad={asset.isBad ? "true" : "false"}
          onClick={() => handleAssetClick(asset, i, "surface")}
          style={{
            position: "absolute",
            left: asset.x,
            top: asset.y,
            width: "250px",
            height: "250px",
            pointerEvents: activeTool === "net" ? "auto" : "none",
          }}
        />
      ))}
      {/* renders floor algae */}
      {floorAssets.map((asset, i) => (
        <img
          key={`floor-${i}`}
          src={`/images/floor_algae/${asset.src}`}
          alt={asset.src}
          data-bad={asset.isBad ? "true" : "false"}
          onClick={() => handleAssetClick(asset, i, "floor")}
          style={{
            position: "absolute",
            left: asset.x,
            top: asset.y,
            width: "100px",
            height: "100px",
            pointerEvents: activeTool === "net" ? "auto" : "none",
          }}
        />
      ))}
      {/* renders static magnifying glass button/icon */}
      <img
        src={activeTool === "magnifier" ? "images/magClickedsvg.svg" : "images/magDefaultsvg.svg"}
        alt="Magnifying Glass"
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          width: "100px",
          height: "100px",
          cursor: "pointer",
        }}
        onClick={() => handleToolClick("magnifier")}
      />
      {/* renders static net button/icon */}
      <img
        src={activeTool === "net" ? "images/netClickedsvg.svg" : "images/netDefaultsvg.svg"}
        alt="Net"
        style={{
          position: "absolute",
          bottom: "10px",
          right: "120px",
          width: "100px",
          height: "100px",
          cursor: "pointer",
        }}
        onClick={() => handleToolClick("net")}
      />
      {/* renders active tool icon which follows/replaces cursor */}
      {activeTool && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            pointerEvents: "none"
          }}
        >
          <img
            src={
              activeTool === "magnifier"
                ? "/images/Mangifying Glass.svg"
                : "/images/Net.svg"
            }
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
