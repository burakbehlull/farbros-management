import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { botAPI } from '@requests'


export default function BotPage() {

    // auth 
    const { someData } = useOutletContext();
    console.log("Outlet context data:", someData);


    const { botId } = useParams();
    const [botDetail, setBotDetail] = useState(null);

    const fetchBotDetails = async (id) => {
        try {
            const response = await botAPI.getBotById(id);
            console.log("Bot details:", response);
            setBotDetail(response.data);
        } catch (error) {
            console.error("Error fetching bot details:", error);
        }
    }

    useEffect(() => {
        fetchBotDetails(botId);
    }, [botId]);

    return (
        <>
            <h1>Bot Page - {botDetail?.username}</h1>
            <p>Bot ID: {botDetail?.botId}</p>
        </>
    );
}