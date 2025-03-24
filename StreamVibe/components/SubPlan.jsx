import monthlyPricingData from "./monthlyPricingData";

const SubPlan = () => {
  return (
    <div className="my-[5rem]">
      <div>
        <h3 className="sm:text-[2.3rem] max-sm:text-[1.8rem] font-bold">
          Choose the plan that&apos;s right for you
        </h3>
        <p className="my-3 text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]">
          Join StreamVibe and select from our flexible subscription options
          tailored to suit your viewing preferences. Get ready for non-stop
          entertainment!
        </p>
      </div>
      <div className="grid xl:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-4 max-xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] max-lg:grid-cols-[repeat(auto-fit,minmax(370px,1fr))] max-5s:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] ">
        {monthlyPricingData.map((value, index) => {
          return (
            <div
              key={index}
              className="bg-[#1A1A1A] border-2 border-[#262626] rounded-lg p-[1.5rem]"
            >
              <div>
                <h1 className="font-extrabold text-[1.2rem]">{value.name}</h1>
              </div>
              <div className="my-3 text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem] mt-5">
                <p>{value.description}</p>
              </div>
              <div className="mt-6">
                <span className="text-[1.4rem] font-extrabold">
                  {value.price}{" "}
                  <span className="text-[0.9rem] text-[#999999] sm:text-[0.9rem] max-5s:text-[0.75rem]">
                    /month
                  </span>
                </span>
              </div>
              <div className="flex justify-center gap-5 mt-5">
                <button className="bg-[#141414] border-2 border-[#262626] 5s:p-[1rem] max-5s:p-[0.8rem] max-5s:text-[0.8rem] rounded-lg font-bold hover:bg-[#3a3a3a] focus:bg-[#3f3f3f] active:bg-[#3f3f3f] focus:outline-none focus:ring focus:ring-[#cac8c896]">
                  Start Free Trial
                </button>
                <button className="bg-[#E50000] 5s:p-[1rem] max-5s:p-[0.8rem] max-5s:text-[0.8rem] rounded-lg font-bold hover:bg-[#3a3a3a] focus:bg-[#3f3f3f] active:bg-[#3f3f3f] focus:outline-none focus:ring focus:ring-[#cac8c896]">
                  Choose Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubPlan;
