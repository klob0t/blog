// import Head from 'next/head'
import fs from "fs";
import matter from "gray-matter";
import styles from './page.css'

export const getPostContent = (slug) => {
  const folder = 'posts/'
  const file = `${folder}${slug}.md`
  const content = fs.readFileSync(file, 'utf8')
  const matterResult = matter(content)
  return matterResult
}

export async function generateMetadata(props){
  const post =  getPostContent(props.params.slug)
  return {
    title: `klob0t blog — ${post.data.title}`
  }
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
