import { ButtonProps } from '@/types/common'
import { cs } from '@/utils/helper/cn'
import Link from 'next/link'
import React from 'react'

const Button = ({ title, link, className, onClick }: ButtonProps) => {
  return (
    <Link href={link || ""} title={title || "Button"} >
      <button onClick={onClick} className={cs('bg-button p-1.5 md:p-2 uppercase px-5 text-xs md:text-sm md:px-5 cursor-pointer text-nowrap', className)}>
        {title}
      </button>
    </Link>
  )
}

export default Button
