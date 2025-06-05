'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from './common/ui/Button'
import Link from 'next/link'
import ContactModal from './contact_us/ContactModal'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <main
      className='fixed top-0 left-0 bg-background  w-full p-3 py-5 md:p-5 md:px-10 z-50 text-white flex items-center justify-between overflow-hidden border-b border-primary'
    >
      <Link href={'/'} title='logo' className='relative'>
        <Image
          src={"/common/flywate_logo.png"}
          alt='Logo' title='site logo'
          className='w-20 md:w-36' priority width={780} height={780}
        />
        <div className="absolute top-0  w-12 bg-reed-500 skew-x-[20deg] border-l-[2px] border-[#44BEC1] z-50" />
      </Link>
      <div onClick={() => setIsOpen(true)}>
        <Button title="Contact Us" link='' />
      </div>

      {
        isOpen && <ContactModal onClose={() => setIsOpen(false)} />
      }
    </main>
  )
}

export default Nav
