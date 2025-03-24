const Trial = () => {
  return (
    <div className=" relative ">
      <div className="z-[-5]">
        <img
          className="max-lg:h-[15rem]"
          src="/static/images/background.png"
          alt=""
        />
      </div>
      <div className="flex max-xl:flex-col h-full  xl:justify-between max-xl:items-center max-xl:justify-center xl:items-center absolute left-0 bottom-0 border-2 border-[#1F1F1F] w-full xl:px-[5%] max-xl:px-[2%] ">
        <div>
          <h3 className="sm:text-[2.3rem] max-xl:text-center max-sm:text-[1.8rem] font-bold">
            Start your free trial today!
          </h3>
          <p className="my-3 max-xl:text-center text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]">
            This is a clear and concise call to action that encourages users to
            sign up for a free trial of StreamVibe.
          </p>
        </div>
        <div>
          <button className="bg-[#E50000] 5s:p-[1rem] max-5s:p-[0.8rem] max-5s:text-[0.8rem] rounded-lg font-bold hover:bg-[#3a3a3a] focus:bg-[#3f3f3f] active:bg-[#3f3f3f] focus:outline-none focus:ring focus:ring-[#cac8c896]">
            Start a Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trial;
