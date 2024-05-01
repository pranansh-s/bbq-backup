import { FC } from "react";
import Slider, { LazyLoadTypes } from "react-slick";
import OutletCard from "./OutletCard";

const ExploreOutlets: FC<{name: string, branches: any}> = ({name, branches}) => {
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
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
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
              <ul className='lg:block hidden -mt-8 space-x-0'>{dots}</ul>
            </div>
        ),
        customPaging: () => {
            return (
                <div className='h-1 w-1 rounded-full outline-1 outline outline-secondary mx-1'></div>
            );
        },
    };
    
    return (
        <div className="flex xl:px-margin-lg pt-28 pb-24 lg:px-margin-base sm:px-margin-sm px-margin-xs font-fontRegular text-tertiary space-y-10 bg-primary h-max lg:snap-center snap-none flex-col">
            <h3 className="font-fontBold lg:text-5xl text-3xl">Explore Other Outlets</h3>
            <Slider {...settings} className="lg:h-[30rem] h-[25rem]">
                {branches.map((branch: any, index: number) => name !== branch.attributes.Name && <OutletCard key={index} item={branch.attributes}/>)}
            </Slider>
        </div>
    )
}

export default ExploreOutlets;