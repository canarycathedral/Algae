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

const algaeImageSrc = {
  "Carpet Algae": "/images/infoimage/Carpetalgae.png",
  "Chlorella": "/images/infoimage/Chlorella.png",
  "Spirogyra": "/images/infoimage/Spirogyra.png",
  "Bubble Algae": "/images/infoimage/Bubble Algae.png",
  "Gracilaria": "/images/infoimage/Gracilaria.png",
  "Gulfweed": "/images/infoimage/Gulfweed.png",
  "Peacock's Tail": "/images/infoimage/Peacock's Tail.png",
  "Sea Lettuce": "/images/infoimage/Sea Lettuce.png",
  "Dinoflagellates": "/images/infoimage/Dinoflagellates.png",
  "Cyanobacteria": "/images/infoimage/Cyanobacteria.png",
  "Grape Algae": "/images/infoimage/Grape Algae.png",
  "Benthic Mats": "/images/infoimage/Benthic Mats.png",
};

export default function AlgaeInfoOverlay({hoveredAlgae}) {
  const imageSrc = algaeImageSrc[hoveredAlgae];

  return (
    <div
      style={{
        position: "absolute",
        right: "-25px",
        bottom: "120px",
        width: "285px",
        height: "220px",
        zIndex: 20,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* infobox */}
      <img
        src="/infoboxsvg.svg"
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
          padding: "20px 66px",
          color: "black",
          height: "100%",
        }}
      >
        {/* displays small image of relavent algae on infobox */}
        {imageSrc && (
          <img
            src={imageSrc}
            style={{
              position: "absolute",
              top: "38px",
              left: "20%",
              width: "170px",
              height: "86px",
              zIndex: -1,  
            }}
          />
        )}
        {/* displays relavent algae name on infobox */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "82px",
          }}
        >
          {hoveredAlgae}
        </div>
        {/* displays relavent algae info on infobox */}
        <div style={{ fontSize: "15px", lineHeight: 1.25 }}>
          {algaeInfo[hoveredAlgae]}
        </div>
      </div>
    </div>
  );
}
