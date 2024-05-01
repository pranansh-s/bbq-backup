import { FC } from "react"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { LazyLoadTypes } from 'react-slick';
import OutletCard from "./OutletCard";

const LimitedOutlets: FC<{branches: any}> = ({branches}) => {
  const lazy: LazyLoadTypes = "ondemand";
  const settings = {
    dots: true,
    lazyLoading: lazy,
    arrows: false,
    autoplay: true,
    infinite: true,
    draggable: false,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        }
      }
    ],
    appendDots: (dots: any) => (
      <div>
        <ul className='absolute lg:block hidden right-10 -mt-16 space-x-0'>{dots}</ul>
      </div>
    ),
    customPaging: () => {
      return (
        <div className='h-1 w-1 rounded-full outline-1 outline outline-secondary mx-1'></div>
      );
    },
  };
  return (
      <Slider {...settings} className="lg:h-[30rem] h-[20rem] lg:w-2/3 w-full">
        {branches.map((branch: any, index: number) => <OutletCard key={index} item={branch.attributes}/>)}
      </Slider>
  )
}

export default LimitedOutlets;