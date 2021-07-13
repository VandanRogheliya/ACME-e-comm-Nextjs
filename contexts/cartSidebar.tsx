import CartSidebar from '@components/cart/CartSidebar'
import { createContext, useContext, useEffect, useState } from 'react'

type CartSidebarContextValueType = {
  setIsCartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CartSidebarContext = createContext<CartSidebarContextValueType>({
  setIsCartSidebarVisible: null,
})

export const CartSidebarProvider = ({ children }) => {
  const [isCartSidebarVisible, setIsCartSidebarVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = isCartSidebarVisible ? 'hidden' : 'auto'
  }, [isCartSidebarVisible])

  return (
    <CartSidebarContext.Provider value={{ setIsCartSidebarVisible }}>
      <div className="relative">
        {children}
        {isCartSidebarVisible && (
          <CartSidebar setIsOpen={setIsCartSidebarVisible} />
        )}
      </div>
    </CartSidebarContext.Provider>
  )
}

export const useCartSidebar = () => useContext(CartSidebarContext)
