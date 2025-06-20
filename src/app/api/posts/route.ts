import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'

export interface PostData {
   title: string
   date: string
   tags?: string[]
   slug: string
}

export async function GET() {
   const supabase = await createClient()
   try {
      const { data: posts, error } = await supabase
         .from('posts')
         .select('title, date, slug')
         .order('date', { ascending: false })

      if (error) {
         throw error
      }

      return NextResponse.json(posts)
   } catch (error) {
      console.error('Failed to get posts', error)
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
   }
}

const createSlug = (title: string): string => {
   return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
}

export async function POST(req: NextRequest) {
   const supabase = await createClient()
   try {
      const body = await req.json()
      const { title, tags, markdown } = body

      if (!title || !markdown) {
         return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
      }

      const slug = createSlug(title)

      const rawDate = new Date()
      const year = rawDate.getFullYear()
      const month = String(rawDate.getMonth() + 1).padStart(2, '0')
      const day = String(rawDate.getDate()).padStart(2, '0')

      const today = `${year}-${month}-${day}`

      const { data, error } = await supabase
         .from('posts')
         .insert([{ title, date: today, tags, markdown, slug }])
         .select()

      if (error) {
         // Handle potential duplicate slug error
         if (error.code === '23505') { // PostgreSQL unique violation
            return NextResponse.json({ error: 'A post with this title already exists.' }, { status: 409 })
         }
         throw error
      }

      return NextResponse.json({ success: true, data }, { status: 201 })
   } catch (error) {
      console.error('Error creating post', error)
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
   }
}

// // Define the path to your posts directory
// const postsDirectory = path.join(process.cwd(), 'src', 'app', 'assets', 'blog-posts')

// // Helper function to create a URL-friendly slug from a title
// const createSlug = (title: string): string => {
//    return title
//       .toLowerCase()
//       .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
//       .replace(/\s+/g, '-') // collapse whitespace and replace by -
//       .replace(/-+/g, '-') // collapse dashes
// }

// export async function GET() {
//    try {
//       // Ensure the directory exists before trying to read from it
//       await fs.mkdir(postsDirectory, { recursive: true });

//       const files = await fs.readdir(postsDirectory)

//       const posts = await Promise.all(files.map(async (filename) => {
//          const slug = filename.replace('.md', '')
//          const filePath = path.join(postsDirectory, filename)
//          const fileContents = await fs.readFile(filePath, 'utf8')
//          const { data } = matter(fileContents)

//          return {
//             title: data.title,
//             date: data.date,
//             slug: slug,
//          } as PostData
//       }))

//       // Sort posts by date in descending order (newest first)
//       // Corrected sorting logic from .getDate() to .getTime()
//       const sortedPosts = posts.sort((postA, postB) =>
//          new Date(postB.date).getTime() - new Date(postA.date).getTime()
//       )

//       return NextResponse.json(sortedPosts)
//    } catch (error) {
//       console.error('Failed to get posts', error)
//       return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
//    }
// }

// export async function POST(req: NextRequest) {
//    try {
//       // 1. Get the body from the request using await req.json()
//       const body = await req.json();
//       const { title, tags, markdown } = body;

//       // 2. Validate the incoming data
//       if (!title || !markdown) {
//          return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
//       }

//       // 3. Define the frontmatter data object
; // This produces '2025-06-19'

//       const frontmatterData = {
//          title: title,
//          date: formattedDate,
//          tags: tags || [],
//       };

//       // 4. Use gray-matter to combine markdown and frontmatter
//       const fileContents = matter.stringify(markdown, frontmatterData);

//       // 5. Create a slug and define the full file path
//       const slug = createSlug(title);
//       const filePath = path.join(postsDirectory, `${slug}.md`);

//       // 6. Ensure the directory exists (important for the first run)
//       await fs.mkdir(postsDirectory, { recursive: true });

//       // 7. Write the file to the filesystem asynchronously
//       await fs.writeFile(filePath, fileContents);

//       // 8. Return a success response using NextResponse.json()
//       return NextResponse.json({ success: true, message: `Post created at ${filePath}` }, { status: 201 }); // 201 Created is more appropriate

//    } catch (error) {
//       console.error('Error creating post:', error);
//       // Return a server error response
//       return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 });
//    }
// }