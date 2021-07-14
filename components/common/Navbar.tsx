import Logo from '@components/common/Logo'
import Link from 'next/link'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useState } from 'react'
import { handleLogin } from '@lib/util/common'
import { useAuth } from 'contexts/auth'
import firebase from '@lib/firebase'
import MenuIcon from '@material-ui/icons/Menu'

const Navbar = () => {
  const [active, setActive] = useState(false)

  const toggleHamburgerMenu = () => setActive(!active)

  const { user, isLoading } = useAuth()
  const logout = () => firebase.auth().signOut()
  return (
    <nav className="flex items-center justify-between flex-wrap  bg-black py-4 lg:px-12 shadow border-solid border-t-2">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 pb-5 lg:pb-0">
        <div className="flex items-center flex-shrink-0 text-white mr-16">
          <Logo />
          <span className="font-semibold text-xl tracking-tight font">
            Acme
          </span>
        </div>

        {/* hamburger button */}
        <div className=" lg:hidden flex space-x-5">
          <div className=" lg:hidden">
            <Link href="/">
              <ShoppingCartIcon className="text-white" />
            </Link>
          </div>
          <button
            onClick={toggleHamburgerMenu}
            id="nav"
            className="flex items-center px-3 py-2 border-2 rounded text-white  hover:text-opacity-50"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div
        className={`${
          active ? '' : 'hidden'
        } menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8`}
      >
        <div className="text-md font-bold text-white lg:flex-grow">
          <Link href="/all">
            <a className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:text-opacity-50 mr-2">
              All
            </a>
          </Link>
        </div>

        {/* <div className="relative mx-auto text-gray-600 lg:block hidden">
          <input
            className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          ></input>
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div> */}
        {!isLoading && user == null && (
          <div>
            <button
              onClick={handleLogin}
              className="block w-full text-left text-md px-2 py-2 rounded text-white ml-2 font-bold hover:text-white mt-4 hover:text-opacity-50 lg:mt-0"
            >
              Login
            </button>
          </div>
        )}
        {user != null && (
          <div>
            <button
              onClick={logout}
              className="block w-full text-left text-md px-2 py-2 rounded text-white ml-2 font-bold hover:text-white mt-4 hover:text-opacity-50 lg:mt-0"
            >
              Logout
            </button>
          </div>
        )}
        <Link href="/">
          <div className={`${active ? 'hidden' : ''} text-white`}>
            {' '}
            <ShoppingCartIcon />{' '}
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
