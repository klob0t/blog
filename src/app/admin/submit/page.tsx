'use client'

import React, { useState } from 'react'
import {
   MDXEditor,

   headingsPlugin,
   listsPlugin,
   quotePlugin,
   thematicBreakPlugin,
   markdownShortcutPlugin,
   toolbarPlugin,
   frontmatterPlugin,
   diffSourcePlugin,
   linkPlugin,
   linkDialogPlugin,
   imagePlugin,
   tablePlugin,
   codeBlockPlugin,
   codeMirrorPlugin,

   UndoRedo,
   BoldItalicUnderlineToggles,
   CodeToggle,
   ListsToggle,
   BlockTypeSelect,
   CreateLink,
   InsertTable,
   InsertImage,
   InsertFrontmatter,
   DiffSourceToggleWrapper,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import '@/app/globals.css'

import './theme.css'
import styles from './page.module.css'



export default function SubmitPage() {
   const [title, setTitle] = useState('');
   const [slug, setSlug] = useState('');
   const [content, setContent] = useState('');

   const handleSubmit = async () => {
      if (!title || !content) {
         alert('Please fill out all fields.');
         return;
      }

      try {
         const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
         })

         if (!response.ok) {
            const errorResult = await response.json()
            throw new Error(errorResult.message || 'Failed to create post')
         }

         const result = await response.json()
         alert(result.message)
         setTitle('')
         setContent('')

      } catch (error) {
         if (error instanceof Error) {
            console.error('Submission error:', error);
            alert(`An error occurred: ${error.message}`);
         }
      }
   }


   return (
      <div className={styles.page}>
         <div className={styles.container}>
            <h1>Create New Blog Post</h1>
            <input
               type="text"
               placeholder="Post Title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className={styles.input}
            />
            <div className={styles.editor}>
               <MDXEditor
                  className="dark-theme dark-editor"
                  markdown={content}
                  onChange={setContent}
                  contentEditableClassName="prose"
                  plugins={[
                     toolbarPlugin({
                        toolbarContents: () => (
                           <>
                              <UndoRedo />
                              <BoldItalicUnderlineToggles />
                              <InsertFrontmatter />
                              <CodeToggle />
                              <ListsToggle />
                              <BlockTypeSelect />
                              <CreateLink />
                              <InsertImage />
                              <InsertTable />
                              <DiffSourceToggleWrapper />
                           </>
                        ),
                     }),
                     headingsPlugin(),
                     codeBlockPlugin(),
                     
                     linkPlugin(),
                     linkDialogPlugin({ popoverClassName: 'dark-editor' }),
                     listsPlugin(),
                     quotePlugin(),
                     thematicBreakPlugin(),
                     markdownShortcutPlugin(),
                     imagePlugin(),
                     tablePlugin(),
                     frontmatterPlugin(),
                     diffSourcePlugin({ viewMode: 'rich-text' })
                  ]}
               />
            </div>

            <button onClick={handleSubmit} className={styles.button}>
               Submit Post
            </button>
         </div>
      </div>
   )
}