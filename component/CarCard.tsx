'use client'
import { CarProps } from '@/types'
import { calculateCarRent, generateCarImageUrl } from '@/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import { CarDetails, CustomButton } from '.'
interface CarCardProps {
    car:CarProps
}


const CarCard = ({car}:CarCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {city_mpg:city,year,make,model,transmission,drive} = car
    const carRent = calculateCarRent(city,year)

    return (
        <div className='car-card group'>
            <div className='car-card__content'>
                <h2 className='card-card__content-title'>{make} {model}</h2>

            </div>
           <p className='flex mt-6 text-[32px] font-extrabold'>
            <span className='self-start text-[14px] font-semibold'>
             $
            </span>
                {carRent}
            <span className='self-ebd text-[14px] font-semibold'>
                /day
            </span>
           </p>
        <div className='relative w-full h-40 my-3 object-contain'>
            <Image src={generateCarImageUrl(car)} alt=''  className='' fill priority />
            {/* <Image src='/hero.png' alt=''  className='' fill priority /> */}
        </div>
        <div className='relative flex w-full mt-2'>
            <div className='flex group-hover:invisible w-full justify-between text-gray'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src='/steering-wheel.svg' width={20} height={20} alt=''/>
                    <p className="text-[14px]">
                        {
                            transmission === 'a' ? 'Automatic' :'Manual;'
                        }
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src='/tire.svg' width={20} height={20} alt=''/>
                    <p className="text-[14px]">
                        {
                            drive.toLocaleUpperCase()
                        }
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src='/gas.svg' width={18} height={18} alt=''/>
                    <p className="text-[14px]">
                        {city} MPG
                    </p>
                </div>
            </div>
                <div className='car-card__btn-container'>
                    <CustomButton
                      title='View More'
                      containerStyle='w-full py-[16px] rounded-full bg-primary-blue '
                      textStyles='text-white text-[14px] leading-[17px] font-bold'
                      rightIcon='/right-arrow.svg'
                      handleClick={()=>setIsOpen(true)}
                    />
                </div>
        </div>
        <CarDetails isOpen={isOpen} closeModal={()=>setIsOpen(false)} car={car}/>
        </div> 
    )
}

export default CarCard