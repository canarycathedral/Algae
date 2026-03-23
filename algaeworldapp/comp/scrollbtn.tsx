"use client";

import Image from "next/image";

type ScrollBtnProps = {
	targetId: string;
	offset?: number;
};

export default function ScrollBtn({ targetId, offset = 0 }: ScrollBtnProps) {
	const handleClick = () => {
		const target = document.getElementById(targetId);
		if (!target) return;

		const targetTop = target.getBoundingClientRect().top + window.scrollY + offset;

		window.scrollTo({
			top: targetTop,
			behavior: "smooth",
		});
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
				zIndex: 50,
			}}
		>
			<Image src="/scrollButtonsvg.svg" alt="Scroll button" width={106} height={106} />
		</button>
	);
}
