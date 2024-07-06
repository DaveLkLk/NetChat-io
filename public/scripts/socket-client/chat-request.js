export async function getData(urlParam){
    try{
        const response = await fetch(urlParam)
        if(!response.ok){
            throw new Error("Falló respuesta del servidor")
        }
        const data = await response.json()
        return data
    }
    catch(error){
        console.log(error);
    }
}