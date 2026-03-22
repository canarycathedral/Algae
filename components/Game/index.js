"use client";

import { useState, useRef, useEffect } from "react";
import StartScreen from "../StartScreen";
import Scoreboard from "../Scoreboard";
import LossScreen from "../LossScreen";
import WinScreen from "../WinScreen";
import AlgaeInfoOverlay from "../AlgaeInfoOverlay";

export default function Game() {
  const surfaceAssetSize = 190;
  const floorAssetSize = 80;
  const surfaceMinDistance = 150;
  const floorMinDistance = 100;
  const toolButtonSize = 72;
  const toolButtonPadding = 26;
  const toolButtonGap = 16;
  const cursorToolSize = 110;
  const cursorToolHalf = cursorToolSize / 2;

  const [activeTool, setActiveTool] = useState(null); // 'magnifier' or 'net'
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [surfaceAssets, setSurfaceAssets] = useState([]);
  const [floorAssets, setFloorAssets] = useState([]);
  const [badDistribution] = useState(() => {
    const surfaceBad = Math.floor(Math.random() * 4); // 0-3 surface algae
    return { surfaceBad, floorBad: 3 - surfaceBad }; // remainder of bad algae to make a total of 3 bad algae
  });
  const divRef = useRef(null);
  const [incorrectRemoval, setIncorrectRemoval] = useState(0); // incorrect algae removal counter
  const [correctRemoval, setCorrectRemoval] = useState(0); // correct algae removal counter
  const [gameStarted, setGameStart] = useState(false);
  const [hoveredAlgae, setHoveredAlgae] = useState(null);
  const [gameWin, setGameWin] = useState(false);
  const [gameLoss, setGameLoss] = useState(false);
  const [gameRestart, setGameRestart] = useState(0);

  // Good algae
  // surface
  const surfaceSvgs = ["Carpet Algae.svg", "Chlorella.svg", "Spirogyra.svg"];
  // floor
  const floorSvgs = [
    "Bubble Algae.svg",
    "Gracilaria.svg",
    "Gulfweed.svg",
    "Peacock's Tail.svg",
    "Sea Lettuce.svg",
  ];
  // Bad algae
  // surface
  const badSurfaceSvgs = ["Dinoflagellates.svg", "Cyanobacteria.svg"];
  // floor
  const badFloorSvgs = ["Grape Algae.svg", "Benthic Mats.svg"];

  // Places 4 surface algae, with randomized bad count (total bad = 3 across both)
  useEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect(); // rect = the size of the game container
      const assets = []; // array that holds the pushed algae
      const centerY = rect.height * 0.2; // adjusts the position of the line which the surface algae will be placed along
      const minDistance = surfaceMinDistance; // Minimum distance between assets

      // Randomize bad distribution: total 3 bad algae
      const surfaceBadCount = badDistribution.surfaceBad;

      // Place surface bad algae
      for (let i = 0; i < surfaceBadCount; i++) {
        let attempts = 0; // attempts to place algae that don't overlap
        let x, y, overlaps;
        // loops until algae is placed without overlaps
        do {
          x = Math.random() * (rect.width - surfaceAssetSize);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50); // prevents infinite looping. max 50 attempts

        // runs if algae does not overlap
        if (!overlaps) {
          const src =
            badSurfaceSvgs[Math.floor(Math.random() * badSurfaceSvgs.length)]; // chooses random bad surface algae
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - surfaceAssetSize)),
            y: Math.max(0, Math.min(y, rect.height - surfaceAssetSize)),
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
          x = Math.random() * (rect.width - surfaceAssetSize);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50); // prevents infinite looping. max 50 attempts

        // runs if algae does not overlap
        if (!overlaps) {
          const src = goodSvgs[Math.floor(Math.random() * goodSvgs.length)];
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - surfaceAssetSize)),
            y: Math.max(0, Math.min(y, rect.height - surfaceAssetSize)),
            isBad: false,
          });
        }
      }
      setSurfaceAssets(assets);
    }
  }, [gameRestart]);

  // Places up to 4 floor algae
  useEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const assets = [];
      const centerY = rect.height * 0.7; // adjusts the position of the line which the floor algae will be placed along
      const minDistance = floorMinDistance; // Minimum distance between assets

      // Place bad floor algae
      for (let i = 0; i < badDistribution.floorBad; i++) {
        let attempts = 0;
        let x, y, overlaps;
        // loops until algae can be placed without overlaps
        do {
          x = Math.random() * (rect.width - floorAssetSize);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50); // prevents infinite loop. max 50 attempts

        // runs if algae can be placed without overlapping
        if (!overlaps) {
          const src =
            badFloorSvgs[Math.floor(Math.random() * badFloorSvgs.length)];
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - floorAssetSize)),
            y: Math.max(0, Math.min(y, rect.height - floorAssetSize)),
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
          x = Math.random() * (rect.width - floorAssetSize);
          y = centerY + (Math.random() - 0.5) * 50;
          overlaps = assets.some(
            (asset) =>
              Math.abs(asset.x - x) < minDistance &&
              Math.abs(asset.y - y) < minDistance,
          );
          attempts++;
        } while (overlaps && attempts < 50); // prevents infinite looping. max 50 attempts

        if (!overlaps) {
          const src = goodSvgs[Math.floor(Math.random() * goodSvgs.length)];
          assets.push({
            src,
            x: Math.max(0, Math.min(x, rect.width - floorAssetSize)),
            y: Math.max(0, Math.min(y, rect.height - floorAssetSize)),
            isBad: false,
          });
        }
      }
      setFloorAssets(assets);
    }
  }, [gameRestart]);

  // game win condition. triggers when all three bad algae are removed
  useEffect(() => {
    if (correctRemoval >= 3) {
      setGameWin(true);
      setActiveTool(null);
    }
  }, [correctRemoval]);

  // game loss condition. triggers when there are no good algae remaining
  useEffect(() => {
    const remainingGoodAlgae = [...surfaceAssets, ...floorAssets].filter(
      (asset) => !asset.isBad
    ).length;

    if (gameStarted && remainingGoodAlgae === 0) {
      setGameLoss(true);
      setActiveTool(null);
    }
  }, [surfaceAssets, floorAssets, gameStarted]);

  // game restart behaviour
  const restartGame = () => {
    setCorrectRemoval(0);
    setIncorrectRemoval(0);
    setGameWin(false);
    setGameLoss(false);
    setActiveTool(null);
    setGameStart(true);
    setGameRestart((n) => n + 1);
  }

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
    } else if (activeTool === "net" && !asset.isBad) {
      // if good surface algae is clicked, it is removed from surfaceAssets
      if (type === "surface") {
        setSurfaceAssets((prev) => {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
      }
      // if good floor algae is clicked, it is removed from floorAssets
      else if (type === "floor") {
        setFloorAssets((prev) => {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
      }
      setIncorrectRemoval((prev) => prev + 1);
      console.log("Incorrect clicks: " + incorrectRemoval);
    }
  };

  // makes tool follow cursor (cursor is hidden)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (activeTool && divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = Math.max(cursorToolHalf, Math.min(x, rect.width - cursorToolHalf));
        y = Math.max(cursorToolHalf, Math.min(y, rect.height - cursorToolHalf));
        setMousePos({ x, y });
      }
    };

    if (activeTool) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      setHoveredAlgae(null);
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
        width: "60%",
        aspectRatio: 16 / 9,
        margin: "0 auto",
        borderRadius: "50px",
        backgroundImage: "url(/Background.svg)",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        cursor: activeTool ? "none" : "default", // if there is an active tool, cursor: "none". else, cursor will be default
      }}
    >
      {!gameStarted && (
        <StartScreen onStart={() => setGameStart(true)}></StartScreen>
      )}
      <Scoreboard correctRemoval={correctRemoval}></Scoreboard>
      {/* renders surface algae */}
      {surfaceAssets.map((asset, i) => (
        <img
          key={i}
          src={`/images/surface_algae/${asset.src}`}
          alt={asset.src}
          data-bad={asset.isBad ? "true" : "false"}
          onClick={() => handleAssetClick(asset, i, "surface")}
          onMouseEnter={() =>
            activeTool === "magnifier" &&
            setHoveredAlgae(asset.src.replace(".svg", ""))
          }
          onMouseLeave={() => setHoveredAlgae(null)}
          style={{
            position: "absolute",
            left: asset.x,
            top: asset.y,
            width: `${surfaceAssetSize}px`,
            height: `${surfaceAssetSize}px`,
            pointerEvents: activeTool ? "auto" : "none",
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
          onMouseEnter={() =>
            activeTool === "magnifier" &&
            setHoveredAlgae(asset.src.replace(".svg", ""))
          }
          onMouseLeave={() => setHoveredAlgae(null)}
          style={{
            position: "absolute",
            left: asset.x,
            top: asset.y,
            width: `${floorAssetSize}px`,
            height: `${floorAssetSize}px`,
            pointerEvents: activeTool ? "auto" : "none",
          }}
        />
      ))}
      {/* renders static magnifying glass button/icon */}
      <img
        src={
          activeTool === "magnifier"
            ? "/magClickedsvg.svg"
            : "/magDefaultsvg.svg"
        }
        alt="Magnifying Glass"
        style={{
          position: "absolute",
          bottom: `${toolButtonPadding}px`,
          right: `${toolButtonPadding}px`,
          width: `${toolButtonSize}px`,
          height: `${toolButtonSize}px`,
          cursor: "pointer",
        }}
        onClick={() => handleToolClick("magnifier")}
      />
      {/* renders static net button/icon */}
      <img
        src={
          activeTool === "net"
            ? "/netClickedsvg.svg"
            : "/netDefaultsvg.svg"
        }
        alt="Net"
        style={{
          position: "absolute",
          bottom: `${toolButtonPadding}px`,
          right: `${toolButtonPadding + toolButtonSize + toolButtonGap}px`,
          width: `${toolButtonSize}px`,
          height: `${toolButtonSize}px`,
          cursor: "pointer",
        }}
        onClick={() => handleToolClick("net")}
      />
      {/* renders active tool icon which follows/replaces cursor */}
      {activeTool && (
        <img
          src={
            activeTool === "magnifier"
              ? "/Mangifying Glass.svg"
              : "/Net.svg"
          }
          style={{
            position: "absolute",
            left: mousePos.x - cursorToolHalf,
            top: mousePos.y - cursorToolHalf,
            width: `${cursorToolSize}px`,
            height: `${cursorToolSize}px`,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      )}
      {/* algae info overlay shown when magnifier hovers over an algae */}
      {activeTool === "magnifier" && hoveredAlgae && (
        <AlgaeInfoOverlay hoveredAlgae={hoveredAlgae} />
      )}
      {/* Loss & Win screens */}
      {gameLoss && <LossScreen></LossScreen>}
      {gameWin && <WinScreen></WinScreen>}
      {gameLoss && <LossScreen onRestart={restartGame}></LossScreen>}
      {gameWin && <WinScreen onRestart={restartGame}></WinScreen>}
    </div>
  );
}
