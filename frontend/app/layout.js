import './globals.css'
import { Inter } from 'next/font/google'
import CustomButton from '../components/custom-button'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book Exchange',
  description: 'Exchange books with other readers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + "font-light"}>
        <nav className="bg-white sticky top-0 z-10 border-b border-gray-200 ">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <Link href="/" className="text-3xl font-light tracking-tight text-gray-800">
                    <span className="font-bold text-red-500">BEx</span>
                    <span className="text-gray-500">change</span>
                  </Link>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <Link href="/books" className="py-4 px-2 text-gray-500 hover:text-gray-900">
                    Books
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <CustomButton  href="/login" variant="t1">
                  Login
                </CustomButton>
                <CustomButton href="/register" variant="t2">
                  Register
                </CustomButton>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
