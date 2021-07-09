const HomeCard = () => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-3">
      <div className="col-span-3 lg:col-span-2 lg:row-span-3 bg-black">
        <img
          className="w-11/12 mx-auto h-auto"
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
        ></img>
      </div>
      <div className=" col-span-3 lg:col-span-1 lg:row-span-2 bg-gray-100">
        <img
          className="w-100 h-auto"
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
        ></img>
      </div>
      <div className="col-span-3 lg:col-span-1 lg:row-span-1 bg-purple-800">
        <img
          className="w-100 h-auto"
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
        ></img>
      </div>
    </div>
  )
}
export default HomeCard
