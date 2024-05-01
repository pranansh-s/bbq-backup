import Link from 'next/link'

export default function Custom404() {
  return (
    <div className='bg-primary text-tertiary h-screen text-center flex-col space-y-10 flex justify-center items-center'>
      <h1 className='lg:text-6xl text-4xl font-fontExtra'>404 - Page Not Found</h1>
      <Link href="/" className='bg-secondary border lg:text-base text-sm border-tertiary hover:bg-secondary/80 hover:translate-y-1 text-tertiary rounded-md px-4 py-2 font-fontBold hover:text-tertiary/80 transition-all duration-300'>Home ↩</Link>
    </div>
  )
}