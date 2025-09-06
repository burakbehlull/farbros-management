import { userAPI } from "@requests"
import { useEffect, useState } from "react"
import { useStore } from "@hooks"

export default function useAuth() {
    const [data, setData] = useState()
    const { setUser } = useStore()

    const init = async ()=> {

        const result = await userAPI.accessTokenVerify()
        if(result.expired===false) setUser({
            expired: result?.expired,
            isUser: result?.isUser,
            username: result?.data?.username,
            id: result?.data?._id
        })
        setData(result)
    }

    useEffect(()=>{
        init()
    }, [])
    
    // console.log(data)
    return data
}