import clsx from "clsx";
import { useState } from "react";

const SubTable = () => {
  const [basic, setBasic] = useState(true);
  const [standard, setStandard] = useState(false);
  const [premium, setPremium] = useState(false);

  return (
    <div>
      <div>
        <div>
          <div>
            <h2 className="5s:text-[2rem] sm:text-[2.5rem] max-5s:text-[1rem] font-extrabold">
              Compare our plans and find the right one for you
            </h2>
          </div>
          <p className="my-3 text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]">
            StreamVibe offers three different plans to fit your needs: Basic,
            Standard, and Premium. Compare the features of each plan and choose
            the one that&apos;s right for you.
          </p>
        </div>
        <div className="flex justify-center gap-1 lg:hidden">
          <button
            onClick={() => {
              setBasic(true);
              setStandard(false);
              setPremium(false);
            }}
            className={clsx({
              "flex items-center gap-3 bg-[#2c2c2c] normal-case max-sm:px-[1.5rem] max-sm:py-[0.8rem] rounded-lg  sm:px-[2rem] sm:py-[1rem] max-5s:px-[0.8rem] max-5s:py-[0.5rem] max-5s:text-[0.9rem] max-5s:mt-[10px] 5s:mt-8": true,
              "bg-blue-700": basic,
            })}
          >
            Basic
          </button>
          <button
            onClick={() => {
              setBasic(false);
              setStandard(true);
              setPremium(false);
            }}
            className={clsx({
              "flex items-center gap-3 bg-[#2c2c2c] normal-case max-sm:px-[1.5rem] max-sm:py-[0.8rem] rounded-lg  sm:px-[2rem] sm:py-[1rem] max-5s:px-[0.8rem] max-5s:py-[0.5rem] max-5s:text-[0.9rem] max-5s:mt-[10px] 5s:mt-8": true,
              "bg-blue-700": standard,
            })}
          >
            Standard
          </button>
          <button
            onClick={() => {
              setBasic(false);
              setStandard(false);
              setPremium(true);
            }}
            className={clsx({
              "flex items-center gap-3 bg-[#2c2c2c] normal-case max-sm:px-[1.5rem] max-sm:py-[0.8rem] rounded-lg  sm:px-[2rem] sm:py-[1rem] max-5s:px-[0.8rem] max-5s:py-[0.5rem] max-5s:text-[0.9rem] max-5s:mt-[10px] 5s:mt-8": true,
              "bg-blue-700": premium,
            })}
          >
            Premium
          </button>
        </div>

        <div className="h-full flex mt-[2rem]">
          <div className="*:border-[1px] *:px-5 *:border-[#1F1F1F] grid grid-rows-[repeat(10,90px)] *:flex *:items-center text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]">
            <div className="bg-[#0F0F0F] text-white font-extrabold">
              Features
            </div>
            <div>Price</div>
            <div>Content</div>
            <div>Devices</div>
            <div>Free Trail</div>
            <div>Cancel Anytime</div>
            <div>HDR</div>
            <div>Dolby Atmos</div>
            <div>Ad - Free</div>
            <div>Offline Viewing</div>
            <div>Family Sharing</div>
          </div>
          <div
            className={clsx({
              "*:border-[1px] *:px-5 *:border-[#1F1F1F] grid grid-rows-[repeat(10,90px)] *:flex *:items-center text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]": true,
              "max-lg:hidden": !basic,
            })}
          >
            <div className="bg-[#0F0F0F] text-white font-extrabold">Basic</div>
            <div>$9.99/Month</div>
            <div>
              Access to a wide selection of movies and shows, including some new
              releases.
            </div>
            <div>Watch on one device simultaneously</div>
            <div>7 Days</div>
            <div>Yes</div>
            <div>No</div>
            <div>No</div>
            <div>No</div>
            <div>No</div>
            <div>No</div>
          </div>
          <div
            className={clsx({
              "*:border-[1px]  *:px-5 *:border-[#1F1F1F] grid grid-rows-[repeat(10,90px)] *:flex *:items-center text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]": true,
              "max-lg:hidden border-[#1F1F1F]": !standard,
            })}
          >
            <div className="bg-[#0F0F0F] text-white font-extrabold">
              Standard
            </div>
            <div>$12.99/Month</div>
            <div>
              Access to a wider selection of movies and shows, including most
              new releases and exclusive content
            </div>
            <div>Watch on Two device simultaneously</div>
            <div>7 Days</div>
            <div>Yes</div>
            <div>Yes</div>
            <div>Yes</div>
            <div>Yes</div>
            <div>Yes, for select titles.</div>
            <div>Yes, up to 5 family members.</div>
          </div>
          <div
            className={clsx({
              "*:border-[1px] *:px-5 *:border-[#1F1F1F] grid grid-rows-[repeat(10,90px)] *:flex *:items-center text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]": true,
              "max-lg:hidden border-[#1F1F1F]": !premium,
            })}
          >
            <div className="bg-[#0F0F0F] text-white font-extrabold">
              Premium
            </div>
            <div>$14.99/Month</div>
            <div>
              Access to a widest selection of movies and shows, including all
              new releases and Offline Viewing
            </div>
            <div>Watch on Four device simultaneously</div>
            <div>7 Days</div>
            <div>Yes</div>
            <div>Yes</div>
            <div>Yes</div>
            <div>Yes</div>
            <div>Yes, for all titles.</div>
            <div>Yes, up to 6 family members.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTable;
