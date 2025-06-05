import { NavData } from '@/utils/data/nav'
import { SlSocialFacebook } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { SlSocialInstagram } from "react-icons/sl";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='border-t-2 border-primary'>
      <div className='overflow-hidden flex flex-col md:flex-row relative'>
        <div className='w-full md:w-[25%] px-5 md:p-20 md:px-10 flex items-center justify-center'>
          <Link href={'/'} title='logo' className='relative p-5 md:p-10 md:px-10 '>
            <Image
              src={"/logoFooter.png"}
              alt='Logo' title='site logo'
              className='w-20 md:w-34 hidden md:block' priority width={780} height={780}
            />
            <Image
              src={"/common/flywate_logo.png"}
              alt='Logo' title='site logo'
              className='w-38 md:hidden object-containe' priority width={780} height={780}
            />
          </Link>
        </div>

        <div
          className="w-full md:w-[75%] bg-primary/10"
          style={{ clipPath: 'polygon(150px 0, 100% 0, 100% 100%, 0 100%)', }}
        >

          <div className='uppercase p-5 gap-5 md:p-20 md:px-40 w-full h-full flex flex-col md:flex-row items-start z-50'>
            {
              NavData.map((item) => (
                <div className='flex flex-col gap-5 md:mt-10 md:ml-20 ' key={item.id}>
                  <h1 className='md:text-[28px] font-semibold md:pb-4'>{item.title}</h1>
                  {
                    item.content.map((list) => (
                      <ul className='hover:text-primary ease-in-out duration-300 cursor-pointer' key={list.id}>{list.title}</ul>
                    ))
                  }
                </div>
              ))
            }

          </div>

          <div className='flex items-center justify-start text-white p-5 gap-5'>
            <SlSocialFacebook />
            <CiTwitter />
            <SlSocialInstagram />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer
