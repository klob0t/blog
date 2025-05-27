import Link from 'next/link'
import Image from 'next/image'
import './globals.css'

const Fourofour = () => {
  return (
    <div className='fourOfour'> 
      <h1>404</h1>
      <h1>it ain't here blud,<br />but it's okay. <br/> <br/> remember...</h1>
     <Link href='/'> <Image
        src='/images/benny.jpg'
        width={450}
        height={250}
        alt='benny'        
      /> </Link>
      <p>it's my car, Benedict Jean</p>
    </div>
  )
}

export default Fourofour