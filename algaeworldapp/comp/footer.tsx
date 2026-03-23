import Image from "next/image";

export default function Footer() {
	return (
		<footer
			style={{
				width: "100%",
				padding: "3rem 1rem 1rem 2rem",
                backgroundColor:"#8cef73",
				textAlign: "center",
                fontSize: "16px",

			}}>
			<div style={{ display: "flex", justifyContent: "center", gap: "8rem", marginBottom: "1rem" }}>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
					<p style={{ fontWeight: "bold", marginBottom:"0.8rem" }}>Legal</p>
					<p style={{ margin: 0 }}>Terms of Service</p>
					<p style={{ margin: 0 }}>Privacy Policy</p>
					<p style={{ margin: 0 }}>Children's Online Privacy</p>
				</div>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
					<p style={{ fontWeight: "bold", marginBottom:"0.8rem" }}>Partner Sites</p>
					<p style={{ margin: 0 }}>PBS Kids</p>
					<p style={{ margin: 0 }}>BC Hydro</p>
					<p style={{ margin: 0 }}>National Geographics Kids</p>
				</div>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}> 
					<p style={{ fontWeight: "bold", marginBottom:"0.8rem" }}>Membership</p>
					<p style={{ margin: 0 }}>Subscribe</p>
					<p style={{ margin: 0 }}>Manage your subscription</p>
					<p style={{ margin: 0 }}>Ocean One initiative</p>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
                    marginTop: "5rem",
					gap: "2rem",
				}}
			>
				<Image src="/logosvg.svg" alt="logo" width={200} height={100} />
				<p style={{ margin: 0, fontSize: "16px" }}>Copyright ©2026 Algae World</p>

			</div>
		</footer>
	);
}
