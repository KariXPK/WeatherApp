



 import {client} from '../consts/API-KEYS'


export async function GetImg(query,setimg){
   
    
    
    try {
        client.photos.search({ query, per_page: 1 }).then(photos => {setimg(photos.photos[0].src.original)});
        
       
        
    } catch (error) {
         console.error(`No hay imágens para ${query}`);
    }
}