"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import Link from 'next/link'
import { Logo } from '@/app/components/logo'
import { createClient } from '@/app/lib/supabase/client'

export default function LoginPage() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const supabase = createClient()

   const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsLoading(true)
      setError('')

      const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
      })

      if (error) {
         setError('Invalid credentials. Please try again.')
         setIsLoading(false)
      } else {
         router.push('/admin/submit/')
      }
   }

   return (
      <main className={styles.loginContainer}>
         <div className={styles.loginWrapper}>
            <form onSubmit={handleLogin}>
               <h1>Login</h1>
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
               <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Access'}
               </button>
               {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </form>

         </div>
         <Link
            href='/'>
            <Logo />
         </Link>
      </main>
   )
}