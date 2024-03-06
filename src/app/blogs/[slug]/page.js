import Markdown from 'markdown-to-jsx'
import Convert from '../../utils/dateConvert'
import styles from './page.css'
import Link from 'next/link'
import Image from 'next/image'
import {PreBlock, CodeBlock} from '../../utils/syntaxHighlight'
import { getPostContent } from './layout'
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'

const markdownOptions = {
  overrides: {
      pre: PreBlock
  }
}
const postPage = (props) => {
  const slug = props.params.slug
  const post = getPostContent(slug)
  return (
      <>
        <div className={styles.header}>
          <Link href='/'>
            <Image src='/images/logo-2024.png'
                width={140}
                height={140}
                alt='logo'/>
          </Link>
        </div>
      <div className={styles.title}>
      <h1>{post.data.title}</h1>
      <Convert dateString={post.data.date} />
      </div>
      <hr></hr>
      <article>
        <span style={{
          fontFamily:'var(--sansText)',
          fontWeight:'600',
          textTransform:'uppercase',
          fontSize:'0.8em'}}>{post.data.place} — </span><Markdown options={markdownOptions}>{post.content}</Markdown>
      </article>     
      <hr></hr>
      <h5><Link href='https://klob0t.github.io'>klob0t.github.io</Link> &#8859; 2024</h5>
      </>
  );
}

export default postPage