import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMetadata {
   title: string,
   date: string,
   author: string,
   slug: string
}

export const getAllPosts = (): PostMetadata[] => {
   const folder = path.join(process.cwd(), 'src', 'app', 'assets', 'blog-posts')
   const files = fs.readdirSync(folder)

   const posts = files.map((filename) => {
      const slug = filename.replace('.md', '')
      const filePath = path.join(folder, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      return {
         title: data.title,
         date: data.date,
         author: data.author,
         slug: slug,
      } as PostMetadata
   })

   const sortedPosts = posts.sort((postA, postB) => new Date(postB.date).getTime() - new Date(postA.date).getTime())

   return sortedPosts
}