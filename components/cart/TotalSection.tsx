type Props = {
  total: number
  handleCheckout: () => Promise<void>
}

const TotalSection = ({ total, handleCheckout }: Props) => {
  return (
    <div className="flex flex-col text-gray-300 text-sm space-y-3 border-t p-5 w-5/6 lg:w-1/3 bg-black fixed bottom-0">
      <div className="flex items-center justify-between">
        <p>Subtotal</p>
        <p>${total}</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Shipping</p>
        <p>FREE</p>
      </div>
      <div className="w-full border h-0 border-gray-800" />
      <div className="flex items-center justify-between">
        <p>Total</p>
        <p>${total}</p>
      </div>
      <button
        className="bg-white text-black py-5 duration-150 border hover:bg-gray-400"
        onClick={handleCheckout}
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  )
}

export default TotalSection
