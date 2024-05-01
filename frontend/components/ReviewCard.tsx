import { FC } from "react";

const ReviewCard: FC<{item: any}> = ({item}) => {
  return (
    <div className="xl:p-8 lg:p-6 p-4 lg:mx-2 mx-1 flex flex-col justify-between h-[18rem] font-fontRegular border-secondary border-2 rounded-md">
        <div>
          <h4 className="font-fontSemi lg:text-xl text-base flex items-center"><img className="pr-3 h-10" src="/statics/Avatar.png"/>{item.attributes.Name}</h4> <br />
          <span className="font-fontLight lg:text-sm text-xs">{item.attributes.Comment}</span>
        </div>
        <div className="flex space-x-1 items-center justify-end">
            {item.attributes.Rating >= 1 ? <img src="/statics/StarFill.svg" alt="" className="lg:h-5 h-4"/> : <img src="/statics/Star.svg" alt="" className="lg:h-5 h-4"/>}
            {item.attributes.Rating >= 2 ? <img src="/statics/StarFill.svg" alt="" className="lg:h-5 h-4"/> : <img src="/statics/Star.svg" alt="" className="lg:h-5 h-4"/>}
            {item.attributes.Rating >= 3 ? <img src="/statics/StarFill.svg" alt="" className="lg:h-5 h-4"/> : <img src="/statics/Star.svg" alt="" className="lg:h-5 h-4"/>}
            {item.attributes.Rating >= 4 ? <img src="/statics/StarFill.svg" alt="" className="lg:h-5 h-4"/> : <img src="/statics/Star.svg" alt="" className="lg:h-5 h-4"/>}
            {item.attributes.Rating >= 5 ? <img src="/statics/StarFill.svg" alt="" className="lg:h-5 h-4"/> : <img src="/statics/Star.svg" alt="" className="lg:h-5 h-4"/>}
        </div>
    </div>
  )
}

export default ReviewCard;