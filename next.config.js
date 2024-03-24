/**@type {import('next').NextConfig} */
const nextConfig = {
   // output: 'export',
   // images: {
   //    unoptimized: true
   // },
   experimental:{
      missingSuspenseWithCSRBailout: false,
   },
   distDir : 'dist'
}

module.exports = nextConfig