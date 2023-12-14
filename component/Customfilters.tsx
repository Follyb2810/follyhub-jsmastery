'use client'
import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils'
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'

const Customfilters = ({title,options,setFilter}:CustomFilterProps) => {
    const [selected, setSelected] = useState(options[0])
    const router = useRouter()
   
    const handleUpdateParams=(e:{title:string,value:string})=>{
    const newPathName = updateSearchParams(title,e.value.toLowerCase())
        router.push(newPathName)
    }
    return (
        <div className='w-full'>
            <Listbox
              value={selected}
              onChange={(e)=>{
                setSelected(e);
                // handleUpdateParams(e)
                setFilter(e.value)
              }
            }
            >
                <div className="relative w-fit x-10">
                    <Listbox.Button className='custom-filter__btn'>
                        <span className='block truncate'>{title}</span>
                        <Image src='/chevron-up-down.svg' alt='' className='ml-4 object-contain' width={20} height={20}/>
                    </Listbox.Button>
                    <Transition as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                        <Listbox.Options className='custom-filter__options'>
                            {
                                options.map((option)=>(
                                    <Listbox.Option key={option.title} value={option} className={({active})=>`relative cursor-default select-none py-2 ox-4 ${active ?'bg-primary-blue text-white':'text-gray-900'}`}>
                                        {
                                          ({selected})=>(
                                            <span className={`block truncate ${selected ?'font-medium':'font-normal'}`}>{option.title}</span>
                                          )
                                        }
                                        </Listbox.Option>
                                ))
                            }
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            
        </div>
    )
}

export default Customfilters
