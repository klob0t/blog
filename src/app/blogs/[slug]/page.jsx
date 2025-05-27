"use client";
import Markdown from "markdown-to-jsx";
import styles from "./page.css";
import Link from "next/link";
import Image from "next/image";
import { PreBlock, CodeBlock } from "../../utils/syntaxHighlight";
import { getPostContent } from "./layout";
import matter from "gray-matter";
import formatDateWithOrdinal from "../../utils/dateConvert";

const markdownOptions = {
  overrides: {
    pre: PreBlock,
  },
};

export function postPage(props) {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  const article = matter(post);

  const word = article.content.split(" ").length;
  const readTime = Math.ceil(word / 200);

  const date = article.data.date;
  const ordinalDate = formatDateWithOrdinal(date);

  if (post === "") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <Link href="https://klob0t.xyz">
          <Image
            src="/images/logo-fav.svg"
            width={140}
            height={140}
            alt="logo"
          />
        </Link>
      </div>
      <div className={styles.title}>
        <h1>{article.data.title}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h6>
            {ordinalDate.dayOfWeek}, {ordinalDate.month} {ordinalDate.day}
            <sup>{ordinalDate.ordinalIndicator}</sup> {ordinalDate.year} • {readTime} min
            read{" "}
          </h6>
        </div>
      </div>
      <hr></hr>
      <article>
        <Markdown options={{ markdownOptions }}>{article.content}</Markdown>
      </article>
      <hr></hr>
      <h5>
        made by <Link href="https://klob0t.xyz">klob0t</Link> with
        &#128147;
      </h5>
    </>
  );
}

export default postPage;
