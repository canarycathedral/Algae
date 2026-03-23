"use client";

import Image from "next/image";

//My resolve against AI has broken this day.
export type ArticleData = {
	title: string;
	subtitle: string;
	imageSrc: string;
	summary: string;
};

type ArticleOverlayProps = {
	article: ArticleData | null;
	onClose: () => void;
};

const container = {
	position: "fixed",
	inset: 0,
	zIndex: 2000,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "2rem 1.25rem",
	background: "rgba(5, 16, 20, 0.64)",
	backdropFilter: "blur(5px)",
} as const;

const closeBtn = {
	position: "relative",
	width: "min(920px, 100%)",
	maxHeight: "min(88vh, 920px)",
	overflowY: "auto",
	borderRadius: "28px",
	background: "#8cef73",
	color: "#13302b",
} as const;

const containerFormat = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
	gap: "2rem",
	padding: "2rem",
} as const;
export default function ArticleOverlay({ article, onClose }: ArticleOverlayProps) {

	if (!article) {
		return null;
	}

	const { title, subtitle, imageSrc, summary } = article;

	return (
		<div onClick={onClose} style={container}>
			<section
				role="closeBtn"
				onClick={(event) => event.stopPropagation()}
				style={closeBtn}
			>
				<button
					type="button"
					onClick={onClose}
					style={{
						position: "absolute",
						top: "1rem",
						right: "1rem",
						width: "2.75rem",
						height: "2.75rem",
						border: "none",
						background: "rgba(0, 0, 0, 0)",
						color: "#13302b",
						fontSize: "1.6rem",
						fontWeight: 700,
						cursor: "pointer",
					}}>
					x
				</button>

				<div style={containerFormat}>
					<div>
						<div
							style={{
								position: "relative",
								minHeight: "320px",
								borderRadius: "24px",
								overflow: "hidden",
							}}
						>
							<Image
								src={imageSrc}
                                alt={title}
								fill
							/>
							<div
								style={{
									position: "absolute",
									inset: 0,

								}}
							/>
						</div>
					</div>

					<div>
						<div>
							<h2
								style={{
									fontSize: "2.5rem",
									marginBottom: "0.65rem",
                                    color: "#006652",
								}}
							>
								{title}
							</h2>
							<p
								style={{
									fontSize: "1.1rem",
									fontWeight: 700,
									color: "#006652",
                                    fontStyle: "italic",
									marginBottom: "1rem",
								}}
							>
								{subtitle}
							</p>
							<p
								style={{
									fontSize: "1rem",
									lineHeight: 1.75,

									color: "#00251e",
								}}
							>
								{summary}
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
