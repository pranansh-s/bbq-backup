import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import SubMenu from "./SubMenu";

const Navbar: FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(true);
  const [sub, setSub] = useState<boolean>(false);

  const [wa, setWa] = useState<string>("");
  const [branches, setBranches] = useState<any>([]);
  const [contact, setContact] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchParams = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: 
        `{
          contact {
            data {
              attributes {
                Phone
              }
            }
          }
          global { 
            data {
              attributes {
                Whatsapp_Link
              }
            }
          }
          branches(pagination: { limit: 100 }) {
            data {
              attributes {
                Name
                New
                ComingSoon
              }
            }
          }
        }`
      })
    }

    fetch(`${process.env.NEXT_PUBLIC_CMS_PANEL}/graphql`, fetchParams)
      .then((res) => res.json())
      .then((res) => { 
        setWa(res.data.global.data.attributes.Whatsapp_Link)
        setContact(res.data.contact.data.attributes.Phone);
        setBranches(res.data.branches.data);
      });
    
    window.onscroll = () => {
      if(window.scrollY === 0) setTop(true);
      else setTop(false);
    }
  }, []);
  return (
    <>
      <Link href={wa} className="lg:w-14 w-10 group shadow-tertiary shadow-sm hover:shadow-lg fixed bottom-5 left-5 bg-[#25D366] rounded-full p-2 ease-in-out z-30">
        <Image width={40} height={40} alt="Whatsapp" src="/statics/WhatsApp.svg" className="group-hover:animate-pulse"/>
      </Link>
      <div className={`${top ? 'bg-primary text-tertiary' : 'bg-tertiary text-primary'} w-screen lg:h-24 h-16 border-b-[1px] border-secondary flex items-center lg:px-margin-base md:px-margin-sm px-margin-xs font-fontRegular shadow-lg fixed top-0 z-50 transition-all duration-300`} onMouseLeave={() => setSub(false)}>
        <div className="flex items-center md:justify-start justify-between space-x-20 flex-grow">
          <Link href="/"><img src={top ? '/logoWeb.svg' : '/logoWebBlack.svg'} alt="BBQ Company" className="lg:h-24 h-16 cursor-pointer" /></Link>
          <div>
            {top ? <img src="/statics/List.svg" alt="" onClick={() => setNav(!nav)} className="cursor-pointer md:hidden block mr-6" /> : <img src="/statics/ListBlack.svg" alt="" onClick={() => setNav(!nav)} className="cursor-pointer md:hidden block mr-6" />}
            <div className={`flex md:hidden absolute flex-col bg-primary text-tertiary space-y-3 rounded-b-md left-0 text-center text-sm ${nav ? 'h-60 py-2 mt-2' : 'h-0 py-0 mt-0'} w-full overflow-hidden transition-all duration-300`}>
              <Link className={`hover:text-tertiary/60 transition-all duration-300 border-b-2 pb-3 border-secondary`} href="/">Home</Link>
              <Link className={`hover:text-tertiary/60 transition-all duration-300 border-b-2 pb-3 border-secondary`} href="/branches">Branches</Link>
              <Link className={`hover:text-tertiary/60 transition-all duration-300 border-b-2 pb-3 border-secondary`} href="/prices">Prices</Link>
              <Link className={`hover:text-tertiary/60 transition-all duration-300 border-b-2 pb-3 border-secondary`} href="/franchise">Franchise</Link>
              <Link className={`hover:text-tertiary/60 transition-all duration-300 border-b-2 pb-3 border-secondary`} href="/contact">Contact Us</Link>
            </div>
            <div className="space-x-8 md:flex hidden">
              <Link className={`${top ? 'hover:text-tertiary/80' : 'hover:text-primary/60'} transition-all duration-300 text-sm`} href="/">Home</Link>
              <Link className={`${top ? 'hover:text-tertiary/80' : 'hover:text-primary/60'} transition-all duration-300 text-sm`} onMouseEnter={() => setSub(true)} href="/branches">{sub && <SubMenu branches={branches} top={top}/>}Branches</Link>
              <Link className={`${top ? 'hover:text-tertiary/80' : 'hover:text-primary/60'} transition-all duration-300 text-sm`} href="/prices">Prices</Link>
              <Link className={`${top ? 'hover:text-tertiary/80' : 'hover:text-primary/60'} transition-all duration-300 text-sm`} href="/franchise">Franchise</Link>
              <Link className={`${top ? 'hover:text-tertiary/80' : 'hover:text-primary/60'} transition-all duration-300 text-sm`} href="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
        {(router.pathname === '/prices' || router.pathname === '/franchise' || router.pathname === '/contact') ?
        <Link href="/" className={`flex lg:space-x-3 space-x-1 text-tertiary items-center lg:h-10 h-9 bg-secondary rounded-full outline ${top ? 'outline-tertiary hover:shadow-tertiary' : 'outline-primary hover:shadow-primary'} lg:px-6 px-4 active:mb-0 active:shadow-none hover:mb-1 hover:shadow-md transition-all duration-300`}>
          <span className="font-fontSemi whitespace-nowrap lg:text-sm text-xs">Book a table</span>
          <img src="/statics/Confetti.svg" alt="" className="h-5"/>
        </Link> : 
        <Link href={`tel:+91${contact}`} className={`font-fontLight md:block hidden ${top ? 'text-tertiary hover:text-tertiarty/80' : 'text-primary hover:text-primary/80'}  transition-all duration-300 lg:text-base text-sm whitespace-nowrap`}>(+91) {contact}</Link>}
      </div>
    </>
  )
}

export default Navbar;