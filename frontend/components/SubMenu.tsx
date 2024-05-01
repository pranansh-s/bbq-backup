import Link from "next/link";
import { FC } from "react"
import linkCase from "../utils/linkCase";

const SubMenu: FC<{top: boolean, branches: any}> = ({top, branches}) => {
  return (
    <div className={`flex flex-col absolute lg:top-[5.5rem] top-[3.75rem] ${top ? 'bg-primary text-tertiary' : 'bg-tertiary text-primary'} text-left font-fontSemi rounded-sm w-max inline-block pr-12`}>
        {branches.map((branch: any, index: number) => 
            <Link key={index} href={linkCase(branch.attributes.Name)} className="p-3 hover:border-y-2 border-secondary transition-all duration-150 flex items-center justify-between w-[calc(100%+3rem)]">
              <span>{branch.attributes.Name}</span>
              {branch.attributes.New && <span className="text-xs text-secondary opacity-70 outline outline-1 outline-secondary rounded-full px-2 py-1">New</span>}
              {branch.attributes.ComingSoon && <span className="text-xs text-secondary opacity-70">Coming Soon</span>}
            </Link>
        )}
    </div>
  )
}

export default SubMenu;