import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import titleCase from "../utils/titleCase";
import Form from "./Form";

const OutletHero: FC<{branches: any, opening: any, branchName?: string}> = ({branches, opening}) => {
  const [form, setForm] = useState<boolean>(false);
  const [branch, setBranch] = useState<any>();
  const { query } = useRouter();

  useEffect(() => {
    if(query.branch) setBranch(branches.find((x: any) => x.attributes.Name === titleCase((String)(query.branch))).attributes);
  }, [query.branch]);

  return (
    <div className="bg-primary h-screen lg:pt-16 pt-18 text-tertiary xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs lg:snap-center snap-none">
      {branch && branch.Backdrop.data ? <img src={branch.Backdrop.data.attributes.url} alt="" className="w-full object-cover left-0 absolute h-[60%] opacity-40"/> : <img src="/template.png" alt="" className="w-full object-cover left-0 absolute h-[60%] opacity-40"/>}
      <div className="flex items-center lg:pt-0 pt-80 w-full justify-between z-10 relative">
        <div className="font-fontRegular lg:text-4xl text-2xl flex flex-col space-y-3">
          {branch && <h1><span className="font-fontBold">The BBQ Company,</span> {branch.Name}</h1>}
          <div className="flex space-x-1 items-center relative">
            <img src="/statics/StarFill.svg" alt="" className="h-5"/>
            <img src="/statics/StarFill.svg" alt="" className="h-5"/>
            <img src="/statics/StarFill.svg" alt="" className="h-5"/>
            <img src="/statics/StarFill.svg" alt="" className="h-5"/>
            <img src="/statics/Star.svg" alt="" className="h-5"/>
            <span className="font-fontLight pl-3 lg:text-base text-sm">4.2/5 </span>
          </div>
          <div className="flex space-x-3 pt-4">
            {branch && <Link href={branch.Google_Maps} className={`flex lg:space-x-3 space-x-1 text-tertiary items-center lg:h-10 h-9 bg-secondary rounded-full outline outline-tertiary hover:shadow-tertiary lg:px-6 px-3 active:shadow-none hover:shadow-md transition-all duration-300`}>
              <span className="font-fontSemi lg:text-sm text-xs">Get Directions</span>
              <img src="/statics/MapPinLineWhite.svg" alt="" className="lg:h-5 h-4"/>
            </Link>}
            {branch && <Link href={`tel:${branch.Contact}`} className={`flex lg:space-x-3 space-x-1 text-tertiary items-center lg:h-10 h-9 bg-transparent rounded-full outline outline-secondary hover:shadow-secondary lg:px-6 px-3 active:shadow-none hover:shadow-md transition-all duration-300`}>
              <span className="font-fontSemi lg:text-sm text-xs text-secondary">Call</span>
              <img src="/statics/Phone.svg" alt="" className="lg:h-5 h-4"/>
            </Link>}
          </div>
        </div>
        {branch && <Form branches={branches} show={form} setShow={setForm}/>}
        {!form && <button onClick={() => setForm(!form)} className={`fixed lg:hidden right-8 bottom-8 z-10 flex text-tertiary items-center h-9 bg-secondary rounded-full outline px-4 active:mb-0 active:shadow-none hover:mb-1 hover:shadow-md transition-all duration-300`}>
          <span className="font-fontSemi text-sm">Reserve Table</span>
        </button>}
      </div>
      <div className="lg:-mt-[12rem] mt-32 lg:w-3/4 w-full lg:space-y-8 space-y-4">
        <h3 className="font-fontBold lg:text-2xl text-lg">Overview</h3>
        <div className="grid 2xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-3 lg:space-y-3 sm:space-y-0 space-y-4 lg:justify-items-start sm:justify-items-center justify-items-start">
          <div className="2xl:w-full lg:w-1/2">
            <h3 className="flex items-center font-fontSemi"><img src="/statics/MapPinLine.svg" alt="" className="h-4 pr-2" /> Address</h3>
            {branch && <h2 className="ml-6 font-fontRegular lg:text-sm text-xs">{branch.Address}</h2>}
          </div>
          <div>
            <h3 className="flex 2xl:-mt-3 mt-0 items-center font-fontSemi"><img src="/statics/Phone.svg" alt="" className="h-4 pr-2" /> Restaurant Info</h3>
            {branch && <h2 className="ml-6 font-fontRegular lg:text-sm text-xs">{branch.Email} <br /> {query.branch === "dubai" ? "(+97)" : "(+91)"} {branch.Whatsapp}</h2>}
          </div>
          <div>
            <h3 className="flex items-center font-fontSemi"><img src="/statics/Clock.svg" alt="" className="h-4 pr-2" /> Opening Hours</h3>
            <h2 className="ml-6 whitespace-pre-line font-fontRegular lg:text-sm text-xs">{opening}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutletHero;