'use client'
import { createStarryNight, common } from '@wooorm/starry-night'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { TrackedImage } from '@/app/lib/TrackedImage'
import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import '@wooorm/starry-night/style/dark'
import { starryNightGutter } from '@/app/lib/starry-night-gutter'
import Link from 'next/link'



interface CodeBlockProps {
   className?: string
   children: React.ReactNode
}

interface LinkProps {
   href?: string
   children: React.ReactNode
}


interface MarkdownImageProps {
   src?: string;
   alt?: string;
}

export const MarkdownLink: React.FC<LinkProps> = ({ href, children }) => {
   if (!href) {
      return <span>{children}</span>
   }
      return (
         <Link href = {href} target='_blank'>
            {children}
         </Link>
      )
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
   const [highlighted, setHighlighted] = useState<React.ReactNode>(null)
   let lang = 'text'

   if (className && className.startsWith('lang-')) {
      lang = className.replace('lang-', '')
   }

   const langShow = lang.charAt(0).toUpperCase() + lang.slice(1)

   useEffect(() => {
      const highlightCode = async () => {
         const starryNight = await createStarryNight(common)
         const scope = starryNight.flagToScope(lang)

         if (scope) {
            const tree = starryNight.highlight(String(children).replace(/\n$/, ''), scope)
            starryNightGutter(tree)
            setHighlighted(toJsxRuntime(tree, { Fragment, jsx, jsxs }))
         } else {
            setHighlighted(<pre><code>{String(children)}</code></pre>)
         }
      }
      highlightCode()
   }, [children, lang])

   return (
      <div className={styles.wrapper}>
         <p>{langShow}</p>
         {/* We wrap the highlighted content in pre and code tags here */}
         <pre className={styles.content}>
            <code>
               {highlighted}
            </code>
         </pre>
      </div>
   )
}

// export const EditorCodeBlock: React.FC<EditorCodeBlockProps> = ({ language, code }) => {
//    const [isMounted, setIsMounted] = useState(false)

//    useEffect(() => {
//       setIsMounted(true)
//    }, [])


//    if (!isMounted) {
//       return (
//          <pre>
//             <code>{code}</code>
//          </pre>
//       )
//    }

//    const customTheme = {
//       ...atomOneDarkReasonable,
//       'hljs': {
//          backgroundColor: 'black'
//       },
//       'hljs-comment': { fontStyle: 'italic' },
//    }

//    const lineNumStyles = {
//       color: 'var(--gray)'
//    }

//    const preTagStyles: CSSProperties = {
//       backgroundColor: 'transparent',
//       padding: '0 0em 1em 1em',
//       marginLeft: 0,
//       marginBottom: 0,
//       overflowX: 'auto',
//    }

//    return (
//       <div className={styles.wrapper}>
//          <p>{language}</p>
//          <SyntaxHighlighter
//             showInlineLineNumbers={true}
//             showLineNumbers={true}
//             lineNumberStyle={lineNumStyles}
//             language={language || 'text'}
//             customStyle={preTagStyles}
//             style={customTheme}
//             PreTag='pre'>
//             {code}
//          </SyntaxHighlighter>
//       </div>
//    )
// }

export const PreBlock = ({ children }: { children: React.ReactNode }) => {
   if (React.isValidElement(children) && children.type === 'code') {
      return <CodeBlock {...children.props as CodeBlockProps} />
   }
   return <pre>{children}</pre>
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
         loading='eager'
         sizes='100vw'
         style={{ width: '100%', height: 'auto' }}
         quality={100}
         onError={() => {
            setHasError(true)
         }}
      />
   )
}