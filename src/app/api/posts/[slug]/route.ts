import { NextResponse, NextRequest } from "next/server"
import { createClient } from "@/app/lib/supabase/server"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
   try {
      const supabase = await createClient()
      const { slug } = await params
      const { data: post, error } = await supabase
         .from('posts')
         .select('*')
         .eq('slug', slug)
         .single()

      if (error) {
         if (error.code === 'PGRST116') {
            return NextResponse.json({ message: 'Post Not Found' }, { status: 404 })
         }
         throw error
      }

      if (!post) {
         return NextResponse.json({ message: 'Post Not Found' }, { status: 404 })
      }

      return NextResponse.json(post)
   } catch (error) {
      console.error('Failed to get post content', error)
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
   }
}

// export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
//    try {
//       const { slug } = await context.params
//       const folder = path.join(process.cwd(), 'src', 'app', 'assets', 'blog-posts')
//       const file = path.join(folder, `${slug}.md`)

//       if (!fs.existsSync(file)) {
//          return NextResponse.json({ message: 'Post Not Found' }, { status: 400 })
//       }

//       const content = fs.readFileSync(file, 'utf8')
//       const matterResult = matter(content)

//       const postData = {
//          ...matterResult.data,
//          content: matterResult.content
//       }

//       return NextResponse.json(postData)
//    } catch (error) {
//       console.error('Failed to get post content', error)
//       return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
//    }
// }