import Header from "../comp/header";
import Footer from "../comp/footer";
import ScrollBtn from "../comp/scrollbtn";
import ProfileCard from "../comp/cards";
import Mascot from "../comp/mascot";

export default function Home() {
  return (
    <div 				style={{
        minHeight: "125vh",
				width: "100%",
				backgroundImage: "url('/bg.svg')",
        backgroundSize: "100%",
				backgroundPosition: "center",}}>
      <Header />
      <main
        style={{
          minHeight: "185vh",
          paddingTop: "60rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Mascot />
        <div id="profileCards" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}>
        <ProfileCard
          imageSrc="/cyno.jpg"
          imageAlt="Profile preview image"
          title="Blue-Green Algae"
          subtitle="Cynobacteria"
        />
        <ProfileCard
          imageSrc="/valonia_ventricosa.webp"
          imageAlt="Profile preview image"
          title="Bubble Algae"
          subtitle="Valonia Ventricosa"
        />
        <ProfileCard
          imageSrc="/red.webp"
          imageAlt="Profile preview image"
          title="Red Algae"
          subtitle="Rhodophyta"
        />
        <ProfileCard
          imageSrc="/seaweed.jpg"
          imageAlt="Profile preview image"
          title="Seaweed"
          subtitle="Macroalgae"
        /></div>
      </main>
      <div>
        <Footer />
      </div>
      <ScrollBtn targetId="profileCards" />
    </div>
  );
}
