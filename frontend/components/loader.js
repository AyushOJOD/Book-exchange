import React from 'react'

const Loader = ({ size = 'md', message, noMessage = false, darker = false }) => {
  const sizeClass = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className={`rounded-full ${sizeClass[size]} border-gray-200 dark:border-gray-200`}
        ></div>
        <div
          className={`absolute top-0 left-0 rounded-full animate-spin ${sizeClass[size]} ${darker ? 'border-red-800 border-t-transparent' : 'border-red-500 border-t-transparent'}`}
        ></div>
      </div>
      {!noMessage && (
        <p className="mt-2 text-gray-600 font-medium">
          {message || 'Loading...'}
        </p>
      )}
    </div>
  )
}

export default Loader