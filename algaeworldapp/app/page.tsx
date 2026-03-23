"use client";

import Header from "../comp/header";
import Footer from "../comp/footer";
import ScrollBtn from "../comp/scrollbtn";
import ProfileCard from "../comp/cards";
import Mascot from "../comp/mascot";
import { useState } from "react";
import ArticleOverlay, { type ArticleData } from "../comp/article";
import Game from "@/components/Game";

/////Pop up article thingies 
//How do I insert notes into these??? They just show up as text on the page
const algaeArticles: ArticleData[] = [
  {
    title: "Blue-Green Algae",
    subtitle: "Cyanobacteria",
    imageSrc: "/cyno.jpg",
    summary:
      `Cynobacteria gets their name from the ancient greek word for blue. They were the first creatures on earth to produce energy from sunlight through a process called "photosynthesis". Cynobacteria has existed for over 2.1 billion years! That's a long time! Scientists believe that long ago, tree cells "swalloed" cynobacteria and turned them into "chloroplasts", which are the parts of plant cells that allows them to photosynthesize.`,
  },
  {
    title: "Bubble Algae",
    subtitle: "Valonia ventricosa",
    imageSrc: "/valonia_ventricosa.webp",
    summary:
      `Bubble algae are super unique because they are the largest single-celled organisms in the world! They are often found in tropical environments growing on mangrove roots (mangroves are trees that grow on shallow water!) Bubble algae can grow to a staggering 5 centimetres in diamater, and are shiny and green, giving them the nickname "sea grapes".`,
  },
  {
    title: "Red Algae",
    subtitle: "Rhodophyta",
    imageSrc: "/red.webp",
    summary:
      "Red algae are some of the organisms to get energy from sunlight! They come in a wide variety of shapes and colours, but are most commonly red or pink. They get their colour from a special pigment that reflects red light and absorbs blue. There are over 7,000 species of red algae and more are being discovered all the time!",
  },
  {
    title: "Seaweed",
    subtitle: "Macroalgae",
    imageSrc: "/seaweed.jpg",

    summary:
      "Seaweed is the general name for several species of large marine algae. They provide food and shelter for a vast number of sea creatures. Some species of seaweed are also edible for humans, and makes a tasty snack! There are over 9 times more seaweed in the ocean than there are plants on land!",
  },
];

//webspace
export default function Home() {
  const [activeArticle, setActiveArticle] = useState<ArticleData | null>(null);

  return (
    //background
    <div 				style={{
        minHeight: "125vh",
				width: "100%",
				position: "relative",
				backgroundImage: "url('/bg.svg')",
        backgroundSize: "100%",
				backgroundPosition: "center",}}>

      <ArticleOverlay article={activeArticle} onClose={() => setActiveArticle(null)} />
      
      <div
        style={{
          position: "absolute",
          top: "55vh",
          left: "50%",
          width: "100%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <Game />
      </div>

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
        <div style ={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          paddingInline: "1.5rem",
        }}>
          
          <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
          color: "white",}}
            >Check out these featured algae!</h2>
        <div id="profileCards" style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}>
				{algaeArticles.map((article) => (
					<ProfileCard
						key={article.title}
						imageSrc={article.imageSrc}
						imageAlt={article.title}
						title={article.title}
						subtitle={article.subtitle}
						onClick={() => setActiveArticle(article)}
					/>
				))}
			</div></div>
      </main>
      <div>


        <Footer />
      </div>
      <ScrollBtn targetId="profileCards" offset={-560} />
    </div>
    //Could make the scroll button scroll back up if it's already at the bottom?
  );
}
