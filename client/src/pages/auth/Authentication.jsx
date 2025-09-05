import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@hooks";

export default function Authentication() {

    const navigate = useNavigate()

    const isAuth = useAuth()

    const isUser = isAuth?.isUser
    const isExpired = isAuth?.expired

    if(!isUser || isExpired) {
        navigate('/')
        return
    }
    
    return <Outlet />
}