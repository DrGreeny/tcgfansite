import React from "react";
import { useRouter } from "next/router";
import news from "/db/news.json";
import ReactHtmlParser from "react-html-parser";
import Image from "next/image";

const NewsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch specific news content based on the id parameter
  const selectedNews = news.find((item) => item.id.toString() === id);

  if (!selectedNews) {
    return (
      <div className="text-white text-center my-10 min-h-screen">
        Coming soon...
      </div>
    );
  }

  return (
    <div className="flex-col">
      <div className="relative w-full h-32 mt-10">
        <Image
          src="/news/banner_1500x500.jpg"
          alt="Speak"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex">
        <div className=" w-1/2 m-auto px-10 flex justify-center">
          <div className="whitespace-pre-line text-gray-200">
            <h1 className="text-4xl mb-4">{selectedNews?.headline}</h1>
            <p className="whitespace-pre-line">
              {ReactHtmlParser(selectedNews?.text)}
            </p>
          </div>
        </div>
        <div
          className="relative w-1/2  flex justify-center"
          style={{
            minHeight: `calc(100vh - 232px)`,
          }}
        >
          <div className="m-auto">
            <Image
              src={`/news/${id}.png`}
              alt="Abomination"
              width={500}
              height={500}
            />
            <div>Leaked Image by Atum</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
