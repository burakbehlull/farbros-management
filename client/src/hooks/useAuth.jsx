import { setAuthorization, userAPI } from "@requests"
import { useCookie } from "@cookies"
import { useEffect, useState } from "react"

export default function useAuth() {
    const [data, setData] = useState()
    const { getToken } = useCookie()

    const init = async ()=> {
        const accessToken = getToken()
        setAuthorization(accessToken)

        const result = await userAPI.accessTokenVerify()
        setData(result)
    }

    useEffect(()=>{
        init()
    }, [])
    
    console.log(data)
    return data
}