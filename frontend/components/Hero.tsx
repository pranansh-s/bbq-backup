import { FC, useState } from "react"
import Form from "./Form";

const Hero: FC<{branches: any}> = ({branches}) => {
  const [form, setForm] = useState<boolean>(false);
  return (
    <div className="h-screen flex items-center justify-between bg-cover bg-header xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs font-fontRegular text-tertiary">
        <div className="lg:w-1/2 w-full flex flex-col lg:space-y-6 space-y-4">
            <h2 className="lg:text-6xl text-4xl lg:leading-[4rem] leading-[3rem] font-fontExtra font-extrabold">Experience <br /> 
              <span className="text-secondary lg:text-5xl text-3xl"> PREMIUM </span> & <span className="text-secondary lg:text-5xl text-3xl"> FRESH </span> <br />
              <span className="lg:text-5xl text-3xl bg-flame bg-clip-text bg-contain saturate-200 text-transparent">Barbeque</span> </h2>
            <h1 className="lg:text-base text-sm w-3/4">We are a true barbecue and buffet restaurant serving fresh and sumptuous meals on your plate</h1>
        </div>
        {!form && <button onClick={() => setForm(!form)} className={`fixed lg:hidden right-5 bottom-5 z-10 flex text-tertiary items-center h-9 bg-secondary rounded-full outline px-4 active:mb-0 active:shadow-none hover:mb-1 hover:shadow-md transition-all duration-300`}>
          <span className="font-fontSemi text-xs">Reserve Table</span>
        </button>}
        <Form branches={branches} show={form} setShow={setForm}/>
    </div>
  )
}

export default Hero;