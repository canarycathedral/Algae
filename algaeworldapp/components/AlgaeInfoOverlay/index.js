const algaeInfo = {
  "Carpet Algae": "Provides shelter for small organisms and helps stabilize sediments.",
  "Chlorella": "It is a key part of the aquatic food chain and an important oxygen producer.",
  "Spirogyra": "An important oxygen producer found in freshwater environments.",
  "Bubble Algae": "Acts as a habitat or food source for small organisms.",
  "Gracilaria": "It supports marine biodiversity as habitat for many species.",
  "Gulfweed": "Provides critical habitat for dozens of marine species.",
  "Peacock's Tail": "Absorbs carbon dioxide and releases oxygen. Indicator of a healthy ecosystem.",
  "Sea Lettuce": "Consumes excess nutrients and is an excellent food source for aquatic organisms.",
  "Dinoflagellates": 'Can form "red tides" that deplete oxygen and produce harmful toxins.',
  "Cyanobacteria": "Produces toxins that are dangerous to fish, animals, and humans.",
  "Grape Algae": "An invasive species that disrupts ecosystems.",
  "Benthic Mats": "Produces harmful toxins that may affect other plants and animals.",
};

export default function AlgaeInfoOverlay({ hoveredAlgae }) {
  return (
    <div
      style={{
        position: "absolute",
        right: "-45px",
        bottom: "130px",
        width: "320px",
        height: "240px",
        zIndex: 20,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <img
        src="/images/infoboxsvg.svg"
        alt=""
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          padding: "15px 79px",
          color: "black",
          height: "100%",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "115px",
          }}
        >
          {hoveredAlgae}
        </div>
        <div style={{ fontSize: "16px", lineHeight: 1.35 }}>
          {algaeInfo[hoveredAlgae]}
        </div>
      </div>
    </div>
  );
}
