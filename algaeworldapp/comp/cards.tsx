"use client";

import Image from "next/image";
import { useState } from "react";

type ProfileCardProps = {
	imageSrc?: string;
	imageAlt?: string;
	title?: string;
	subtitle?: string;
	accentColor?: string;
	onClick?: () => void;
};

export default function ProfileCard({
	imageSrc = "",
	imageAlt = "",
	title = "",
	subtitle = "",
	accentColor = "",
	onClick,
}: ProfileCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const isInteractive = Boolean(onClick);

	return (
		<article
			role={isInteractive ? "button" : undefined}
			tabIndex={isInteractive ? 0 : undefined}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
			onKeyDown={
				isInteractive
					? (event) => {
						if (event.key === "Enter" || event.key === " ") {
							event.preventDefault();
							onClick?.();
						}
					}
					: undefined
			}
			style={{
				position: "relative",
				width: "270px",
				height: "350px",
				borderRadius: "25px",
				overflow: "hidden",
				transform: isHovered ? "translateY(-8px) scale(1.04)" : "translateY(0) scale(1)",
				transition: "transform 300ms ease, box-shadow 300ms ease",
			}}
		>
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
