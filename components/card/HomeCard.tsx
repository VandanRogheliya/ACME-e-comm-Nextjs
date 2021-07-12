const HomeCard = () => {
  return (
    <div>
      <div className="bg-pink-700">
        <div className="flex flex-grow-0 items-start ">
          <div className="flex-initial items-start bg-black">
            <h3 className="font-bold text-4xl text-white p-2 ">Name</h3>
            <div className="text-white p-4 font-bold text-2xl pb-2 ">$40</div>
          </div>
        </div>

        <img
          className="w-4/5 mx-auto h-auto "
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
        ></img>
      </div>
      <div className="bg-black">
        <div className="flex flex-grow-0 items-start ">
          <div className="flex-initial items-start bg-black">
            <h3 className="font-bold text-4xl text-white p-2 ">Name</h3>
            <div className="text-white p-4 font-bold text-2xl pb-2 ">$40</div>
          </div>
        </div>

        <img
          className="w-4/5 mx-auto h-auto "
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
        ></img>
      </div>
    </div>
  )
}
export default HomeCard
