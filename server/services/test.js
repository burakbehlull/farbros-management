import { generateAccessToken, verifyAccessToken, isExpired } from "./tokenService.js"


const at = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ1cnhrMSIsImlhdCI6MTc1NzAyMTI2MCwiZXhwIjoxNzU3MDIxMjgwfQ.497uLTwarRmypgNIOylneNIuOJgkNnBG3yR3JSXI5Rc"


console.log("verify,", verifyAccessToken(at))
console.log("expired ?,", isExpired(at))

