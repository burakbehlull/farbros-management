import { useParams, useOutletContext } from "react-router-dom";

export default function BotPage() {

    const { botId } = useParams();
    const { someData } = useOutletContext();
    console.log("Outlet context data:", someData);
    
    return (
        <>
            <h1>Bot Page</h1>
            <p>Bot ID: {botId}</p>
        </>
    );
}