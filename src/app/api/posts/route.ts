import { NextResponse, NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMetadata {
   title: string
   date: string
   slug: string
}

const folder = path.join(process.cwd(), 'src', 'app', 'assets', 'blog-posts')

export async function GET() {
   try {

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


export async function POST(request: NextRequest) {
   try {
      const { title, content } = await request.json();

      if (!title || !content) {
         return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }

      const frontmatter = {
         title: title,
         date: new Date().toISOString().split('T')[0],
      }

      const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
   
      const filePath = path.join(folder, `${slug}.md`);

   if (fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'A post with this slug already exists' }, { status: 409 })
   }



   const fileContent = matter.stringify(content, frontmatter);

   fs.writeFileSync(filePath, fileContent);

   return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });

} catch (error) {
   console.error('Error creating post:', error);
   return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
}
}