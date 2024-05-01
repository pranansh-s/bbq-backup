import { FC, useState } from "react";
import Form from "./Form";

const BranchesHero: FC<{branches: any}> = ({branches}) => {
  const [form, setForm] = useState<boolean>(false);
  return (
    <div className="lg:h-screen h-max bg-primary snap-none flex items-center justify-center lg:space-x-16 space-x-0 xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs">
        <div className="xl:w-[60%] lg:w-[45%] mt-navbar w-full flex items-center justify-center">
            <img src="/statics/patternPlus.png" alt="" className="xl:h-[35rem] lg:h-[30rem] max-h-1/2 h-[25rem] w-screen" />
            <h1 className="text-tertiary absolute lg:text-left text-center xl:text-[4.2rem] md:text-[4rem] text-[3rem] font-fontExtra leading-[1.25] w-max drop-shadow-[0_4px_44px_rgba(252,92,44,0.6)]">
                OUR <a onClick={() => window.scrollTo({ top: document.getElementById('outlets')!.getBoundingClientRect().top - 120, behavior: 'smooth' })} className="md:inline-block hidden group cursor-pointer rounded-full bg-secondary w-16 h-16 ml-6 outline-dashed outline-4 -outline-offset-2 hover:outline-offset-2 transition-all duration-300 outline-tertiary relative"> <img src="/statics/ArrowUp.svg" alt="" className="absolute group-hover:top-2/3 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all duration-300" /> </a> <br /> OUTLETS
                <a onClick={() => window.scrollTo({ top: document.getElementById('outlets')!.getBoundingClientRect().top - 120, behavior: 'smooth' })} className="group md:hidden mx-auto block cursor-pointer rounded-full bg-secondary w-12 h-12 outline-dashed outline-2 -outline-offset-1 hover:outline-offset-2 transition-all duration-300 outline-tertiary relative"> <img src="/statics/ArrowUp.svg" alt="" className="absolute group-hover:top-2/3 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all h-6 duration-300" /> </a>
            </h1>
        </div>
        {!form && <button onClick={() => setForm(!form)} className={`fixed lg:hidden right-5 bottom-5 z-10 flex text-tertiary items-center h-9 bg-secondary rounded-full outline px-4 active:mb-0 active:shadow-none hover:mb-1 hover:shadow-md transition-all duration-300`}>
          <span className="font-fontSemi text-xs">Reserve Table</span>
        </button>}
        <div className="lg:w-[40%] w-0"><Form branches={branches} show={form} setShow={setForm}/></div>
    </div>
  )
}

export default BranchesHero;