//src/app/api/images/route.ts
import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
   try {
      const folder = path.join(process.cwd(), 'public', 'images', 'marquee')
      const filenames = fs.readdirSync(folder)

      const images = filenames
         .filter(file => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file))
         .map(file => `/images/marquee/${file}`)
      return NextResponse.json(images)
   } catch (error) {
      console.error('Failed to read images: ', error)

      return new NextResponse(
         JSON.stringify({ message: 'Internal Server Error: Could no load images' }), { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
   }
}