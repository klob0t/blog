//src/app/api/images/route.ts
// import { createClient } from '@supabase/supabase-js'
import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'



export async function GET() {
   try {
      const folder = path.join(process.cwd(), 'public', 'images', 'marquee')
      const filenames = await fs.readdir(folder)

      const images = filenames
         .filter((file: string) => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file))
         .map((file:string) => `/images/marquee/${file}`)
      return NextResponse.json(images)
   } catch (error) {
      console.error('Failed to read images: ', error)

      return new NextResponse(
         JSON.stringify({ message: 'Internal Server Error: Could no load images' }), { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
   }
}

export async function POST(req: NextRequest) {
   try {
      const formData = await req.formData()
      const file = formData.get('file') as File | null

      if (!file) {
         return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
      }

      const buffer = Buffer.from(await file.arrayBuffer())

      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`

      const uploadDir = path.join(process.cwd(), 'public/images/blogs')
      await fs.mkdir(uploadDir, { recursive: true })
      const destination = path.join(uploadDir, filename)

      await fs.writeFile(destination, buffer)

      const publicUrl = `/images/blogs/${filename}`

      return NextResponse.json({ url: publicUrl })
   } catch (error) {
      console.error('File Upload Error', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
   }
}