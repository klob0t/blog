import Link from 'next/link'
import { getAllPosts } from '@/app/lib/posts'
import styles from './index.module.css'

export default async function BlogPostsList() {
   const posts = getAllPosts()

   return (
         <div className={styles.list}>
            {posts.map((post) => {
               return (
                     <Link
                     key={post.slug}
                        href={`/blogs/${post.slug}`}
                        className={styles.link}>
                        <p>{post.title}</p>
                     </Link>
               )
            })}
         </div>
   )
}