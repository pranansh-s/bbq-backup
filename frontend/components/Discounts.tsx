import { FC } from "react"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { LazyLoadTypes } from "react-slick";
import Image from "next/image";
import Link from "next/link";

const Discounts: FC<{images: any, link: any}> = ({images, link}) => {
  const lazy: LazyLoadTypes = "ondemand";
  const settings = {
    dots: false,
    lazyLoading: lazy,
    arrows: false,
    autoplay: false,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: false,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 0.8,
          autoplay: true,
        }
      }
    ]
  };
  return (
    <div className="h-max bg-primary flex flex-col items-center justify-between relative xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs font-fontRegular text-tertiary">
        <Slider {...settings} className="h-full min-h-[22rem] w-full mt-navbar mb-16">
          <Link href={link}><Image width={1000} height={1000} alt="" className="h-full rounded-lg w-[96%]" src={images.Discount_1.data.attributes.url}/></Link>
          <Link href={link}><Image width={1000} height={1000} alt="" className="h-full rounded-lg w-[96%]" src={images.Discount_2.data.attributes.url}/></Link>
          <Link href={link}><Image width={1000} height={1000} alt="" className="h-full rounded-lg w-[96%]" src={images.Discount_3.data.attributes.url}/></Link>
        </Slider>
        <div className="w-screen flex flex-col lg:h-24 h-12 items-center">
            <h3 className="lg:px-margin-base sm:px-margin-sm px-margin-xs text-center lg:text-sm text-xs">Explore the exciting offers and reserve your table today!</h3>
            <div className="border-b-[0.5px] border-secondary w-full h-0 bottom-0 absolute"/>
        </div>
    </div>
  )
}

export default Discounts;