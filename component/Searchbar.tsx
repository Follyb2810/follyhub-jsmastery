'use client'
import React, { useState } from 'react'
import { SearchManufacturer } from '.'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Searchbar = ({setModel,setManufacturer}) => {
    const router = useRouter()
    const [searchManufacturer, setsearchManufacturer] = useState('');
    const [searchModel, setSearchModel] = useState('')
    const handleSearch=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(setManufacturer === '' && searchModel === ''){
            return alert('please fill in the search bar')
        }
        setModel(searchModel)
        setManufacturer(setsearchManufacturer)
        // updateSearchParam(searchModel.toLocaleLowerCase(),setManufacurer.toLocaleLowerCase())
    }
    const updateSearchParam =(model:string,manufacturer:string)=>{
          const searchParams = new URLSearchParams(window.location.search)
          if(model){
            searchParams.set('model',model)
          }else{
            searchParams.delete('model')
          }
          if(manufacturer){
            searchParams.set('manufacturer',manufacturer)
          }else{
            searchParams.delete('manufacturer')
          }
          const newPathname = `${window.location.pathname}?${searchParams.toString()}`
          router.push(newPathname)
        }
    return (
        <form className='searchnar' onSubmit={handleSearch}>
            <div className="sesrchbar__item">
                <SearchManufacturer 
                  selected={searchManufacturer}
                  setSelected={setsearchManufacturer}
                />
                <SearchButton otherClasses='sm:hidden'/>

            </div>
            <div className="searchbar__item">
                <Image src='/model-icon.png' width={25} height={25} 
                 alt=''
                 className='absolute w-[20px] h-[20px] ml-4'
                />
                <input 
                 type='text'
                 name='model'
                 value={searchModel}
                onChange={(e)=>setSearchModel(e.target.value)}
                placeholder='folly car'
                className='searchbar__input'
                />
                <SearchButton otherClasses='sm:hidden'/>
            </div>
                <SearchButton otherClasses='max-sm:hidden'/>
        </form>
    )
}

export default Searchbar


const SearchButton =({otherClasses}:{otherClasses:string})=>(
    <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
        <Image src='/magnifying-glass.svg' alt='' width={40} height={40} className='object-contain'/>
    </button>
)
