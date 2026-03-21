"use client";

import RestartButton from "../RestartButton";

export default function LossScreen({onRestart}) {
  return (
    <div
      style={{
        color: "white",
        position: "absolute",
        inset: 0,
        zIndex: "20",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.3)",
          fontFamily: "Gill Sans Nova Ultra Bold",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: "",
            fontSize: "5rem",
            color: "rgba(242, 221, 66, 1)",
          }}
        >
          Game Over
        </p>
        <p
          style={{
            fontSize: "1.3rem",
            color: "rgba(249, 255, 88, 1)",
          }}
        >
          You removed all the good algae
        </p>
        <RestartButton onRestart={onRestart}></RestartButton>
        <p
          style={{
            color: "rgba(242, 221, 66, 1)",
            fontSize: "3rem",
          }}
        >
          Try Again
        </p>
        <p style={{
          color: "rgba(249, 255, 88, 1)",
          fontFamily: "sans-serif",
          fontSize: "1.1rem",
          textAlign: "center",
          maxWidth: "30%",
          marginTop: "0.5rem"
        }}>
          Hint: Inspect each algae with the magnifying glass to identify the bad algae
        </p>
      </div>
    </div>
  );
}
