import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMetadata {
   title: string
   date: string
   slug: string
}

export async function GET() {
   try {
      const folder = path.join(process.cwd(), 'src', 'app', 'assets', 'blog-posts')
      const files = fs.readdirSync(folder)

      const posts: PostMetadata[] = files.map((filename) => {
         const slug = filename.replace('.md', '')
         const filePath = path.join(folder, filename)
         const fileContents = fs.readFileSync(filePath, 'utf8')
         const { data } = matter(fileContents)
         return {
            title: data.title,
            date: data.date,
            slug: slug,
         }
      })

      const sortedPosts = posts.sort((postA, postB) => new Date(postB.date).getTime() - new Date(postA.date).getDate()
      )

      return NextResponse.json(sortedPosts)
   } catch (error) {
      console.error('Failed to get posts', error)
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
   }
}