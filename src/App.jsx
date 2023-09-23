import React, { useState ,useRef} from 'react';
import './App.css';
import { GetPosition } from './services/GetPosition';
import {ThreeDots} from 'react-loader-spinner'
import Weather from './Components/Weather'
import { useDebounce } from "use-debounce";

function App() {
  const [city, setCity] = useState("");
  const [loadingPos, setloadingPos] = useState(false)
  const cityInput = useRef();
  const [img, setimg] = useState()
  let [debouncedValue] = useDebounce(city, 1000);
  
  const [position, setposition] = useState(false)
 
  async function handleClick(event) {
    try {
      debouncedValue = "";
      
      const cityFromApi = await GetPosition(setloadingPos,setposition);
      setCity(cityFromApi);
       
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      
    }
  }
  function handleChange(){
   
       
      setCity(cityInput.current.value)
  
 
  }

  return (
    <section
      className="flex gap-5 justify-center items-center flex-col w-screen h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url("${!img ? "src/assets/sky.jpg" : img}")` }}
    >
      <div className='flex gap-2'>
      <input
        ref={cityInput}
        onChange={handleChange}
        type="text"
        value={city}
        className="w-64 px-3 outline-none py-2 rounded"
        placeholder="New York, Roma , Madrid..."
      />
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full" onClick={handleClick}>Usar Ubicación</button>
      </div>
      

      {(debouncedValue && !loadingPos) && (
        <Weather debouncedValue={debouncedValue} setimg={setimg}></Weather>
      )}
     
      {loadingPos && (
        <div className="relative h-96 pb-9 w-2/5 flex gap-4 justify-center items-center bg-gray-300 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 shadow-lg border-gray-300">
          <h4 className="text-xl font-semibold opacity-80 flex gap-1">
            Obteniendo Ubicación{" "}
            {
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#0c0b0b"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ paddingTop: "2%" }}
                wrapperClassName=""
                visible={true}
              />
            }
          </h4>
        </div>
      )}
    </section>
  );
}

export default App;
