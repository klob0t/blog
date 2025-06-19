import { NextResponse, NextRequest } from 'next/server'
import { promises as fs } from 'fs' // Use the promises API for async operations
import path from 'path'
import matter from 'gray-matter'

// This interface can be used for both GET and POST data consistency
export interface PostData {
   title: string
   date: string
   tags?: string[]
   slug: string
}

// Define the path to your posts directory
const postsDirectory = path.join(process.cwd(), 'src', 'app', 'assets', 'blog-posts')

// Helper function to create a URL-friendly slug from a title
const createSlug = (title: string): string => {
   return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes
}

export async function GET() {
   try {
      // Ensure the directory exists before trying to read from it
      await fs.mkdir(postsDirectory, { recursive: true });

      const files = await fs.readdir(postsDirectory)

      const posts = await Promise.all(files.map(async (filename) => {
         const slug = filename.replace('.md', '')
         const filePath = path.join(postsDirectory, filename)
         const fileContents = await fs.readFile(filePath, 'utf8')
         const { data } = matter(fileContents)

         return {
            title: data.title,
            date: data.date,
            slug: slug,
         } as PostData
      }))

      // Sort posts by date in descending order (newest first)
      // Corrected sorting logic from .getDate() to .getTime()
      const sortedPosts = posts.sort((postA, postB) =>
         new Date(postB.date).getTime() - new Date(postA.date).getTime()
      )

      return NextResponse.json(sortedPosts)
   } catch (error) {
      console.error('Failed to get posts', error)
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
   }
}

export async function POST(req: NextRequest) {
   try {
      // 1. Get the body from the request using await req.json()
      const body = await req.json();
      const { title, tags, markdown } = body;

      // 2. Validate the incoming data
      if (!title || !markdown) {
         return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
      }

      // 3. Define the frontmatter data object
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed, so we add 1
      const day = String(today.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`; // This produces '2025-06-19'

      const frontmatterData = {
         title: title,
         date: formattedDate,
         tags: tags || [],
      };

      // 4. Use gray-matter to combine markdown and frontmatter
      const fileContents = matter.stringify(markdown, frontmatterData);

      // 5. Create a slug and define the full file path
      const slug = createSlug(title);
      const filePath = path.join(postsDirectory, `${slug}.md`);

      // 6. Ensure the directory exists (important for the first run)
      await fs.mkdir(postsDirectory, { recursive: true });

      // 7. Write the file to the filesystem asynchronously
      await fs.writeFile(filePath, fileContents);

      // 8. Return a success response using NextResponse.json()
      return NextResponse.json({ success: true, message: `Post created at ${filePath}` }, { status: 201 }); // 201 Created is more appropriate

   } catch (error) {
      console.error('Error creating post:', error);
      // Return a server error response
      return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 });
   }
}