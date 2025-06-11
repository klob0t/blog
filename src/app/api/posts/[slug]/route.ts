import { NextResponse } from "next/server"
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
   try {
      const { slug } = await context.params
      const folder = path.join(process.cwd(), 'src', 'app', 'assets', 'blog-posts')
      const file = path.join(folder, `${slug}.md`)

      if (!fs.existsSync(file)) {
         return NextResponse.json({ message: 'Post Not Found' }, { status: 400 })
      }

      const content = fs.readFileSync(file, 'utf8')
      const matterResult = matter(content)

      const postData = {
         ...matterResult.data,
         content: matterResult.content
      }

      return NextResponse.json(postData)
   } catch (error) {
      console.error('Failed to get post content', error)
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
   }
}