import Link from "next/link";
import { FC, useEffect, useState } from "react";
import linkCase from "../utils/linkCase";

const Footer: FC = () => {
  const [branches, setBranches] = useState<any>([]);

  useEffect(() => {
    const fetchParams = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          query: 
          `{
            branches(pagination: { limit: 100 }) { 
              data {
                attributes {
                  Name
                }
              }
            }
          }`
        })
      }
  
      fetch(`${process.env.NEXT_PUBLIC_CMS_PANEL}/graphql`, fetchParams)
        .then((res) => res.json())
        .then((res) => setBranches(res.data.branches.data));
  }, []);
  return (
    <div className="h-max bg-primary lg:px-margin-xl md:px-margin-sm px-margin-xs py-24 border-secondary border-t-[1px] text-tertiary flex justify-center relative">
        <div className="flex flex-col h-max items-start md:space-y-3 space-y-6">
            <img src="/statics/footerLogo.svg" alt="" className="lg:h-48 md:h-36 h-32" />
            <h3 className="w-64 lg:text-sm text-xs font-fontLight">The BBQ Company is a true barbecue restaurant where food is grilled and serve freshly straight to your plate.</h3>
            <div className="flex space-x-5">
                <Link href="https://www.facebook.com/TBBQCompany/"><img src="/statics/Facebook.svg" alt="" className="md:h-5 h-4 cursor-pointer" /></Link>
                <Link href="https://twitter.com/TBBQCompany"><img src="/statics/Twitter.svg" alt="" className="md:h-5 h-4 cursor-pointer" /></Link>
                <Link href="https://www.instagram.com/the_barbeque_company/"><img src="/statics/Instagram.svg" alt="" className="md:h-5 h-4 cursor-pointer" /></Link>
                <Link href="https://www.linkedin.com/company/thebarbequecompany"><img src="/statics/LinkedIn.svg" alt="" className="md:h-5 h-4 cursor-pointer" /></Link>
            </div>
        </div>
        <div className="flex flex-col w-max mt-3">
            <div className="flex md:text-lg sm:text-base text-sm lg:flex-row flex-col xl:space-x-28 lg:space-x-20 -space-x-64">
                <ul className="font-fontRegular flex flex-col space-y-2 lg:ml-16 md:ml-36 ml-4 mt-1 whitespace-nowrap">
                    <li className="font-fontBold text-secondary mb-3">PAGES</li>
                    <Link className="hover:text-tertiary/60 font-fontSemi transition-all duration-300" href="/">Home</Link>
                    <Link className="hover:text-tertiary/60 font-fontSemi transition-all duration-300" href="/branches">Branches</Link>
                    <Link className="hover:text-tertiary/60 font-fontSemi transition-all duration-300" href="/prices">Prices</Link>
                    <Link className="hover:text-tertiary/60 font-fontSemi transition-all duration-300" href="/franchise">Franchise</Link>
                    <Link className="hover:text-tertiary/60 font-fontSemi transition-all duration-300" href="/contact">Contact us</Link>
                </ul>
                <ul className="font-fontRegular lg:mt-0 mt-28 grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-3 grid-cols-2 h-max w-max gap-y-2 gap-x-10">
                    <li className="font-fontBold mb-4 text-secondary xl:col-span-3 lg:col-span-2 sm:col-span-3 col-span-2">ALL BRANCHES</li>
                    {branches.map((branch: any, index: number) => 
                        <Link key={index} className="hover:text-secondary/90 font-fontLight transition-all duration-300" href={linkCase(branch.attributes.Name)}>{branch.attributes.Name}</Link>
                    )}
                </ul>
            </div>
            <div className="flex whitespace-nowrap lg:space-x-16 space-x-8 font-fontLight lg:ml-16 -ml-64 mt-10 md:text-sm sm:text-xs text-[0.6rem] h-max">
                <Link className="hover:text-tertiary/60 transition-all duration-300" href="/terms-condition">Terms & Conditions</Link>
                <Link className="hover:text-tertiary/60 transition-all duration-300" href="/privacy-policy">Privacy Policy</Link>
                <Link className="hover:text-tertiary/60 transition-all duration-300" href="/refund-policy">Refund Policy</Link>
            </div>
            <div className="flex w-full xl:px-innerMargin md:px-mdInnerMargin px-smInnerMargin items-center flex-col space-y-5 absolute left-1/2 -translate-x-1/2 bottom-5">
                <div className="outline outline-[0.5px] outline-secondary h-0 w-1/2"/>
                <span className="font-fontLight md:text-xs text-[0.4rem] text-tertiary/80">© 2016 The Barbeque Company (Registered under BBQC HOSPITALITY PRIVATE LIMITED) All Right Reserved.</span>
            </div>
        </div>
    </div>
  )
}

export default Footer;