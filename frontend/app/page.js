import Link from 'next/link'
import CustomButton from '../components/custom-button'
import FadeWrapper from '../components/fade-wrapper'
export default function Home() {
  return (
    <FadeWrapper>
      <div className="space-y-16">
        <section className="text-center py-20 bg-gradient-to-br from-red-400 via-red-600 to-red-300 text-white rounded-lg">
          <h1 className="text-5xl font-bold mb-6">Welcome to Book Exchange</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover, share, and exchange books with fellow readers. Join our community of book lovers today!
        </p>
        <div className="space-x-4">
          <CustomButton href="/register" variant="t1" size="lg">
            Get Started
          </CustomButton>
          <CustomButton href="/books" variant="t2" size="lg">
            Browse Books
          </CustomButton>
        </div>
      </section>

      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
            <p className="text-gray-600">Sign up and create your profile to start exchanging books.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">List Your Books</h3>
            <p className="text-gray-600">Add books you want to exchange to your collection.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Start Exchanging</h3>
            <p className="text-gray-600">Connect with other readers and exchange books.</p>
          </div>
        </div>
      </section>
    </div>
    </FadeWrapper>
  )
}
