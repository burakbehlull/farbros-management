import { userAPI } from "@requests"
import { useEffect, useState } from "react"

export default function useAuth() {
    const [data, setData] = useState()

    const init = async ()=> {

        const result = await userAPI.accessTokenVerify()
        setData(result)
    }

    useEffect(()=>{
        init()
    }, [])
    
    console.log(data)
    return data
}