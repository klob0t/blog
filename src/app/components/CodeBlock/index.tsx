'use client'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import React, { useEffect, useState } from 'react'
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
      'hljs': {backgroundColor: 'black',
      fontFeatureSettings: `'ss06' on, 'ss05' on, 'ss08' on`
      },
      'hljs-comment': { fontStyle: 'italic' },
      'hljs-title': { color: '#4893f5' },
   }

   const lineNumStyles = {
      color: 'var(--gray)'
   }

   return (
      <div className={styles.wrapper}>
         <p>{langShow}</p>
         <SyntaxHighlighter
            showInlineLineNumbers={true}
            showLineNumbers={true}
            lineNumberStyle={lineNumStyles}
            language={lang}
            style={customTheme}
            PreTag='div'>
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