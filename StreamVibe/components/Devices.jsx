const Devices = () => {
  let devices = [
    {
      id: 1,
      type: "Smartphones",
      img: "phone.svg",
    },
    {
      id: 2,
      type: "Tablet",
      img: "tablet.svg",
    },
    {
      id: 3,
      type: "Smart TV",
      img: "tv.svg",
    },
    {
      id: 4,
      type: "Laptops",
      img: "laptop.svg",
    },
    {
      id: 5,
      type: "Game Consoles",
      img: "game-console.svg",
    },
    {
      id: 6,
      type: "VR Headsets",
      img: "vr.svg",
    },
  ];

  return (
    <div className=" py-[5rem]">
      <div>
        <h1 className="sm:text-[2.3rem] max-sm:text-[1.8rem] font-bold">
          We Provide you streaming experience across various devices.
        </h1>
        <p className="my-3 text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]">
          With StreamVibe, you can enjoy your favorite movies and TV shows
          anytime, anywhere. Our platform is designed to be compatible with a
          wide range of devices, ensuring that you never miss a moment of
          entertainment.
        </p>
      </div>
      <div className="mt-[3rem]  grid xl:grid-cols-[repeat(auto-fit,minmax(500px,1fr))]  grid-rows-2 gap-4 max-xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] max-lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {devices.map((value) => {
          return (
            <div
              key={value.id}
              className="border-2 border-[#1F1F1F] py-[40px] px-[30px] bg-device-gradient"
            >
              <div className="flex items-center gap-5 py-[20px]">
                <span className="border-2 border-[#1F1F1F] bg-[#141414] p-2 rounded-lg flex justify-center items-center">
                  <img
                    src={`/static/images/devices/${value.img}`}
                    alt={`${value.type} img`}
                  />
                </span>
                <p className="font-extrabold text-[1.2rem] ">{value.type}</p>
              </div>
              <div>
                <p className="my-3 text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]">
                  StreamVibe is optimized for both Android and iOS smartphones.
                  Download our app from the Google Play Store or the Apple App
                  Store
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Devices;
