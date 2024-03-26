'use client'
import { useEffect, useState } from "react";

export function getPostContent(slug){
  const [content, setContent] = useState("")
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
  return content
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
      {children}
      </body>
    </html>
  );
}

export default RootLayout
