import React from "react";
import { useRouter } from "next/router";

const NewsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch specific news content based on the id parameter

  // Example data for demonstration purposes
  const news = {
    id,
    title: "Sample News Title",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  return (
    <div className="text-white">
      <h1>{news.title}</h1>
      <p>{news.content}</p>
    </div>
  );
};

export default NewsPage;
