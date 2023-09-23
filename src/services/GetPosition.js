export async function GetPosition(setloadingPos,setposition) {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      setloadingPos(true)

      navigator.geolocation.getCurrentPosition(
        async (location) => {
          const { latitude, longitude } = location.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            if (response.ok) {
              const data = await response.json();
              const city = data.address.city || data.address.town || data.address.village;
              setposition(true);
              resolve(city);
            } else {
               reject(new Error('Error al obtener datos de ubicación'));
            }
          } catch (error) {
            reject(error);
          }
          finally{
            setloadingPos(false)

          }
        },
        (error) => {
          setloadingPos(false)

          reject(error);
        }
      );
    } else {
      reject(new Error('La geolocalización no está disponible'));
    }
  });
}
