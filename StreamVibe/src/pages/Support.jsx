import Trial from "../../components/Trial";
import Footer from "../../components/Footer";

const Support = ({ moviesData }) => {
  const movieImg = moviesData.map((value) => value.poster_path);

  return (
    <div className="sm:px-[5%] max-sm:px-[15px]">
      <div className="h-[15vh] "></div>
      <div className="2xl:grid 2xl:grid-cols-[40%_60%] 2xl:h-[80vh] 2xl:overflow-hidden">
        <div className="">
          <div className="bg-[#141414]">
            <div className="pb-[3rem]">
              <h1 className="5s:text-[2rem] sm:text-[2.5rem] max-5s:text-[1rem] font-extrabold">
                Welcome to our support page!
              </h1>
              <p className="mt-3 max-5s:text-[0.8rem] text-[#999999]">
                We&apos;re here to help you with any problems you may be having
                with our product.
              </p>
            </div>
            <div className="border-[10px] max-2xl:h-[60vh] max-2xl:overflow-hidden  border-[#1F1F1F] top-[80px] left-0 right-0 bottom-0  gap-5 2xl:h-max rounded-2xl grid 2xl:grid-cols-[repeat(auto-fit,minmax(130px,1fr))] max-2xl:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] z-[-1]  ">
              {movieImg.map((value, index) => (
                <div key={index} className="">
                  <img
                    className="rounded-2xl"
                    src={`https://image.tmdb.org/t/p/w500${value}`}
                    alt="img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-2 border-[#1F1F1F] mx-[5%] pt-[2rem] max-2xl:mt-[5rem] ">
          <form action="#" method="post" className="mx-[5%]">
            <fieldset className="max-md:flex max-md:flex-col ">
              <span className="inline-flex flex-col 2xl:w-[40%] mr-5 mb-[3rem]">
                <label
                  className="text-[1.2rem] mb-[10px] font-extrabold"
                  id="first-name"
                >
                  First Name
                </label>
                <input
                  className="py-[20px] pl-4 bg-transparent border-2 border-[#1F1F1F] rounded-xl"
                  placeholder="Enter First Name"
                  type="text"
                  htmlFor="first-name"
                  name="name"
                  required
                ></input>
              </span>

              <span className="inline-flex flex-col 2xl:w-[40%] mr-5 mb-[3rem]">
                <label
                  className="text-[1.2rem] mb-[10px] font-extrabold"
                  id="second-name"
                >
                  Second Name
                </label>
                <input
                  className="py-[20px]  pl-4 bg-transparent border-2 border-[#1F1F1F] rounded-xl"
                  placeholder="Enter second Name"
                  type="text"
                  htmlFor="second-name"
                  name="name"
                  required
                ></input>
              </span>
            </fieldset>
            <fieldset className="max-md:flex max-md:flex-col">
              <span className="inline-flex flex-col 2xl:w-[40%] mr-5 mb-[3rem]">
                <label
                  className="text-[1.2rem] mb-[10px] font-extrabold"
                  id="email"
                >
                  Email
                </label>
                <input
                  className="py-[20px]  pl-4 bg-transparent border-2 border-[#1F1F1F] rounded-xl"
                  placeholder="Enter Your Email"
                  type="email"
                  htmlFor="email"
                  name="email"
                  required
                ></input>
              </span>

              <span className="inline-flex flex-col w-[40%] mr-5 mb-[3rem]">
                <label
                  className="text-[1.2rem] mb-[10px] font-extrabold"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="py-[20px]  pl-4 bg-transparent border-2 border-[#1F1F1F] rounded-xl"
                  placeholder="Enter Your Phone Number"
                  type="phone"
                  htmlFor="phone"
                  name="phone"
                  required
                ></input>
              </span>
            </fieldset>
            <fieldset className="inline-flex flex-col  mr-5 mb-[3rem] w-[80%]">
              <label
                className="text-[1.2rem] mb-[10px] font-extrabold"
                htmlFor="message"
              >
                Message Us
              </label>
              <textarea
                className="py-[20px]  pl-4 bg-transparent border-2 border-[#1F1F1F] rounded-xl"
                name="message"
                id="message"
              ></textarea>
            </fieldset>
            <fieldset className="flex items-center justify-between">
              <span className="mr-5  flex items-center">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="mr-5"
                />
                <label
                  htmlFor="terms"
                  className="max-5s:text-[0.8rem] text-[#999999] "
                >
                  I agree with Terms of Use and Privacy Policy
                </label>
              </span>
              <button className="flex gap-3 bg-[#E50000] normal-case hover:bg-[#3a3a3a] focus:bg-[#3f3f3f] active:bg-[#3f3f3f] focus:outline-none focus:ring focus:ring-[#cac8c896] max-sm:px-[2rem] max-sm:py-[1rem] rounded-lg  sm:px-[3rem] sm:py-[1.3rem] max-5s:px-[1rem] max-5s:py-[0.5rem] max-5s:text-[0.9rem] max-5s:mt-[10px] 5s:mt-8">
                Send Message
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="py-[5rem] mt-[5rem]">
        <Trial />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Support;
