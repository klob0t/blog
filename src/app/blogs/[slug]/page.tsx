'use client'
import { useState, useEffect, use } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import Markdown from 'markdown-to-jsx'
import { formatDate } from '@/app/lib/formatDate'
import {Logo} from '@/app/components/logo'
import { PreBlock, MarkdownImage } from '@/app/components/MarkdownOverrides'
import { useLoadingStore } from '@/app/lib/store/loadingStore'

interface PostData {
   title: string
   date: string
   content: string
}

const markdownOptions = {
   overrides: {
      pre: PreBlock,
      img: MarkdownImage
   }
}

export default function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
   const [post, setPost] = useState<PostData | null>(null)
   const [error, setError] = useState<string | null>(null)
   const { startLoading, finishLoading } = useLoadingStore()

   const { slug } = use(params)

   useEffect(() => {
      const fetchPost = async () => {
         try {
            startLoading()
            setError(null)
            const response = await fetch(`/api/posts/${slug}`)

            if (!response.ok) {
               throw new Error('Post not found')
            }

            const data: PostData = await response.json()
            setPost(data)
            document.title = `${data.title} | klob0t`
         } catch (err) {
            if (err instanceof Error) {
               setError(err.message)
            } else {
               setError('An unknown error occurred.')
            }
            console.error('Failed to fetch post:', err)
         } finally {
            finishLoading()
         }
      }

      if (slug) {
         fetchPost()
      }
   }, [slug, startLoading, finishLoading])


   if (error || !post) {
      return (
         <div>
            <h1>{error || 'Post not found'}</h1>
            <p>Sorry, that post didn&apos;t exist</p>
         </div>
      )
   }

   const readTime = Math.ceil(post.content.split(/\s+/).length / 200)
   const date = formatDate(post.date)

   return (
      <div className={styles.container}>
         <article className={styles.article}>
         <Link
            href='/'>
            <Logo />
         </Link>
            <header>
               <h1>{post.title}</h1>
               <div className={styles.meta}>
                  <span>{`${date.dayOfWeek}, ${date.month} ${date.dayOfMonth}`}<span>{date.ordinal}</span>, {date.year}</span>
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
            <hr />
         </article>
         
         <div>klob0t <span>@</span> 2025</div>
      </div>
   )
}