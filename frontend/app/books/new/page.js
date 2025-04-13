'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomButton from '../../../components/custom-button'
import FadeWrapper from '../../../components/fade-wrapper'
const API_URL = 'https://book-exchange-k5pu.onrender.com/api/books'

export default function NewBook() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    location: '',
    contact: '',
    ownerId: '1' // This should be replaced with actual user ID from auth
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to add book')
      }

      router.push('/books')
    } catch (err) {
      setError(err.message || 'An error occurred while adding the book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FadeWrapper>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Add New Book</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 rounded-lg p-8 border-gray-200 border">
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <CustomButton
            type="button"
            onClick={() => router.push('/books')}
            variant="t2"
            size="lg"
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="submit"
            disabled={loading}
            variant="t1"
            size="lg"
          >
            {loading ? 'Adding...' : 'Add Book'}
          </CustomButton>
        </div>
      </form>
    </div>
    </FadeWrapper>
  )
}