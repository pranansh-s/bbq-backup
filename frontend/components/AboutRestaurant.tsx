import { FC } from "react";

const AboutRestaurant: FC<{descr?: string}> = ({descr}) => {
  return (
    <div className="h-max py-28 xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs lg:snap-center snap-none flex flex-col text-left justify-center bg-primary text-tertiary">
        <h3 className="font-fontBold lg:text-5xl text-3xl lg:mb-8 mb-3">About Restaurant</h3>
        <h2 className="font-fontRegular lg:text-lg text-sm whitespace-pre-line">{descr}</h2>
    </div>
  )
}

export default AboutRestaurant;