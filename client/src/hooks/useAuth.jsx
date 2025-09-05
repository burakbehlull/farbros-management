import { userAPI } from "../helpers/requests"
import { useCookie } from "../helpers/cookies"

export default function useAuth() {
    
    const { getToken, removeToken, setToken } = useCookie()

    const result = userAPI.accessTokenVerify()

    return result
}