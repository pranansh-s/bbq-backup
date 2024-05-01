import Link from "next/link";
import { FC } from "react"
import LimitedOutlets from "./LimitedOutlets";

const Explore: FC<{branches: any}> = ({branches}) => {
  return (
    <div className="h-max bg-primary flex flex-col items-center justify-between relative xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs font-fontRegular text-tertiary">
        <div className="flex lg:flex-row flex-col mt-navbar w-full justify-between lg:pt-navbar pt-0 lg:space-y-0 space-y-10">
            <div className="flex flex-col justify-center xl:ml-0 lg:-ml-12 ml-0 xl:w-1/4 lg:w-1/3 w-full lg:h-full h-max lg:space-y-0 space-y-4">
                <h2 className="lg:text-6xl text-4xl lg:mb-6 mb-2 whitespace-nowrap font-fontBold lg:leading-[1.2] leading-[1.2]">Explore our<br />Outlets</h2>
                <h3 className="font-fontLight lg:text-base text-sm lg:pb-12 pb-0">Craving for juicy and tender BBQ meats? Visit our dine-in restaurant and savor our slow-cooked specialties, paired with our mouth-watering sauces and sides. You won&apos;t regret it!</h3>
                <Link href="/branches" className="flex w-max lg:space-x-3 space-x-1 items-center mr-1 lg:ml-1 ml-auto lg:h-10 h-9 bg-transparent rounded-full outline outline-secondary lg:px-8 px-6 hover:bg-secondary group transition-all duration-300">
                    <span className="font-fontSemi lg:text-sm text-xs">Show All</span>
                    <img src="/statics/ArrowSquareOut.svg" alt="" className="lg:h-5 h-4 group-hover:fill-tertiary"/>
                </Link>
            </div>
            <LimitedOutlets branches={branches}/>
        </div>
        <div className="w-screen mt-16 flex flex-col lg:h-24 h-12 items-center">
            <span className="lg:px-margin-base sm:px-margin-sm px-margin-xs text-center lg:text-sm text-xs">Discover our authentic BBQ joints and savor smoky meats and sides nationwide!</span>
            <div className="border-b-[0.5px] border-secondary w-full h-0 bottom-0 absolute"/>
        </div>
    </div>
  )
}

export default Explore;