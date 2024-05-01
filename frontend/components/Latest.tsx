import { FC, useEffect, useState } from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { LazyLoadTypes } from 'react-slick';
import BlogCard from './BlogCard';

const Latest: FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    if(blogs.length > 0) return;
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@TBBQCompany')
      .then((res) => res.json())
      .then((res) => setBlogs(res.items));
  }, [blogs]);

  const lazy: LazyLoadTypes = "ondemand";
  const settings = {
    dots: true,
    lazyLoading: lazy,
    arrows: false,
    autoplay: true,
    infinite: true,
    draggable: false,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 0.5
        }
      }
    ],
    appendDots: (dots: any) => (
      <div>
        <ul className='lg:block hidden space-x-0'>{dots}</ul>
      </div>
    ),
    customPaging: () => {
      return (
        <div className='h-1 w-1 rounded-full outline-1 outline outline-secondary mx-1'></div>
      );
    },
  };
  return (
    <div className={`h-screen ${blogs.length > 0 ? 'block' : 'hidden'} bg-primary pb-16 flex flex-col items-cente justify-center relative xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs font-fontRegular text-tertiary`}>
        <h3 className="font-fontBold lg:text-6xl text-4xl mt-navbar mb-16">Latest Events</h3>
        {blogs && <Slider {...settings} className="lg:h-[30rem] h-[25rem] w-full">
          {blogs.slice(0, 6).map((item: any, index: number) => <BlogCard key={index} item={item}/>)}
        </Slider>}
    </div>
  )
}

export default Latest;