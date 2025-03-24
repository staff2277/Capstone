const GridText = () => {
  return (
    <div className="text-center">
      <div className="">
        <div className="5s:text-[2rem] sm:text-[2.5rem] max-5s:text-[1rem] font-extrabold">
          The Best Streaming Experience
        </div>
        <p className="mt-5 max-5s:text-[0.8rem] text-[#999999] lg:px-[20%]">
          StreamVibe is the best streaming experience for watching your favorite
          movies and shows on demand, anytime, anywhere.
          <span className="max-md:hidden">
            With StreamVibe, you can enjoy a wide variety of content, including
            the latest blockbusters, classic movies, popular TV shows, and more.
            You can also create your own watchlists, so you can easily find the
            content you want to watch.
          </span>
        </p>
        <div className="flex justify-center">
          <button className="flex gap-3 bg-[#E50000] normal-case hover:bg-[#3a3a3a] focus:bg-[#3f3f3f] active:bg-[#3f3f3f] focus:outline-none focus:ring focus:ring-[#cac8c896] max-sm:px-[2rem] max-sm:py-[1rem] rounded-lg  sm:px-[3rem] sm:py-[1.3rem] max-5s:px-[1rem] max-5s:py-[0.5rem] max-5s:text-[0.9rem] max-5s:mt-[10px] 5s:mt-8">
            <img src="/static/play.svg" alt="play-icon" />
            Start Watching Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridText;
