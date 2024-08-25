import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children, className }: HeaderProps) => {
  return (
      <div className={cn('header', className)}>
          <Link href="/" className='flex-1 justify-center items-center'>
              <div className='flex'>
                  <Image
                      src="/favicon.png"
                      alt="Logo with name"
                      width={80}
                      height={32}
                      className="p-2"
                  />
                  <h1 className='md:flex hidden items-center text-center text-2xl font-bold mr-3'>Kira&nbsp; <span className='text-cyan-400'>LiveDocs</span></h1>
              </div>
          </Link>
          {children}
      </div>
  )
}


export default Header