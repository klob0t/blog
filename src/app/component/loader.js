import Image from 'next/image'

export const Loader = () => {
  return (
    <div style={{
      position:'absolute',
   width: '100vw',
   height: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   background: '#0f0f0f',
   top: '0', left: '0'
    }}>
    <Image
        src='/spinner.svg'
        width={50}
        height={50}
        alt='spinner'        
      />
    </div>
  )
}
export default Loader