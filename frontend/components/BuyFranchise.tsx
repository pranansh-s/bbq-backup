import { FC, useState } from "react";
import FranchiseForm from "./FranchiseForm";

const BuyFranchise: FC = () => {
  const [franchise, setFranchise] = useState<boolean>(false);
  return (
    <div className="h-screen bg-primary lg:snap-center snap-none text-tertiary xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs flex flex-col justify-center space-y-8">
        <div className="flex items-center justify-between w-full">
            <ul className="font-fontRegular lg:text-base text-sm h-full flex flex-col lg:w-1/2 w-full justify-center space-y-2">
                <h2 className="lg:text-3xl text-xl mt-0 text-left text-secondary font-fontSemi py-10">Here is your chance to take our Barbeque stories and memories to multiple cities and people:</h2>
                <li><h3 className="text-secondary inline-block">Head Office Located:</h3> Delhi, India</li>
                <li><h3 className="text-secondary inline-block">Year the Brand was founded in:</h3> 2015</li>
                <li><h3 className="text-secondary inline-block">Number of Outlet:</h3> 12</li>
                <li><h3 className="text-secondary inline-block">Training and Support:</h3>  Yes</li>
                <li><h3 className="text-secondary inline-block">Payback Period (Years):</h3>  1.5 - 2.0 Years</li>
                <li><h3 className="text-secondary inline-block">Expansion Locations:</h3>  India</li>
                <li><h3 className="text-secondary inline-block">Monthly Royalties (%):</h3>  7</li>
                <li><h3 className="text-secondary inline-block">Area Requirement:</h3>  3000 - 4000 Sq. Ft.</li>
                <li><h3 className="text-secondary inline-block">Agreement Terms (Years):</h3>  9</li>
                <li><h3 className="text-secondary inline-block">Capital Investment:</h3>  1.5 - 1.75* CR</li>
            </ul>
            <FranchiseForm show={franchise} setShow={setFranchise}/>
        </div>
        {!franchise && <button onClick={() => setFranchise(!franchise)} className={`fixed lg:hidden right-5 bottom-5 z-10 flex text-tertiary items-center h-9 bg-secondary rounded-full outline px-4 active:mb-0 active:shadow-none hover:mb-1 hover:shadow-md transition-all duration-300`}>
            <span className="font-fontSemi text-xs">Buy Franchise</span>
        </button>}
    </div>
  )
}

export default BuyFranchise;