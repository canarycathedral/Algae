"use client";

import RestartButton from "../RestartButton";

export default function WinScreen({onRestart}) {
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
          color: "rgba(242, 221, 66, 1)",
        }}
      >
        <p
          style={{
            color: "",
            fontSize: "5rem",
          }}
        >
          You Win!
        </p>
        <p style ={{
            fontSize: "1.3rem"
        }}>You removed all the bad algae</p>
        <RestartButton onRestart={onRestart}></RestartButton>
        <p
          style={{
            color: "rgba(249, 255, 88, 1)",
            fontSize: "3rem",
          }}
        >
          Play Again
        </p>
      </div>
    </div>
  );
}
