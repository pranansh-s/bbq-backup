import { FC, useEffect, useState } from "react"
import Slider, { LazyLoadTypes } from "react-slick";
import ReviewCard from "./ReviewCard";

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <img
      src="/statics/ChevronRight.svg"
      className={`${className} w-10 h-10 lg:-mr-5 -mr-2`}
      onClick={onClick}
    />
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <img
      src="/statics/ChevronLeft.svg"
      className={`${className} w-10 h-10 lg:-ml-5 -ml-2`}
      onClick={onClick}
    />
  );
}

const CustomerReviews: FC<{reviews: any}> = ({reviews}) => {
    const [hydrated, setHydrated] = useState<boolean>(false);
    useEffect(() => setHydrated(true), []);
    
    const lazy: LazyLoadTypes = "ondemand";
    const settings = {
        dots: false,
        lazyLoading: lazy,
        arrows: true,
        autoplay: false,
        infinite: true,
        speed: 100,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 640,
            settings: {
              arrows: false,
              slidesToShow: 1.5,
              slidesToScroll: 0.5,
            }
          }
        ],
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    };
  return (
    <div className="h-max pt-36 xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs lg:snap-center snap-none flex flex-col text-left justify-center bg-primary text-tertiary">
        <h3 className="font-fontBold lg:text-5xl text-3xl lg:mb-10 mb-5">Customer Reviews</h3>
        {hydrated && <Slider {...settings} className="h-max">
            {reviews.sort(() => 0.5 - Math.random()).slice(0, 5).map((item: any, index: number) => <ReviewCard key={index} item={item}/>)}
        </Slider>}
    </div>
  )
}

export default CustomerReviews;