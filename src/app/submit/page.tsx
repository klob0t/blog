'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'
import Blockquete from '@tiptap/extension-blockquote'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import TurndownService from 'turndown'
import styles from './page.module.css'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(
   supabaseUrl,
   supabaseKey
)

export default function SubmitPage() {
   const [previewMode, setPreviewMode] = useState(false)
   const [frontmatter, setFrontmatter] = useState(`title: "" 
date: "${new Date().toISOString()}" 
tags: []`)

   const editor = useEditor({
      extensions: [StarterKit,
         Underline,
         Link,
         Image.configure({ inline: false }),
         Heading.configure({ levels: [1, 2, 3] }),
         Blockquete,
         Placeholder.configure({ placeholder: 'hello...' })
      ],
      content: '<p>hello, world</p>',
      immediatelyRender: false
   })

   const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const { data, error } = await supabase.storage
         .from('blog-images')
         .upload(`posts/${Date.now()}=${file.name}`, file)

      if (error) {
         alert('Upload failed')
         console.error(error)
         return
      }

      const { data: publicUrlData } = supabase.storage
         .from('blog-images')
         .getPublicUrl(data.path)

      const url = publicUrlData.publicUrl
      editor?.chain().focus().setImage({ src: url }).run()

   }

   const handleSubmit = async () => {
      const html = editor?.getHTML() || ''
      const turndown = new TurndownService()
      const markdown = turndown.turndown(html)
      const content = `${frontmatter}\n\n${markdown}`

      const { error } = await supabase
         .from('posts')
         .insert({
            content,
            created_at: new Date().toISOString()
         })

      if (error) {
         alert('Submission failed')
         console.error(error)
      } else {
         alert('Post submitted successfully')
      }
   }

   return (
      <div className={styles.wrapper}>
         <textarea
            className={styles.frontmatter}
            rows={5}
            value={frontmatter}
            onChange={(e) => setFrontmatter(e.target.value)}
         />

         <div className={styles.toolbar}>
            <button onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
            <button onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
            <button onClick={() => editor?.chain().focus().toggleUnderline().run()}>Underline</button>
            <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>• List</button>
            <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. List</button>
            <button onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Quote</button>
            <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>Code</button>
            <button onClick={() => editor?.chain().focus().setParagraph().run()}>Paragraph</button>
            <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
            <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
            <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
            <input
               type="file"
               accept="image/*"
               className={styles.fileInput}
               id="image-upload"
               onChange={addImage}
            />
            <label htmlFor="image-upload" className={styles.uploadLabel}>🖼️ Upload Image</label>
            <button onClick={() => setPreviewMode(!previewMode)}>
               {previewMode ? 'Edit Mode' : 'Preview'}
            </button>
            <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
         </div>

         {previewMode ? (
            <div
               className={styles.preview}
               dangerouslySetInnerHTML={{ __html: editor?.getHTML() ?? '' }}
            />
         ) : (
            <EditorContent editor={editor} className={styles.editor} />
         )}
      </div>
   )
}