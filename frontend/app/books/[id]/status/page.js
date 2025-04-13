'use client'

import { useState, useEffect } from 'react'
import { useRouter ,useParams} from 'next/navigation'

const API_URL = 'http://localhost:3001/api/books'

export default function UpdateBookStatus() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${API_URL}/${params.id}`)
        if (!res.ok) {
          throw new Error('Failed to fetch book')
        }
        const data = await res.json()
        setBook(data)
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the book')
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [params.id])

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/${params.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) {
        throw new Error('Failed to update book status')
      }

      router.push('/books')
    } catch (err) {
      setError(err.message || 'An error occurred while updating the book status')
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Book not found
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Book Status</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{book.title}</h2>
        <p className="text-gray-600 mb-2">Author: {book.author}</p>
        <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
        <p className="text-gray-600 mb-2">Current Status: {book.status}</p>
        <p className="text-gray-600 mb-2">Location: {book.location}</p>
        <p className="text-gray-600 mb-4">Contact: {book.contact}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-700 mb-4">
          Select the new status for this book:
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => router.push('/books')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => handleStatusUpdate(book.status === 'available' ? 'rented' : 'available')}
            disabled={updating}
            className={`px-4 py-2 ${
              book.status === 'available'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white rounded-lg disabled:opacity-50`}
          >
            {updating
              ? 'Updating...'
              : book.status === 'available'
              ? 'Mark as Rented'
              : 'Mark as Available'}
          </button>
        </div>
      </div>
    </div>
  )
}