"use client";
import { useEffect, useState } from "react";
import matter from "gray-matter";

export function getPostContent(slug) {
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch(`/api/getPostContent/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setContent(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  return content;
}

const RootLayout = ({ children, params }) => {
  const slug = params.slug;
  const data = getPostContent(slug);
  const title = matter(data);
  const complete = `klob0t blog - ${title.data.title}`;
  return (
    <html lang="en">
      <head>
        <title>{complete}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
