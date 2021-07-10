const HomeCard = () => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-3">
      <div className="col-span-3 lg:col-span-2 lg:row-span-3 bg-purple-600">
        <div className="flex ">
          <div className="flex-initial items-start bg-black">
            <h3 className="font-bold text-4xl text-white p-2 ">
              Name
            </h3>
            <div className="text-white p-4 font-bold text-2xl pb-2 ">
              $40
            </div>
          </div>
        </div>
        <img
          className="w-11/12 mx-auto h-auto "
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
        ></img>
      </div>

      <div className=" group col-span-3 lg:col-span-1 lg:row-span-2 bg-gray-100">
        <div className="flex ">
          <div className="flex-initial items-start bg-black">
            <h3 className="font-bold text-4xl text- p-2 text-white">
              Name
            </h3>
            <div className="text-white p-4 font-bold text-2xl pb-2 ">
              $40
            </div>
          </div>
        </div>

        <img
          className="w-100 h-auto"
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
        ></img>
      </div>
      <div className=" group col-span-3 lg:col-span-1 lg:row-span-1 bg-pink-400">
        <div className="flex ">
          <div className="flex-initial items-start bg-black">
            <h3 className="font-bold text-4xl text-white p-2 ">
              Name
            </h3>
            <div className="text-white p-4 font-bold text-2xl pb-2 ">
              $40
            </div>
          </div>
        </div>

        <img
          className="w-100 h-auto"
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
        ></img>
      </div>
    </div>
  )
    }
    export default HomeCard
    
     