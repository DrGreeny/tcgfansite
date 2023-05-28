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
      headline: "Game rules quiz coming to Shimmer Zealy Campaign",
      redirectTo: "/news/1",
      summary:
        "Speak will participate in anm upcoming Shimmer Zealy Campaign to engage with the community and support further growth of the project",
    },
    {
      id: 2,
      headline: "Coming soon...",
      redirectTo: "/news/2",
      summary: "Stay tuned as we find more news to share with you!",
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
    <div className="text-white mt-10 z-10">
      {/*       <div className="flex justify-center mb-6">
        <h1 className="text-4xl">Spotlight</h1>
      </div> */}

      <Carousel
        ref={carouselRef}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        showIndicators={true}
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
