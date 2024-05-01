import { FC } from "react"

const Counter: FC<{count: number, setCount: any}> = ({count, setCount}) => {
  return (
    <div className="flex items-center justify-center outline outline-secondary outline-2 rounded-full col-span-2 w-max mx-auto">
        <button className="text-white font-bold px-3 py-1" onClick={(e) => {e.preventDefault(); count > 0 && setCount(count - 1) }}>-</button>
        <span className="mx-1">{count}</span>
        <button className="text-white font-bold px-3 py-1" onClick={(e) => {e.preventDefault(); setCount(count + 1) }}>+</button>
    </div>
  )
}

export default Counter