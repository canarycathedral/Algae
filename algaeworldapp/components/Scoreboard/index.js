"use client";

export default function Scoreboard( {correctRemoval} ) {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 15,
        display: "flex",
        alignItems: "end",
        justifyContent: "start",
        inset: 0,
        pointerEvents: "none",
      }}
    >
        <div style={{
            padding: "1rem",
            fontSize: "2rem",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: "rgb(242, 198, 66)"
        }}>
            Bad algae removed: {correctRemoval} / 3
        </div>
    </div>
  );
}
