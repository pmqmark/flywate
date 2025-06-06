import { ContainerProp } from '@/types/common'
import { cs } from "@/utils/helper/cn"
import React from 'react'

const ContainerWrapper = ({ children, className }: ContainerProp) => {
    return (
        <div className={cs("max-w-[1450px] mx-auto w-full p-3 my-5 md:my-10 lg:my-14 ", className)}>
            {children}
        </div>
    )
}

export default ContainerWrapper
