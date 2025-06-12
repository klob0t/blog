'use client'
import Link from 'next/link'
import { useState, useEffect, memo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useLoading } from '@/app/lib/LoadingContext'
import { useSplitTextAnimation } from '@/app/lib/useSplitTextAnimation'

gsap.registerPlugin(SplitText)

interface PostMetadata {
   title: string
   date: string
   slug: string
}
function PostsListComponent() {
   const [posts, setPosts] = useState<PostMetadata[]>([])
   const { startLoading, finishLoading } = useLoading()
   const ref = useRef<HTMLParagraphElement>(null)
   useSplitTextAnimation(ref)

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            startLoading()
            const response = await fetch('/api/posts')
            const data: PostMetadata[] = await response.json()
            setPosts(data)
         } catch (error) {
            console.error('Failed to fetch blog posts', error)
         } finally {
            finishLoading()
         }
      }
      fetchPosts()
   }, [startLoading, finishLoading])

   useGSAP(() => {
      if (posts.length > 0) {
         const titles = gsap.utils.toArray('.post-title')
         const tl = gsap.timeline()

         titles.forEach(title => {
            const split = new SplitText(title as HTMLElement, { type: 'chars' });
            tl.from(split.chars, {
               opacity: 0,
               y: 20,
               stagger: 0.01,
               ease: 'power2.out',
               delay: 0.3,
            }, "<0.000001");
         });
      }
   }, { dependencies: [posts, finishLoading] })


   return (
         <div>
            {posts.map((post) => {
               return (
                  <Link
                     
                     key={post.slug}
                     href={`/blogs/${post.slug}`}>
                     <p ref={ref} className='post-title'>{post.title}</p>
                  </Link>
               )
            })}
         </div>
   )
}

const PostsList = memo(PostsListComponent)
export default PostsList