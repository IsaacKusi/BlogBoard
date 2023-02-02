import {useEffect, useState} from 'react';
import axios from 'axios';

const useAxiosFetch = ()=>{
    const [data, setData] = useState()
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect((dataUrl)=>{
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async(url)=>{
            setIsLoading(true);
            try{
                const response = axios.get(url,{
                     cancelToken:source.token       
                })

                if (isMounted){
                    setData(response.data)
                    setFetchError(null)
                }
            }catch(err){
                if(isMounted){
                    setFetchError(err.message)
                    setData([])
                }

            }finally{
                ismounted && setTimeout(()=>setIsLoading(false), 2000)
            }
        }

        fetchData(dataUrl)
        const cleanUp = ()=>{
            isMounted=false;
            source.cancel();
        }

        return cleanUp;
    },[dataUrl])

    return {data,fetchError,isLoading}

}

export default useAxiosFetch;