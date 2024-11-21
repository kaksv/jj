import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css'

import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gigit',
  description: 'A place for students to find Gigs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container py-4 px-6">
          <Header />
          {children}
        </main>
        <footer className="container p-8  text-gray-500">
          Gigit &copy; 2024 - All rights reserved
        </footer>
      </body>
    </html>
  )
}
