'use client'

import { useState, useEffect } from 'react'
import { useRouter ,useParams} from 'next/navigation'

const API_URL = 'https://book-exchange-k5pu.onrender.com/api/books'

export default function DeleteBook() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

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

  const handleDelete = async () => {
    setDeleting(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/${params.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete book')
      }

      router.push('/books')
    } catch (err) {
      setError(err.message || 'An error occurred while deleting the book')
      setDeleting(false)
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
      <h1 className="text-3xl font-bold mb-6">Delete Book</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{book.title}</h2>
        <p className="text-gray-600 mb-2">Author: {book.author}</p>
        <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
        <p className="text-gray-600 mb-2">Status: {book.status}</p>
        <p className="text-gray-600 mb-2">Location: {book.location}</p>
        <p className="text-gray-600 mb-4">Contact: {book.contact}</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-700 mb-4">
          Are you sure you want to delete this book? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => router.push('/books')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete Book'}
          </button>
        </div>
      </div>
    </div>
  )
}