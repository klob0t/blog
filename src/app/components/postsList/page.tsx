'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

interface PostMetadata {
   title: string
   date: string
   slug: string
}

export default function PostsList() {
   const [posts, setPosts] = useState<PostMetadata[]>([])
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            setIsLoading(true)
            const response = await fetch('/api/posts')
            const data: PostMetadata[] = await response.json()
            setPosts(data)
         } catch (error) {
            console.error('Failed to fetch blog posts', error)
         } finally {
            setIsLoading(false)
         }
      }

      fetchPosts()
   }, [])

   useGSAP(() => {
      if (!isLoading && posts.length > 0) {
         const titles = gsap.utils.toArray('.post-title')
         const tl = gsap.timeline()

         titles.forEach(title => {
            const split = new SplitText(title as HTMLElement, { type: 'chars' });
            tl.from(split.chars, {
               opacity: 0,
               y: 20,
               stagger: 0.01,
               ease: 'power2.out',
            }, "<0.1");
         });
      }
   }, { dependencies: [isLoading, posts] })


   return (
      <div>
         <div>
            {posts.map((post) => {
               return (
                  <Link
                     key={post.slug}
                     href={`/blogs/${post.slug}`}>
                     <p className='post-title'>{post.title}</p>
                  </Link>
               )
            })}
         </div>
      </div>
   )
}