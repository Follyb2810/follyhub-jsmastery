'use client'
import { SearchManufacturerProps } from '@/types'
import React, { Fragment, useState } from 'react'
import {Combobox,Transition} from '@headlessui/react'
import Image from 'next/image'
import { manufacturers } from './constants'
// const SearchManufacturer = ({manufacturer,setmanufacturer}:SearchManufacturerProps) => {
const SearchManufacturer = ({selected,setSelected}:SearchManufacturerProps) => {
    const [query, setquery] = useState('');
    const filterManufacture = query === '' ? 
                    manufacturers :
                    manufacturers.filter((item)=>(
                        item.toLowerCase().replace(/\s+/g,"")
                        .includes(query.toLowerCase().replace(/\s+/g,""))
                    ))
    return (
        <div className='search-manufacture'>
            <Combobox value={selected} onChange={setSelected}>
                <div className='relative w-full'>
                    <Combobox.Button className='absolute top-[15px'>
                        <Image src='/car-logo.svg' width={20} height={20} className='ml-4 ' alt=''/>
                    </Combobox.Button>
                    <Combobox.Input className='search-manufacturer_input'
                    placeholder='volkswagen'
                    displayValue={(manufacturer:string)=>manufacturer}
                    onChange={(e)=>setquery(e.target.value)}
                    />
                    <Transition as={Fragment}
                    
                    leave='transition ease-in duration'
                     leaveFrom='opacity-100'
                     leaveTo='opacity-0'
                     afterLeave={()=>setquery('')}
                    >
                    <Combobox.Options>
                        {
                            filterManufacture.map((item)=>(
                                <Combobox.Option 
                                key={item}
                                value={item}
                                 className={({active})=>`relative search-manufacturer__option ${active?'bg-primary-blue text-white':'text-gray-900'}`}
                                >
                                    {({selected,active})=>
                                    (
                                        <>
                                         <span
                                          className={`block truncate ${selected ? 'font-medium':'font-normal'}`}
                                         >
                                            {item}
                                         </span>
                                         {
                                            selected ? (
                                            <span className={`absolute inset-y-0 left-0 flex items-center pl-13 ${active ? 'text-white':'text-teal-600'}`}>
                                                
                                            </span>):null
                                         }
                                        </>
                                    )
                                    }
                                       
                                </Combobox.Option>
                            ))
                        }
                    </Combobox.Options>
                     </Transition>
                </div>
            </Combobox>
            
        </div>
    )
}

export default SearchManufacturer

{/* <Combobox.Options>
                        {
                            filterManufacture.length === 0 && query !== '' ? (
                                <Combobox.Option
                                    value={query}
                                    className='search-manufacturer__option'>
                                        create &quot;{query}&quot;
                                    </Combobox.Option>
                            ):(filterManufacture.map((item)=>(
                                <Combobox.Option 
                                key={item}
                                value={item}
                                 className={({active})=>`relative search-manufacturer__option ${active}?'bg-primary-blue text-white':'text-gray-900'`}
                                >
                                        {item}
                                </Combobox.Option>
                            )))
                        }
                    </Combobox.Options> */}