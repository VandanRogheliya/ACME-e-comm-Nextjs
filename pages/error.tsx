import Link from 'next/link'

const Error = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-black text-white px-5 space-y-10">
    <h1 className="text-5xl text-center">Sorry, Something went wrong.</h1>
    <Link href="/">
      <a className="bg-white text-black py-5 duration-150 border lg:self-center px-16 hover:bg-gray-400 mt-5 lg:mt-20">
        Go to home
      </a>
    </Link>
  </div>
)

export default Error
