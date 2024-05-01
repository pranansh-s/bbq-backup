import { FC } from "react"
import OutletCard from "./OutletCard";

const OutletsList: FC<{branches: any}> = ({branches}) => {
  return (
    <div className="h-max bg-primary lg:py-48 py-16 grid items xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-y-20 gap-y-16 xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs text-tertiary" id="outlets">
        {branches.map((branch: any, index: number) => <OutletCard key={index} item={branch.attributes}/>)}
    </div>
  )
}

export default OutletsList;