import { useParams } from "react-router-dom";

export default function BotPage() {
    const { botId } = useParams();
    return (
        <>
            <h1>Bot Page</h1>
            <p>Bot ID: {botId}</p>
        </>
    );
}