import {useState,useEffect} from 'react'
import {GetWeather} from '../services/GetWeather'

import {RotatingLines} from 'react-loader-spinner'
import Loading from '../Components/Loading'

function Weather({debouncedValue ,setimg}) {
    const [error, seterror] = useState(false)
    const [weather, setweather] = useState(null)
    const [loadingWeather, setloadingWeather] = useState(true)

     
   useEffect(() => {
        GetWeather(debouncedValue,seterror,setweather,setloadingWeather,debouncedValue,setimg);
         
   }, [debouncedValue])

    


    
   
   

  return (
    <div className="relative h-96 pb-9 w-2/5 flex gap-4 justify-between bg-gray-300 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 shadow-lg border-gray-300">
      {weather && weather.current && (
        <>
          {" "}
          <div className="w-1/2  h-full flex justify-center items-center">
            <img className="w-3/4" src={weather.current.condition.icon}></img>
          </div>
          <div className="w-1/2 h-full gap-3 flex justify-center pl-8 items-start flex-col">
            <h3 className="font-sans text-xl">Today</h3>
            <h1 className="font-sans font-bold text-3xl">
              {debouncedValue
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
            <h3 className="font-sans text-xl">
              Temperature: {weather.current.temp_c} °C
            </h3>
            <h4>
              <i>{weather.current.condition.text}</i>
            </h4>
          </div>{" "}
          <div className="absolute flex items-end justify-evenly  gap-4 w-full h-full ">
            {weather.forecast.forecastday.map((e, i) => {
              if (i === 0) return;
              return (
                <div
                  key={i}
                  className="relative w-36 h-36  rounded-3xl translate-y-20 bg-clip-padding   px-2 py-3 items-center bg-gray-300  backdrop-filter backdrop-blur-sm bg-opacity-20 shadow-lg flex flex-col justify-between "
                >
                  <h3 className="text-sm font-bold">
                    {new Date(e.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </h3>
                  <img
                    src={e.day.condition.icon}
                    alt=""
                    className="w-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  "
                  />
                  <h4 className="text-xs font-semibold">
                    {e.day.avgtemp_c} °C
                  </h4>
                </div>
              );
            })}
          </div>
        </>
      )}

      {!weather ||
        (!weather.current && (
          <div className="h-full w-full flex justify-center flex-col items-center gap-11">
            <h2 className="text-xl font-sans text-slate-900 opacity-70">
              {weather.error.message}
            </h2>

            <i className="fa-regular fa-face-frown-open text-9xl text-gray-600  opacity-75 motion-safe:animate-bounce "></i>
          </div>
        ))}
      {loadingWeather && (
        <>
          {" "}
    
   <Loading/> 
          
   
          {" "}
           


        </>
      )}
    </div>
  );
}

export default Weather


