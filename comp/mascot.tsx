"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import MascotSpeech from "./mascotSpeech";

const speechLines = [
	"Algae produce 70% of oxygen on earth!",
	"Algae are over 500 million years old!",
    "Most fossil fuels come from ancient algae!",
    "Algae account for 70% of all biomass on earth!",   
	"Some algae glow in the dark.",
	"There are over 22,000 species of algae!",
	"Algae and coral are best friends",
];

export default function Mascot() {
	const [isHovered, setIsHovered] = useState(false);
	const [isSpeechVisible, setIsSpeechVisible] = useState(false);
	const [speechText, setSpeechText] = useState(speechLines[0]);
	const mascotRef = useRef<HTMLDivElement | null>(null);

	const handleClick = () => {
		const mascot = mascotRef.current;
		if (!mascot) return;

		const randomIndex = Math.floor(Math.random() * speechLines.length);
		setSpeechText(speechLines[randomIndex]);
		setIsSpeechVisible(true);

		const scale = isHovered ? 1.02 : 1;
		mascot.animate(
			[
				{ transform: `scale(${scale}) translateX(0px)` },
				{ transform: `scale(${scale}) translateX(-3px)` },
				{ transform: `scale(${scale}) translateX(3px)` },
				{ transform: `scale(${scale}) translateX(0px)` },
			],
			{ duration: 560, easing: "ease-in-out" }
		);
	};

	return (
		<div
			ref={mascotRef}
			style={{
				position: "absolute",
				right: "2rem",
				top: "45rem",	
				zIndex: 10,
				transform: isHovered ? "scale(1.03  )" : "scale(1)",
				transition: "transform 160ms ease, filter 160ms ease",
				filter: isHovered ? "brightness(1.05)" : "brightness(1)",
				cursor: "pointer",
				color: "rgba(100, 100, 100, 1)",
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleClick}
		>
			<MascotSpeech visible={isSpeechVisible} text={speechText} />
			<Image src="/mascotsvg.svg" alt="Mascot" width={300} height={300} />
		</div>
	);
}
