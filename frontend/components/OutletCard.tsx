import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import linkCase from "../utils/linkCase";

const OutletCard: FC<{item: any}> = ({item}) => {
  return (
    <div className="xl:h-[24rem] lg:h-[22rem] h-[16rem] rounded-lg flex flex-col lg:space-y-6 space-y-2 lg:mx-3 mx-2 lg:hover:translate-y-1 transition-all duration-300">
        <Link className="h-3/4" href={linkCase(item.Name)}><Image width={1000} height={1000} src={item.Cover.data.attributes.url} alt="" className="h-full rounded-lg overflow-hidden" /></Link>
        <div className="h-max lg:space-y-2 space-y-[0.2rem]">
            <h2 className="lg:text-xl text-lg font-fontBold">{item.Name}</h2>
            <Link href={linkCase(item.Name)} className="flex w-max lg:text-xs text-[0.6rem] space-x-1 items-center hover:opacity-80">
                <span className="font-fontRegular text-secondary">Explore Outlet</span>
                <img src="/statics/ArrowUpRight.svg" alt="" className="lg:h-5 h-4"/>
            </Link>
        </div>
    </div>
  )
}

export default OutletCard;