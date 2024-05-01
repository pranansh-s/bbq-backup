import Link from "next/link";
import { FC } from "react";
import Lottie from 'lottie-react';
import animationData from '../public/statics/lottie-wrong.json';

const PopupFail: FC<{setState: any, popup: boolean}> = ({setState, popup}) => {
  return (
    <div className="fixed bg-white/30 flex items-center justify-center backdrop-blur-sm w-screen h-screen top-0 left-0 z-[100]">
      <div className="bg-tertiary rounded-sm fixed h-max w-[25rem] text-primary font-fontRegular space-y-5 p-10 flex flex-col items-center justify-center">
          {popup && <Lottie
            loop={true}
            autoplay={true}
            animationData={animationData}
            height={40}
            width={100}
            />}
          <h4><b className="text-secondary font-fontBold">Payment Failure!</b> &nbsp;You can recheck your information, try again later or <Link className="text-secondary" href="/contact">contact us</Link> for further assistance</h4>
          <Link onClick={() => setState(false)} className="rounded-full border text-sm border-secondary text-secondary px-4 py-2 w-max font-fontSemi hover:bg-secondary hover:text-tertiary transition-all duration-300" href="/">Okay</Link>
      </div>
    </div>
  )
}

export default PopupFail;
