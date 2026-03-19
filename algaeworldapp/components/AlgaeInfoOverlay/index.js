const algaeInfo = {
  "Carpet Algae": "Provides shelter for small organisms and helps stabilize sediments.",
  "Chlorella": "It is a key part of the aquatic food chain and an important oxygen producer.",
  "Spirogyra": "An important oxygen producer found in freshwater environments.",
  "Bubble Algae": "Acts as a habitat or food source for small organisms.",
  "Gracilaria": "A red algae used in food production and as a source of agar. It supports marine biodiversity as habitat for many species.",
  "Gulfweed": "Creates floating ecosystems in the ocean, providing critical habitat for dozens of marine species.",
  "Peacock's Tail": "A fan-shaped brown alga that plays a role in calcium carbonate production and reef building.",
  "Sea Lettuce": "An edible green alga that supports grazing invertebrates and fish. Thrives in nutrient-rich coastal waters.",
  "Dinoflagellates": "Can form toxic red tides that deplete oxygen and produce toxins harmful to marine life and humans.",
  "Cyanobacteria": "Produces toxins that are dangerous to fish, animals, and humans. Should be removed immediately.",
  "Grape Algae": "An invasive species that rapidly outcompetes native marine plants and disrupts local ecosystems.",
  "Benthic Mats": "Smothers the seafloor, blocking light and suffocating bottom-dwelling organisms.",
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
