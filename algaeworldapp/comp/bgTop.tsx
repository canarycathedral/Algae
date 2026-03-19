export default function BgTop() {
	return (
		<div
			style={{
				height: "100%",
				width: "50%",
				backgroundImage: "url('/bg.svg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		/>
	);
}
//Bg in here instead of background.tsx cus I planned to have 2 different backgrounds for top and bottom of page but I scrapped it