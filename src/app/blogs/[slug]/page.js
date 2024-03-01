import Markdown from 'markdown-to-jsx'
import Convert from '../../utils/dateConvert'
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {PreBlock, CodeBlock} from '../../utils/syntaxHighlight'
import { getPostContent } from './layout'

const markdownOptions = {
  wrapper: 'article',
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
        <Markdown options={markdownOptions}>{post.content}</Markdown>
      <hr></hr>
      <h5><Link href='https://klob0t.github.io'>klob0t.github.io</Link> &#8859; 2024</h5>
      </>
  );
}

export default postPage