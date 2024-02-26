import React from 'react'
import Image from 'next/image'

const Fourofour = () => {
  return (
    <div className='fourOfour'> 
      <h1>404</h1>
      <h1>it ain't here blud,<br />but it's okay. <br/> <br/> remember...</h1>
      <Image
        src='/images/benny.jpg'
        width={450}
        height={250}
        alt='benny'        
      /> 
      <p>it's my car, Benedict Jean</p>
    </div>
  )
}

export default Fourofour