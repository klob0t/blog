import fs from 'fs'
import Markdown from 'markdown-to-jsx'
import matter from 'gray-matter'
import Convert from '@/app/utils/dateConvert'
import styles from './page.css'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import '@/app/utils/syntaxHighlight'
import {PreBlock, CodeBlock} from '@/app/utils/syntaxHighlight'

const getPostContent = (slug) => {
  const folder = 'posts/'
  const file = `${folder}${slug}.md`
  const content = fs.readFileSync(file, 'utf8')
  const matterResult = matter(content)
  return matterResult
}

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
    <html lang="en">
      <body>
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
      <h5><Link href='klob0t.github.io'>klob0t.github.io</Link> &#8859; 2024</h5>
      </body>
    </html>
  );
}

export default postPage