const Card = () => {
  return (
    <div className=" w-1/3 max-w-6xl mx-auto flex flex-row lg:flex-row-2 text-white">
      <div className="group bg-black ">
        <div className=" flex flex-col flex-initial items-start">
          <h3 className="font-bold text-2xl text-white p-2 bg-black group-hover:bg-purple-600">
            <span>Clothing </span>
          </h3>
          <div className="text-white p-4 font-bold text-xl group-hover:bg-purple-600 inline-block">
          
            $50 
          </div>
          <div className="w-10/12 mx-auto h-auto hover:w-11/12 cursor-pointer">
            <img
              src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
            ></img>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Card
