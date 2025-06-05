import React from 'react'
import ModalWrapper from '../common/ui/ModalWrapper'
import { IoClose } from "react-icons/io5";

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal = ({onClose}: ContactModalProps) => {
    return (
        <ModalWrapper className='p-5'  >
            <div className='bg-background p-3 md:p-6 pb-10 md:px-10 h-fit font-sans'>
                <div className='flex justify-between items-center '>
                    <h1 className='font-semibold text-[22px]'>CONTACT US</h1>
                    <IoClose onClick={onClose} className='cursor-pointer' />
                </div>

                <div className='my-3'>
                    <hr className='' />
                </div>

                <div className='pt-2'>
                    <p className='pb-4 w-full md:w-[70%] text-[#FFFFFF] text-[14px]'>
                        {`We are here to help! Whether you have a question, feedback, or just want to say hello, drop us a message and we will get to you soon`}
                    </p>
                    <div className='bg-[#050D0D] p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-[13pxx] space-y-5'>
                        <div className='flex  gap-3'>
                            <h3 className='text-[#FFFFFF]/70 '>Mail ID </h3>
                            <span className='text-[14px]'>
                                service@flywate.com
                            </span>
                        </div>
                        <div className='flex gap-3'>
                            <h3 className='text-[#FFFFFF]/70'>Contact </h3>
                            <span className='text-[14px] leading-7'>
                                +91 7012022315  <br />
                                +91 8129952753
                            </span>
                        </div>
                        <div className='flex gap-3'>
                            <h3 className='text-[#FFFFFF]/70 '>Address </h3>
                            <span className='text-[14px] leading-7'>
                                Flywate India Sports Private Limited  <br />
                                Door no : VIII/232 new road, <br />
                                Eroor North Post, Thripunithura, <br />
                                Pin: 682306, <br />
                                Kerala, India <br />
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </ModalWrapper>
    )
}

export default ContactModal
