import fs from 'fs'
import path from 'path'
import Markdown from 'markdown-to-jsx'
import matter from 'gray-matter'
import { formatDate } from '@/app/lib/formatDate'
import styles from './page.module.css'
import Logo from '@/app/components/logo'
import { cache } from 'react'
import { Metadata } from 'next'
import { PreBlock } from '@/app/components/code'

/** 
A custom component to style code blocks (<pre> tags)
*/

const markdownOptions = {
   overrides: {
      pre: PreBlock,
   },
};

/** 
Reads and parses a markdown file from the file system
This function runs only on the server
@param slug - The filename of the post (without.md extension)
@returns The parsed frontmatter and content of the post
*/

export async function generateStaticParams() {
   const folder = path.join(process.cwd(), 'src', 'app', 'assets', 'blog-posts')
   const files = fs.readdirSync(folder)

   const paths = files.map(filename => ({
      slug: filename.replace('.md', '')
   }))
   return paths
}

const getPostContent = cache(async (slug: string) => {
  const folder = path.join(process.cwd(), 'src', 'app', 'assets', 'blog-posts');
  const file = path.join(folder, `${slug}.md`);
  try {
    const content = await fs.promises.readFile(file, 'utf8');
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    console.error(`Error reading post '${slug}': `, error);
    return null;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
   const { slug } = await params
   const post = await getPostContent(slug)

   if (!post) {
      return {
         title: 'Post Not Found',
      }
   }

   return {
      title: `${post.data.title} | klob0t`,
   }
}

/** 
The main blog post page component
This is an async Server Component in Next.js
*/

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params
   const post = await getPostContent(slug)

   if (!post) {
      return (
         <div className={styles.container}>
            <h1>Post not found</h1>
            <p>{slug} doesn&apos;t exist</p>
         </div>
      )
   }

   const readTime = Math.ceil(post.content.split(/\s+/).length / 200)

   const date = formatDate(post.data.date)

   return (
      <div className={styles.container}>
         <article className={styles.article}>
            <Logo />
            <header className={styles.header}>
               <h1 className={styles.title}>{post.data.title}</h1>
               <div className={styles.meta}>
                  <span>{`${date.month} ${date.dayOfMonth}`}<span>{date.ordinal}</span>, {date.year}</span>
                  <span> &bull; </span>
                  <span>{readTime} min read</span>
               </div>
            </header>
            <hr />
            <div className={styles.content}>
               <Markdown options={markdownOptions}>
                  {post.content}
               </Markdown>
            </div>
         </article>
      </div>
   )
}