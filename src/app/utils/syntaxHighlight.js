import SyntaxHighlighter from 'react-syntax-highlighter'
import {atomOneDarkReasonable} from 'react-syntax-highlighter/dist/esm/styles/hljs'

export const CodeBlock = ({className, children}) => {
  let lang = 'text'; 
  if (className && className.startsWith('lang-')) {
    lang = className.replace('lang-', '');
  }
  return (
    <SyntaxHighlighter language={lang} style={atomOneDarkReasonable}>
      {children}
    </SyntaxHighlighter>
  )
}
export const PreBlock = ({children, ...rest}) => {
  if ('type' in children && children ['type'] === 'code') {
    return CodeBlock(children['props']);
  }
  return <pre {...rest}>{children}</pre>;
}
