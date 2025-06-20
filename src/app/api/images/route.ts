import { NextResponse, NextRequest } from "next/server"
import { createClient } from "@/app/lib/supabase/server"

export async function POST(req: NextRequest) {
   const supabase = await createClient()
   const formData = await req.formData()
   const file = formData.get('file') as File

   if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
   }

   const fileExt = file.name.split('.').pop()
   const fileName = `${Date.now()}.${fileExt}`
   const filePath = `${fileName}`

   try {
      const { error: uploadError } = await supabase.storage
         .from('images')
         .upload(filePath, file)

      if (uploadError) {
         throw uploadError
      }

      const { data: urlData } = supabase.storage
         .from('images')
         .getPublicUrl(filePath)

      if (!urlData.publicUrl) {
         throw new Error('Could not get public URL for the uploaded image.')
      }

      const { error: insertError } = await supabase
         .from('images')
         .insert([{ filename: fileName, public_url: urlData.publicUrl }])

      if (insertError) {
         console.error('Failed to save image metadata to the database', insertError)
      }

      return NextResponse.json({ publicUrl: urlData.publicUrl })
   } catch (error) {
      console.error('Error uploading image:', error)
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
   }

}


// export async function POST(req: NextRequest) {
//    try {
//       const formData = await req.formData()
//       const file = formData.get('file') as File | null

//       if (!file) {
//          return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
//       }

//       const buffer = Buffer.from(await file.arrayBuffer())

//       const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`

//       const uploadDir = path.join(process.cwd(), 'public/images/blogs')
//       await fs.mkdir(uploadDir, { recursive: true })
//       const destination = path.join(uploadDir, filename)

//       await fs.writeFile(destination, buffer)

//       const publicUrl = `/images/blogs/${filename}`

//       return NextResponse.json({ url: publicUrl })
//    } catch (error) {
//       console.error('File Upload Error', error)
//       return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//    }
// }