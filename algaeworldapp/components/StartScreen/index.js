"use client";

import { useState } from "react";

export default function StartScreen({ onStart }) {
const [pressedStartBtn, setPressedStartBtn] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "0,0,0,100",
        inset: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <img
          src="/images/gamenamesvg.svg"
          style={{
            maxWidth: "38%",
            height: "auto",
          }}
        ></img>

        <button
          onClick={onStart}
          onMouseDown={() => setPressedStartBtn(true)}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            src={pressedStartBtn ? "/images/playClickedsvg.svg" : "/images/playDefaultsvg.svg"}
            style={{
              width: "90%",
              minWidth: "50%"
            }}
          ></img>
        </button>

        <img src="/images/playTextsvg.svg" style={{
            maxWidth: "20%",
        }}></img>

      </div>
    </div>
  );
}
