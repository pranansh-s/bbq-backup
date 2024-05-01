import Image from "next/image";
import { FC, useEffect, useRef } from "react"

const Input: FC<{ label: string, placeholder: string, i?: string, type: string, outline?: string, setState: any, empty?: any, invalidPhone?: any, setEmpty?: any }> = ({label, placeholder, i, type, outline, setState, empty, invalidPhone, setEmpty}) => {
  const inp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(empty && inp.current?.value) setEmpty(false);
  }, [inp.current?.value]);
  return (
    <div className={`text-left ${outline === 'black' ? 'border-primary' : 'border-secondary' } border-b-2 space-y-1 w-full`}>
        <label className="lg:text-sm text-xs font-fontLight" htmlFor="">{label}</label>
        <div className="flex items-center px-1">
            <img src={`/statics/${i}`} alt="" className="h-5" />
            <input ref={inp} onChange={() => setState(inp.current?.value)} className={`bg-transparent ${(empty && inp.current?.value.trim() === "") ? "animate-shake-fast placeholder:text-red-600" : `animate-none ${outline !== 'black' ? 'placeholder:text-tertiary/60' : 'placeholder:text-primary/20'}`} focus:outline-none w-full px-2 py-1 placeholder:font-fontLight lg:text-base text-sm placeholder:italic`} type={type} placeholder={placeholder} maxLength={type === 'tel' ? 10 : -1} />
            {type === "tel" && invalidPhone && <>
              <Image width={15} height={15} src="/statics/info.svg" alt="" className="cursor-pointer peer z-50"/>
              <p className="lg:peer-hover:block peer-active:block hidden absolute bg-tertiary text-primary font-fontRegular text-sm px-3 py-2 lg:right-12 right-6 -mt-20">Put in a valid phone number</p>
            </>}
        </div>
    </div>
  )
}

export default Input;