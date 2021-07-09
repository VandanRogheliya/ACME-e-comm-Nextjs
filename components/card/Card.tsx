const Card = () => {
  return (
    <div className="flex flex-row lg:flex-row-2 text-white">
      <div className="group bg-black ">
        <div className="flex flex-col flex-initial items-start">
          <div className="text-white p-0 bg-black group-hover:bg-purple-600">
            Clothing
          </div>
          <div className="text-white p-0 ">
            <span className="bg-black px-1 pt-0 group-hover:bg-purple-600 group-hover:border group-hover:border-purple-600 ">
              $50
            </span>
          </div>
          <img
            className="w-100 h-auto"
            src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
          ></img>
        </div>
      </div>
      <div className="group bg-black ">
        <div className="flex flex-col flex-initial group-hover:bg-purple-600">
          <div className="text-white p-0">Clothing</div>
          <div className="text-white p-0">$50</div>
          <img
            className="w-100 h-auto"
            src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
          ></img>
        </div>
      </div>
      <div className="group bg-black ">
        <div className="flex flex-col flex-initial group-hover:bg-purple-600">
          <div className="text-white p-0">Clothing</div>
          <div className="text-white p-0">$50</div>
          <img
            className="w-100 h-auto"
            src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
          ></img>
        </div>
      </div>
    </div>
  )
}

export default Card
