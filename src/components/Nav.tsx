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
      className='fixed top-0 left-0 bg-background w-full z-50 text-white flex items-center justify-between overflow-hidden border-b border-primary'
    >
      <Link href={'/'} title='logo' className='relative md:w-[20%] p-3 md:px-10 '>
        <Image
          src={"/common/flywate_logo.png"}
          alt='Logo' title='site logo'
          className='w-28 md:w-38' priority width={780} height={780}
        />
      </Link>

      <div className='w-full h-full bg-primary/10 border-l-2 border-primary skew-x-[-20deg] hidden md:flex p-3 py-5 md:p-5 md:px-10 relative'>
        <div className='p-3'> </div>
      </div>

      <div onClick={() => setIsOpen(true)} className='md:w-[35%] flex items-center justify-end p-3 md:px-10 '>
        <Button title="Contact Us" link='/' />
      </div>

      {
        isOpen && <ContactModal onClose={() => setIsOpen(false)} />
      }
    </main>
  )
}

export default Nav
