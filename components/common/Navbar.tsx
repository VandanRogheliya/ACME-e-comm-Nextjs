import Logo from '@components/common/Logo'
import Link from 'next/link'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useState } from 'react'
import { handleLogin } from '@lib/util/common'
import { useAuth } from 'contexts/auth'
import firebase from '@lib/firebase'
import MenuIcon from '@material-ui/icons/Menu'
import { useCartSidebar } from 'contexts/cartSidebar'

const Navbar = () => {
  const [isHamburgerActive, setActive] = useState(false)
  const { setIsCartSidebarVisible } = useCartSidebar()

  const toggleHamburgerMenu = () => setActive(!isHamburgerActive)

  const { user, isLoading } = useAuth()
  const logout = () => firebase.auth().signOut()

  return (
    <nav className="flex items-center justify-between flex-wrap bg-black py-4 px-5 lg:px-12 shadow border-solid">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pr-0 lg:pr-2 border-solid">
        <Link href="/">
          <a className="flex items-center flex-shrink-0 text-white mr-16">
            <Logo />
            <span className="font-semibold text-xl tracking-tight font">
              Acme
            </span>
          </a>
        </Link>
        <div className=" lg:hidden flex items-center space-x-5">
          {user && (
            <div className=" lg:hidden">
              <ShoppingCartIcon
                className="text-white"
                onClick={() => setIsCartSidebarVisible(true)}
              />
            </div>
          )}
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
          isHamburgerActive ? 'max-h-32' : 'max-h-0 lg:max-h-32'
        } transition-all overflow-hidden duration-500 menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3`}
      >
        <div className="text-md font-bold text-white lg:flex-grow">
          <Link href="/all">
            <a className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:text-opacity-50 mr-2">
              All products
            </a>
          </Link>
        </div>
        {!isLoading && user == null && (
          <div>
            <button
              onClick={handleLogin}
              className="block w-full text-left text-md px-2 py-2 rounded text-white ml-2 font-bold mt-4 hover:text-opacity-50 lg:mt-0"
            >
              Login
            </button>
          </div>
        )}
        {user && (
          <div>
            <button
              onClick={logout}
              className="block w-full text-left text-md px-2 py-2 rounded text-white ml-2 font-bold mt-4 hover:text-opacity-50 lg:mt-0"
            >
              Logout
            </button>
          </div>
        )}
        {user && (
          <div className="hidden lg:block text-white cursor-pointer ml-5 hover:text-opacity-50">
            <ShoppingCartIcon onClick={() => setIsCartSidebarVisible(true)} />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
