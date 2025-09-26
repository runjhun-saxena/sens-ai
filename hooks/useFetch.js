import { useState } from "react"
import { toast } from "sonner"
import { set } from "zod"


const useFetch = (cb) => {
const [data, setData] = useState(undefined)
const [loading, setLoading] = useState(null)
const [error, setError] = useState(null)

const fn = async(...args) =>{ // this is what we will need to fetch api 
    setLoading(true)
setError(null)

try{
    const response = await cb(...args);
    setData(response);
setError(null)


} catch(error){
    setError(error);
    toast.error(error.message);

}
finally{
    setLoading(false)
}

}

return  {data , loading , error , fn , setData}

}
export default useFetch;