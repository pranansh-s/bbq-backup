import { FC } from "react"
import PriceCard from "./PriceCard"

const PricesList: FC<{branches: any}> = ({branches}) => {
  return (
    <div className="h-max bg-primary font-fontRegular lg:py-24 py-16 items space-y-28 xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs text-tertiary" id="prices">
        <label className="font-fontLight italic text-xs ml-3">*All prices are exclusive of GST.</label>
        {branches.map((branch: any, index: number) => !branch.attributes.ComingSoon && <PriceCard key={index} item={branch.attributes}/>)}
    </div>
  )
}

export default PricesList
