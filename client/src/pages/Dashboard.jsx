import { LoginModal } from "@modals"
import { useRef } from "react";

export default function Dashboard(){
    const xRef = useRef()
    return (
        <>
            <h1>Dashboard</h1>
            <LoginModal clickRef={xRef} />
            <button onClick={()=> xRef.current.click()}>aç</button>
        </>
    );
}