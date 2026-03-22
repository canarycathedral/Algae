type MascotSpeechProps = {
	visible: boolean;
	text: string;
};

export default function MascotSpeech({ visible, text }: MascotSpeechProps) {
	if (!visible) return null;

	return (
		<div
			style={{
				position: "absolute",
				left: "40%",
				bottom: "90%",
				transform: "translateX(-50%)",
				width: "280px",
				height: "150px",
				backgroundImage: "url('/textsvg.svg')",
				backgroundSize: "100% 100%",
				backgroundRepeat: "no-repeat",
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "center",
				padding: "2.5rem 3rem 1.5rem",
				zIndex: 12,
			}}
		>
			<p
				style={{
					margin: 0,
					fontSize: "16px",
					textAlign: "center",
					lineHeight: 1,
				}}
			>
				{text}
			</p>
		</div>
	);
}
