'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Blockquote from '@tiptap/extension-blockquote'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Paragraph from '@tiptap/extension-paragraph'
import Typography from '@tiptap/extension-typography'
import { useState } from 'react'
import TurndownService from 'turndown'
import styles from './page.module.css'
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaQuoteRight, FaCode, FaRegFileImage } from 'react-icons/fa6'
import { VscHorizontalRule } from 'react-icons/vsc'
import { PiTextSuperscript, PiTextSubscript } from 'react-icons/pi'
import { Toaster, toast } from 'react-hot-toast'

import 'highlight.js/styles/github-dark.css'

export default function SubmitPage() {
   const [title, setTitle] = useState('Title')
   const [tags, setTags] = useState('Tags')
   const [isUploading, setIsUploading] = useState(false)

   const editor = useEditor({
      extensions: [
         StarterKit,
         Typography,
         Paragraph,
         Superscript,
         Subscript,
         Underline,
         Link,
         Image.configure({ inline: false }),
         Heading.configure({ levels: [2, 3] }),
         Blockquote,
         HorizontalRule,
         Placeholder.configure({ placeholder: 'hello...' })
      ],
      content: '<p>hello, world</p>',
      immediatelyRender: false,
      editorProps: {
         attributes: {
            class: styles.tiptapContent
         }
      }
   })

   const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file || !editor) return

      // 2. Client-side validation
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (file.size > MAX_FILE_SIZE) {
         toast.error('File is too large (max 5MB).')
         return
      }
      if (!SUPPORTED_TYPES.includes(file.type)) {
         toast.error('Invalid file type.')
         return
      }

      const formData = new FormData()
      formData.append('file', file)

      try {
         setIsUploading(true) // Start loading
         const response = await fetch('/api/images', {
            method: 'POST',
            body: formData
         })

         const data = await response.json()

         if (!response.ok) {
            throw new Error(data.error || 'Upload failed')
         }

         const url = data.url
         if (url) {
            editor.chain().focus().setImage({ src: url }).run()
            toast.success('Image uploaded successfully!')
         }
      } catch (error) {
         // 3. Use toast for errors
         toast.error(error instanceof Error ? error.message : 'An error occurred')
         console.error(error)
      } finally {
         setIsUploading(false)
         event.target.value = ''
      }
   }


   const handleSubmit = async () => {
      const html = editor?.getHTML() || ''
      const turndown = new TurndownService({
         codeBlockStyle: 'fenced',
         fence: '```',

      })

      turndown.addRule('fencedCodeBlock', {
         filter: function (node, _options) {
            return !!(
               node.nodeName === 'PRE' &&
               node.firstChild &&
               node.firstChild.nodeName === 'CODE'
            )
         },
         replacement: function (content, node, _options) {
            const el = node as HTMLElement
            const codeNode = el.firstChild as HTMLElement

            const className = codeNode.getAttribute('class') || ''
            const language = (className.match(/language-(\S+)/) || [null, ''])[1]
            return `\n\n\`\`\`${language}\n${content}\n\`\`\`\n\n`
         }
      })
      const markdown = turndown.turndown(html)

      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag)

      try {
         const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, tags: tagsArray, markdown })
         })

         const result = await response.json()

         if (!response.ok) {
            throw new Error(result.error || 'Submission failed')
         }

         editor?.commands.clearContent()

         setTitle('Title')
         setTags('Tags')
         alert('Submitted')
      } catch (error) {
         alert(error instanceof Error ? error.message : 'An error occurred')
         console.error(error)
      }
   }

   const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const format = event.target.value
      const chain = editor?.chain().focus()

      switch (format) {
         case 'paragraph':
            chain?.setParagraph().run()
            break
         case 'h2':
            chain?.toggleHeading({ level: 2 }).run()
            break
         case 'h3':
            chain?.toggleHeading({ level: 3 }).run()
      }
   }

   let currentFormat = 'paragraph';
   if (editor?.isActive('heading', { level: 2 })) {
      currentFormat = 'h2';
   } else if (editor?.isActive('heading', { level: 3 })) {
      currentFormat = 'h3';
   }

   const toolbarButtons = [
      {
         name: 'bold',
         icon: FaBold,
         command: () => editor?.chain().focus().toggleBold().run(),
         isActive: () => editor?.isActive('bold') ?? false,
      },
      {
         name: 'italic',
         icon: FaItalic,
         command: () => editor?.chain().focus().toggleItalic().run(),
         isActive: () => editor?.isActive('italic') ?? false,
      },
      {
         name: 'underline',
         icon: FaUnderline,
         command: () => editor?.chain().focus().toggleUnderline().run(),
         isActive: () => editor?.isActive('underline') ?? false,
      },
      {
         name: 'bulletList',
         icon: FaListUl,
         command: () => editor?.chain().focus().toggleBulletList().run(),
         isActive: () => editor?.isActive('bulletList') ?? false,
      },
      {
         name: 'orderedList',
         icon: FaListOl,
         command: () => editor?.chain().focus().toggleOrderedList().run(),
         isActive: () => editor?.isActive('orderedList') ?? false,
      },
      {
         name: 'blockquote',
         icon: FaQuoteRight,
         command: () => editor?.chain().focus().toggleBlockquote().run(),
         isActive: () => editor?.isActive('blockquote') ?? false,
      },
      {
         name: 'codeBlock',
         icon: FaCode,
         command: () => editor?.chain().focus().toggleCodeBlock().run(),
         isActive: () => editor?.isActive('codeBlock') ?? false,
      },
      {
         name: 'subscript',
         icon: PiTextSubscript,
         command: () => editor?.chain().focus().toggleSubscript().run(),
         isActive: () => editor?.isActive('codeBlock') ?? false,
      },
      {
         name: 'superscript',
         icon: PiTextSuperscript,
         command: () => editor?.chain().focus().toggleSuperscript().run(),
         isActive: () => editor?.isActive('superscript') ?? false,
      },
      {
         name: 'horizontalRule',
         icon: VscHorizontalRule,
         command: () => editor?.chain().focus().setHorizontalRule().run(),
         isActive: () => false,
      },
   ]

   return (
      <div className={styles.pageContainer}>
         <Toaster position="top-center" />
         <div className={styles.wrapper}>
            <h1>New Blog Post</h1>
            <textarea
               className={styles.frontmatter}
               rows={1}
               value={title}
               onChange={(e) => setTitle(e.target.value)} />
            <textarea
               className={styles.frontmatter}
               rows={1}
               value={tags}
               onChange={(e) => setTags(e.target.value)} />
            <div className={styles.contentArea}>
               <div className={styles.toolbar}>
                  {toolbarButtons.map(button => (
                     <button
                        key={button.name}
                        onClick={button.command}
                        className={button.isActive() ? styles.activeToolbarButton : styles.toolbarButton}
                        title={button.name.charAt(0).toUpperCase() + button.name.slice(1)}>
                        <button.icon />
                     </button>
                  ))}
                  <select
                     onChange={handleFormatChange}
                     value={currentFormat}>
                     <option value="paragraph">Paragraph</option>
                     <option value="h2">Heading 2</option>
                     <option value="h3">Heading 3</option>
                  </select>
                  <label htmlFor="image-upload" className={isUploading ? styles.disabledToolbarButton : styles.toolbarButton} title="Insert Image">
                     <FaRegFileImage />
                  </label>
                  <input
                     type="file"
                     accept="image/*"
                     id="image-upload"
                     onChange={addImage}
                     disabled={isUploading}
                     style={{ display: 'none' }}
                  />
               </div>
               <EditorContent editor={editor} className={styles.editor} />
            </div>
            <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
         </div>
      </div>
   )
}