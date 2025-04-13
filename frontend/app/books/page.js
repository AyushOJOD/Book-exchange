'use client'

import { Edit2, Eye, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import CustomButton from '../../components/custom-button'
import FadeWrapper from '../../components/fade-wrapper'
import Loader from '../../components/loader'

const API_URL = 'https://book-exchange-k5pu.onrender.com/api/books'

export default function Books() {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(API_URL)
      if (!res.ok) {
        throw new Error('Failed to fetch books')
      }
      const data = await res.json()
      setBooks(data)
    } catch (err) {
      setError(err.message || 'An error occurred while fetching books')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (bookId, currentStatus) => {
    try {
      setError('')
      const newStatus = currentStatus === 'available' ? 'rented' : 'available'

      const res = await fetch(`${API_URL}/${bookId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) {
        throw new Error('Failed to update book status')
      }

      setSuccessMessage('Book status updated successfully')
      fetchBooks() // Refresh the books list

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError(err.message || 'An error occurred while updating book status')
    }
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
<Loader />
    )
  }

  return (
    <FadeWrapper>
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Books</h1>
        <div className="flex h-12 w-[500px] space-x-4">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field min-w-max"
          />
          <CustomButton
            href="/books/new"
            variant="t2"
            size="lg"
            className='w-[150px]'
          >
            Add Book
          </CustomButton>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800 capitalize line-clamp-2">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Genre:</span>
                  <span className="capitalize">{book.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Location:</span>
                  <span>{book.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Contact:</span>
                  <span>{book.contact}</span>
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleStatusUpdate(book.id, book.status)}
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

                <div className="flex items-center gap-2">
                  <CustomButton
                    href={`/books/${book.id}`}
                    variant="t2"
                    size="sm"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={16} />
                    View
                  </CustomButton>
                  <CustomButton
                    href={`/books/${book.id}/edit`}
                    variant="t2"
                    size="sm"
                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800"
                  >
                    <Edit2 size={16} />
                    Edit
                  </CustomButton>
                  <CustomButton
                    href={`/books/${book.id}/delete`}
                    variant="t2"
                    size="sm"
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <Trash size={16} />
                    Delete
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No books found matching your search.</p>
        </div>
      )}
      </div>
    </FadeWrapper>
  )
}