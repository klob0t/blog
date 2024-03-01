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

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
         <div className={styles.noise}></div>
      {children}
      </body>
    </html>
  );
}

export default RootLayout
