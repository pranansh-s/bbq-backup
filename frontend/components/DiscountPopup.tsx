import { FC, useEffect, useState } from "react";

const DiscountPopup: FC<{data: any, link: any}> = ({data, link}) => {
  const [on, setOn] = useState<boolean>(false);

  useEffect(() => {
    if (on && data.Toggle) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [on]);

  const popupOn = () => {
    setOn(true);
  }

  useEffect(() => {
    if (document.readyState === 'complete') {
        setTimeout(() => popupOn(), 1000);
      } else {
        window.addEventListener('load', popupOn);
        return () => window.removeEventListener('load', popupOn);
      }
  }, [])
  return (
    <div className={`w-screen h-screen ${on ? 'opacity-100 fixed' : 'opacity-0 hidden'} ${data.Toggle ? 'block' : 'hidden'} bg-primary/60 z-50 top-0 left-0 flex justify-center items-center transition-all duration-300`}>
        <div className={`bg-white/20 ${on ? 'scale-100' : 'scale-0'} 2xl:w-[45rem] md:w-[50rem] sm:w-[23rem] w-[20rem] h-[30vh] xl:h-[40vh] lg:max-w-[50vw] backdrop-blur-md rounded-lg flex md:flex-row flex-col md:space-x-5 space-x-0 md:space-y-0 space-y-5 md:translate-y-0 -translate-y-1/2 transition-all duration-300`}>
            <div className="md:py-6 py-4 md:px-9 px-5 md:text-left text-center">
                <h4 className="mb-2 text-secondary font-fontExtra md:text-[1.45rem] text-[1.25rem] leading-7">{data.Title}</h4>
                <sub className=" text-tertiary font-fontRegular text-sm ">{data.Subtext}</sub>
            </div>
            <img onClick={() => window.open(link, "_blank")} src={data.Image.data.attributes.url} alt="" className="rounded-lg md:h-full h-max object-contain cursor-pointer" />
            <button className="bg-white/20 rounded-full p-2 backdrop-blur-lg absolute right-0 md:-top-10 -top-16" onClick={() => setTimeout(() => setOn(false), 500)}>
                <img src="/statics/CrossWhite.svg" alt="" className="w-4 h-4" />
            </button>
        </div>
    </div>
  )
}

export default DiscountPopup;