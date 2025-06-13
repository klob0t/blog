'use client'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { TrackedImage } from '@/app/lib/TrackedImage'
import React, { CSSProperties, useEffect, useState } from 'react'
import styles from './index.module.css'

interface CodeBlockProps {
   className?: string
   children: React.ReactNode
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
      setIsMounted(true)
   }, [])


   let lang = 'text'
   if (className && className.startsWith('lang-')) {
      lang = className.replace('lang-', '')
   }
   const langShow = lang.charAt(0).toUpperCase() + lang.slice(1)

   if (!isMounted) {
      return (
         <pre className={className}>
            <code>{children}</code>
         </pre>
      )
   }

   const customTheme = {
      ...atomOneDarkReasonable,
      'hljs': {
         backgroundColor: 'black',
      },
      'hljs-comment': { fontStyle: 'italic' },
   }

   const lineNumStyles = {
      color: 'var(--gray)'
   }

   const preTagStyles: CSSProperties = {
      backgroundColor: 'transparent',
      padding: '0 0em 1em 1em',
      marginLeft: 0,
      marginBottom: 0,
      overflowX: 'auto',
   }

   return (
      <div className={styles.wrapper}>
         <p>{langShow}</p>
         <SyntaxHighlighter
            showInlineLineNumbers={true}
            showLineNumbers={true}
            lineNumberStyle={lineNumStyles}
            language={lang}
            customStyle={preTagStyles}
            style={customTheme}
            PreTag='pre'>
            {String(children).replace(/\n$/, '')}
         </SyntaxHighlighter>
      </div>
   )
}

export const PreBlock = ({ children }: { children: React.ReactNode }) => {
   if (React.isValidElement(children) && children.type === 'code') {
      return <CodeBlock {...children.props as CodeBlockProps} />
   }
   return <pre>{children}</pre>
}

interface MarkdownImageProps {
   src?: string;
   alt?: string;
}

export const MarkdownImage = ({ src, alt = '' }: MarkdownImageProps) => {
   const [hasError, setHasError] = useState(false)
   
   if (!src) {
      return null
   }

   const imageSrc = hasError ? '/images/error.png' : src

   return (
      <TrackedImage
         src={imageSrc}
         width={0}
         height={0}
         alt={alt}
         sizes='100vw'
         style={{ width: '100%', height: 'auto' }}
         quality={100}
         onError={() => {
            setHasError(true)
         }}
      />
   )
}