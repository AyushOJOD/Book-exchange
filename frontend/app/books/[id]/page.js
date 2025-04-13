'use client'

import { useRouter ,useParams} from 'next/navigation'
import { useEffect, useState } from 'react'
import CustomButton from '../../../components/custom-button'
import FadeWrapper from '../../../components/fade-wrapper'
import Loader from '../../../components/loader'
const API_URL = 'https://book-exchange-k5pu.onrender.com/api/books'

export default function BookDetails() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log('Fetching book with ID:', params.id)
        const res = await fetch(`${API_URL}/${params.id}`)
        console.log('Response status:', res.status)

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message || 'Failed to fetch book')
        }

        const data = await res.json()
        console.log('Book data:', data)
        setBook(data)
      } catch (err) {
        console.error('Error fetching book:', err)
        setError(err.message || 'An error occurred while fetching the book')
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [params.id])

  const handleStatusChange = async (e) => {
    const newStatus = e.target.checked ? 'rented' : 'available'
    try {
      const res = await fetch(`${API_URL}/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) {
        throw new Error('Failed to update book status')
      }

      setBook(prev => ({ ...prev, status: newStatus }))
    } catch (err) {
      console.error('Error updating status:', err)
      setError(err.message || 'An error occurred while updating the status')
    }
  }

  if (loading) {
    return (
<Loader />
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <div className="mt-4">
          <CustomButton
            href="/books"
            variant="t2"
            size="lg"
          >
            ← Back to Books
          </CustomButton>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Book not found
        </div>
        <div className="mt-4">
          <CustomButton
            href="/books"
            variant="t2"
            size="lg"
          >
            ← Back to Books
          </CustomButton>
        </div>
      </div>
    )
  }

  return (
    <FadeWrapper>
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Book Details</h1>
        <div className="space-x-2">
          <CustomButton
            href={`/books/${book.id}/edit`}
            variant="t1"
            size="lg"
          >
            Edit
          </CustomButton>
          <CustomButton
            href={`/books/${book.id}/delete`}
            variant="t2"
            size="lg"
          >
            Delete
          </CustomButton>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 border-gray-200 border">
        <h2 className="text-2xl font-semibold mb-6">{book.title}</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-gray-500 text-sm mb-1">Author</h3>
            <p className="text-lg">{book.author}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm mb-1">Genre</h3>
            <p className="text-lg">{book.genre}</p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-gray-500 text-sm mb-1">Status</h3>
            <button
              onClick={() => handleStatusChange({ target: { checked: book.status === 'available' } })}
              className="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={book.status === 'rented'}
                className="sr-only peer"
                readOnly
              />
              <div className={`w-11 h-6 rounded-full peer ${
                book.status === 'rented'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {book.status === 'rented' ? 'Rented' : 'Available'}
              </span>
            </button>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm mb-1">Location</h3>
            <p className="text-lg">{book.location}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm mb-1">Contact</h3>
            <p className="text-lg">{book.contact}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CustomButton
          href="/books"
          variant="t2"
          size="lg"
        >
          ← Back to Books
        </CustomButton>
      </div>
      </div>
    </FadeWrapper>
  )
}