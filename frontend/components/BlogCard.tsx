import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react"

const BlogCard: FC<{item: any}> = ({item}) => {
  return (
    <Link href={item.link} className="xl:h-[98%] h-[90%] w-[98%] block hover:mt-1 rounded-xl border-2 border-secondary lg:p-5 p-3 transition-all duration-300">
        <Image width={500} height={500} src={item.thumbnail} alt="" className="h-1/2 w-full" />
        <div className="h-1/2 flex flex-col">
            <h4 className="md:text-base text-sm font-fontSemi lg:mt-3 mt-2 line-clamp-2">{item.title}</h4>
            <div className="font-fontLight md:text-sm text-xs lg:mt-2 mt-1 leading-1 lg:line-clamp-5 line-clamp-3">{item.description.replace(/<[^>]+>/g, '')}</div>
            <div className="flex items-center justify-between mt-auto">
                <div className="lg:text-xs text-[0.6rem] text-tertiary/60 flex items-center whitespace-nowrap"> <img src="/statics/CalendarBlank.svg" alt="" className="mr-1" />{moment(item.pubDate.slice(0, 10)).format('D MMMM, YYYY')}</div>
                <div className="flex space-x-1 items-center hover:opacity-80">
                    <span className="font-fontRegular text-secondary lg:text-xs text-[0.6rem] whitespace-nowrap">Read More</span>
                    <img src="/statics/ArrowUpRight.svg" alt="" className="lg:h-5 h-4"/>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default BlogCard;