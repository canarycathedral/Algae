"use client";

import { useState } from "react";

export default function RestartButton({onRestart}) {
    const [pressedStartBtn, setPressedStartBtn] = useState(false);

    return(
        <button
          onClick={onRestart}
          onMouseDown={() => setPressedStartBtn(true)}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            src={pressedStartBtn ? "/playClickedsvg.svg" : "/playDefaultsvg.svg"}
            style={{
              width: "90%",
              minWidth: "50%",
              padding: "1rem"
            }}
          ></img>
        </button>
    )
}
