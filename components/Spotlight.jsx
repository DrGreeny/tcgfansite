import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselElement from "./CarouselElement";

const Spotlight = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselItems = [
    {
      id: 1,
      headline: "Changes to cards after another round of beta testing",
      summary:
        "Atum has made significant changes to some creatures and curses. Beta testers provided feedback during the open Beta, so the game could be balanced again before launch.",
      redirectTo: "/news/1",
    },
    {
      id: 2,
      headline: "Changes to cards after another round of beta testing",
      summary:
        "Atum has made significant changes to some creatures and curses. Beta testers provided feedback during the open Beta, so the game could be balanced again before launch.",
      redirectTo: "/news/2",
    },
    {
      id: 3,
      headline: "Changes to cards after another round of beta testing",
      summary:
        "Atum has made significant changes to some creatures and curses. Beta testers provided feedback during the open Beta, so the game could be balanced again before launch.",
      redirectTo: "/news/3",
    },
    // ... more items
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        const newIndex = (currentIndex + 1) % carouselItems.length;
        setCurrentIndex(newIndex);
        carouselRef.current.setState({ selectedItem: newIndex });
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex, carouselItems.length]);

  return (
    <div className="text-white h-screen">
      <div className="flex justify-center mb-6">
        <h1 className="text-4xl">Spotlight</h1>
      </div>

      <Carousel
        ref={carouselRef}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
      >
        {carouselItems.map((item) => (
          <CarouselElement
            key={item.id}
            headline={item.headline}
            summary={item.summary}
            redirectTo={item.redirectTo}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Spotlight;
