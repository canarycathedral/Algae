import Image from "next/image";

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "2rem 2rem",
        backgroundColor: "#8cef73",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src="/logosvg.svg" alt="logo" width={300} height={100}/>
    </header>
  );
}
