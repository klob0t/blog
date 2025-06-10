import Link from 'next/link'
import { getAllPosts } from '@/app/lib/posts'
import styles from './index.module.css'

export default async function BlogPostsList() {
   const posts = getAllPosts()

   return (
      <div className={styles.container}>
         <ul className={styles.list}>
            {posts.map((post) => {
               return (
                  <li key={post.slug}>
                     <Link
                        href={`/blogs/${post.slug}`}
                        className={styles.link}>
                        <h5>{post.title}</h5>
                     </Link>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}