import SubPlan from "../../components/SubPlan";
import SubTable from "../../components/SubTable";
import Trial from "../../components/Trial";
import Footer from "../../components/Footer";

const Subscriptions = () => {
  return (
    <div className="">
      <div className="h-[15vh]"></div>
      <div className="sm:px-[5%] max-sm:px-[15px]">
        <SubPlan />
      </div>
      <div className="mt-5rem sm:px-[5%] max-sm:px-[15px]">
        <SubTable />
      </div>
      <div className="mt-[7rem] sm:px-[5%] max-sm:px-[15px]">
        <Trial />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Subscriptions;
