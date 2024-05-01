import Image from "next/image";
import { FC } from "react";

const PopupContact: FC<{ setState: any }> = ({ setState }) => {
  return (
    <div className="fixed bg-white/30 flex items-center justify-center backdrop-blur-sm w-screen h-screen top-0 left-0 z-[100]">
      <div className="bg-tertiary rounded-sm h-max w-[20rem] text-center text-primary font-fontRegular space-y-5 p-10 flex flex-col items-center justify-center">
          <Image src="/logo.svg" alt="" width={100} height={100}/>
          <h4>Your <b className="text-secondary font-fontSemi">query</b> has been noted, and we&apos;ll try to get to you in the shortest time possible</h4>
          <div className="rounded-full cursor-pointer border border-secondary text-secondary px-4 py-2 w-max font-fontSemi hover:bg-secondary hover:text-tertiary transition-all duration-300" onClick={() => setState(false)} >Okay</div>
      </div>
    </div>
  )
}

export default PopupContact;
