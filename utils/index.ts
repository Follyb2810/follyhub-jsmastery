import { fuels } from "@/component/constants";
import { CarProps, FilterProps } from "@/types";

const options = {
    method: 'GET',
    url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
    params: {model: 'corolla'},
    headers: {
      'X-RapidAPI-Key': '0da537d340mshc80cdfd3774d48ep1fb564jsnbf1c0de925d6',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
  };

  const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars/';


  export async function fetchCars(filters:FilterProps) {  
    const {manufacturer,year,fuel,limit,model} = filters
   const headers={
            'X-RapidAPI-Key': '0da537d340mshc80cdfd3774d48ep1fb564jsnbf1c0de925d6',
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
          }

     const response = await fetch(`${url}?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{headers})
     const result = await response.json()
     
     return result
           
  }

  export const calculateCarRent = (city:number,year:number)=>{
    const basePricePerDay = 50;
    const mileagefactor  = 0.1;
    const agefactor = 0.05;
    const mileageRate = city * mileagefactor
    const agerate = (new Date().getFullYear() - year) * agefactor;
    const rentalRatePerDay = basePricePerDay + mileageRate + agerate

    return rentalRatePerDay
   }


   export const generateCarImageUrl =(car:CarProps,angle?:string)=>{
    const url = new URL('https://cdn.imagin.studio/getimage')
    const {make,year,model} = car
    url.searchParams.append('customer','hrjavascript-mastery')
    url.searchParams.append('make',make)
    url.searchParams.append('modelFamily',model.split(' ')[0])
    url.searchParams.append('modelYear',`${year}`)
    url.searchParams.append('angle',`${angle}`)
  return `${url}`
   }

   export const updateSearchParams =(type:string,value:string)=>{
    let newPathName =''
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(type,value)
      newPathName =`${window.location.pathname}?${searchParams.toString()}`
    return newPathName
    }