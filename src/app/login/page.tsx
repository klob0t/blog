"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import Link from 'next/link'
import { Logo } from '@/app/components/logo'

export default function LoginPage() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsLoading(true)
      setError('')

      try {
         const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
         });

         if (!response.ok) {
            // Get the error message from the response if it exists
            const errorData = await response.json();
            throw new Error(errorData.error || 'Invalid credentials. Please try again.');
         }

         router.push('/admin/submit/');

      } catch (err) {
         if (err instanceof Error) setError(err.message);
      } finally {
         setIsLoading(false);
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