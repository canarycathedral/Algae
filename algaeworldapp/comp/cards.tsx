"use client";

import Image from "next/image";
import { useState } from "react";
//structure	
type ProfileCardProps = {
	imageSrc?: string;
	imageAlt?: string;
	title?: string;
	subtitle?: string;
};

export default function ProfileCard({
	imageSrc = "/placeholder-profile.jpg",
	imageAlt = "Profile image",
	title = "Profile Title",
	subtitle = "Profile Subtitle",
}: ProfileCardProps) {
//anim
	const [isHovered, setIsHovered] = useState(false);

	return (
		<article
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				position: "relative",
				width: "270px",
				height: "350px",
				borderRadius: "25px",   
				overflow: "hidden",
				transform: isHovered ? "scale(1.04)" : "scale(1)",
				transition: "transform 300ms ease",
			}}
		>
//defines
			<Image
				src={imageSrc}
				alt={imageAlt}
				fill
				style={{ objectFit: "cover" }}
				sizes="(max-width: 768px) 100vh, 270px"
			/>

			<div
				style={{
					position: "absolute",
					inset: 0,
					background:
						"linear-gradient(to top, rgba(0, 0, 0, 0.8) 5%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0) 80%)",
				}}
			/>

			<div
				style={{
					position: "absolute",
					left: "1rem",
					bottom: "1rem",
                    color: "white",
					zIndex: 1,
				}}
			>
				<h3
					style={{
						margin: 0,
						fontSize: "1.5rem",
					}}
				>
					{title}
				</h3>
				<p
					style={{
						margin: "0.25rem 0 0",
						fontSize: "1rem",
					}}
				>
					{subtitle}
				</p>
			</div>
		</article>
	);
}
