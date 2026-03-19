"use client";

import Image from "next/image";

type ScrollBtnProps = {
	targetId: string;
};

export default function ScrollBtn({ targetId }: ScrollBtnProps) {
	const handleClick = () => {
		const target = document.getElementById(targetId);
		if (!target) return;

		target.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			style={{
				position: "fixed",
				right: "3rem",
				bottom: "3rem",
				border: "none",
				background: "transparent",
				padding: 0,
				cursor: "pointer",
			}}
		>
			<Image src="/scrollButtonsvg.svg" alt="Scroll button" width={106} height={106} />
		</button>
	);
}
