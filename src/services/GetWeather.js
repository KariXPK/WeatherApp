import {GetImg} from '../services/GetImg'
import {weatherApiKey} from '../consts/API-KEYS'
export async function GetWeather(city,seterror,setweather,setloadingWeather,debouncedValue,setimg){
  setloadingWeather(true)
  
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=6`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": weatherApiKey,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
      
      setweather(JSON.parse(result));
      if(JSON.parse(result).current) GetImg(debouncedValue,setimg)
     
      setloadingWeather(false);
   
  } catch (error) {
    seterror(true);
    console.error(error);
  }finally{
    setloadingWeather(false);
  }
}