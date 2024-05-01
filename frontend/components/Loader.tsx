import { FC } from "react"

const Loader: FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-primary text-tertiary flex justify-center items-center z-50">
      <img src="/logo.png" alt="" className="w-48 animate-pulse" />
    </div>
  )
}

export default Loader;
