'use client'
import { CarCard, Customfilter, Hero, Searchbar } from '@/component'
import ShowMore from '@/component/ShowMore'
import { fuels, yearsOfProduction } from '@/component/constants'
import { fetchCars } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default  function Home() {
// export default async function Home({searchParams}) {
  // const allCars = await fetchCars(
  //   {
  //     manufacturer:searchParams.manufacturer || '',
  //     year:searchParams.year || 2023,
  //     fuel:searchParams.fuel || '',
  //     limit:searchParams.limit || 10,
  //     model:searchParams.model || ''
  //   }
  // )
  const [allCars, setallCars] = useState([])
  const [loading, setloading] = useState(false)
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')
  const [fuel, setFuel] = useState('')
  const [year, setYear] = useState(2022)
  const [limit, setLimit] = useState(10)

  const getCars =async () => {
    try {
      const result = await fetchCars(
        {
          manufacturer:manufacturer || '',
          year:year || 2023,
          fuel:fuel || '',
          limit:limit || 10,
          model:model || ''
        })
        setallCars(result)
    } catch (error) {
       console.log(error)
    }finally{
      setloading(false)
    }
  
  }
  useEffect(() => {
  getCars()
  }, [fuel,year,limit,manufacturer,model]);
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars
  return (
    <main className="overflow-hidden">
        <Hero/>
        <div className='mt-12 padding-x max-width' id='discover'>
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'> Car Catalogue</h1>
            <p>explore the car ypu might like</p>
          </div>
          <div className="home__filter">
            <Searchbar setManufacturer={setManufacturer} setModel={setModel}/>
            <div className="home__filter-container">
              <Customfilter title='fuels' options={fuels} setFilter={setFuel}/>
              <Customfilter title='year' options={yearsOfProduction} setFilter={setYear}/>
            </div>
          </div>
          {
            allCars.length > 0 ?(
              <section> 
                <div className='home__cars-wrapper'>
                  {
                    allCars.map((car,index)=>(
                    <CarCard car={car} key={index}/>
                    ))
                  }
                </div >
                {loading && (
                  <div className='mt-16 w-full flex-center'>
                    <Image src='/loader.svg' alt='' width={50} height={50} className='object-containe'/>
                  </div>
                )}
                <ShowMore
                  pageNumber={limit/10}
                  isNext={limit > allCars.length}
                  setLimit={setLimit}
                />
              </section>
            ):(
              <div className='home__error-container'>
                <h2 className='text-black text-xl font-bold'>Oops, no result</h2>
                <p>{allCars?.message}</p>
              </div>
            )
          }
        </div>
   </main>
  )
}
