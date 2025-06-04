import Image from 'next/image'
import React from 'react'

const Nav = () => {
  return (
    <main className='bg-primary p-5 px-10 z-50 text-white flex items-center justify-between'>
        <div className='relative'>
            <Image src={"/common/flywate_logo.png"} alt='Logo' title='site logo' className='w-20 md:w-36' priority width={780} height={780} />
        </div>
        <div>
            contatc us
        </div>
    </main>
  )
}

export default Nav
