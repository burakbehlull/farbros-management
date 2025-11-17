import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Group, Highlight, Flex } from '@chakra-ui/react'
import { BiLeftArrowAltIcon } from "@icons";

import { messageAPI, botAPI } from '@requests'
import { TextUI, InputAndTextUI, ButtonUI, SelectUI } from '@ui'

import { showToast } from "@partials"

export default function BotMessagePanel() {
	const { botId } = useParams();
	const navigate = useNavigate()
	
	const [botDetail, setBotDetail] = useState(null);
    const [servers, setServers] = useState([]);
    const [channels, setChannels] = useState([]);
    const [users, setUsers] = useState([]);
    const [messageData, setMessageData] = useState([]);
	const [message, setMessage] = useState({
		text: '',
		server: '',
		channel: '',
        user: '',
        msg: '',
        type: '',
        genre: ''
	});
	
	const fetchBotDetails = async (id) => {
        try {
            const response = await botAPI.getBotById(id);
            setBotDetail(response.data);
        } catch (error) {
            console.error("Error fetching bot details:", error);
        }
    }
	
	async function handleSubmit(){
		const result = await messageAPI.createMessage(botId,{
			content: message.text,
			serverId: message.server[0],
			channelId: message.channel[0],
            userId: message.user,
            type: message.type[0],
            genre: message.genre[0],
            messageId: message.msg[0]
        })

        console.log(`
Submitting message with data: ${JSON.stringify({
            content: message.text,
            serverId: message.server[0],
            channelId: message.channel[0],
            userId: message.user,
            type: message.type[0],
            genre: message.genre[0],
            messageId: message.msg[0]
        })}
        `)

        console.log(result)
		
		if(!result?.status){
			showToast({
				message: `Özellik mesajı eklendi: ${result?.message || result?.error}`,
				type: 'error',
				id: 'bot-message-panel',
				duration: 3000
			})
		}
		
		showToast({
            message: `${result?.message}`,
            type: 'success',
            id: 'bot-message-panel',
            duration: 3000
        });
		
	}
	
    async function fetchData(){
	
        const result = await botAPI.servers(botId);

        const serversData = result?.data?.map((server) => ({
            label: server.name,
            value: server.id
        }));

        setServers(serversData)
    }

    async function getServerData(){
	
        const result = await botAPI.getBotData(botId, message?.server[0]);


        const serverChannelData = result?.data?.channels?.map((server) => ({
            label: server.name,
            value: server.id
        }));

        setChannels(serverChannelData)

        const serverUserData = result?.data?.members?.map((server) => ({
            label: server.displayName,
            value: server.userId
        }));

        setUsers(serverUserData)
    }

    async function getMessagesData(){
        const result = await messageAPI.getMessages(botId,{
            userId: message?.user,
            serverId: message?.server[0],
            channelId: message?.channel[0],
            type: message?.type[0]
        });

        const targetMessageData = result?.data?.messages?.map((message) => ({
            label: message.content,
            value: message.id
        }));

        setMessageData(targetMessageData)
    }


	useEffect(() => {
        fetchBotDetails(botId);
		fetchData();
    }, [botId]);

    useEffect(() => {
        getServerData()
    }, [message?.server]);
    
    useEffect(() => {
        getMessagesData()
    }, [message?.channel, message?.user, message?.type]);

    return (
        <>
		  <Group mb={4}>
				<BiLeftArrowAltIcon boxSize={6} cursor="pointer" onClick={()=> navigate(-1)} />
          </Group>
          <Group mb={4} width="100%" display="flex" justifyContent={{
                base: "center",
                sm: "center",
                md: "flex-start"
            }}>
                <TextUI fontSize="2xl" fontWeight="bold" mb={4}>
                    <Highlight query={botDetail?.username ? botDetail.username : "  "}
                        styles={{ px: "1.5", bg: "blue.200", borderRadius: "sm"}}
                    >{botDetail?.username ? botDetail.username : "  "}</Highlight> Bot Mesage Paneli
                </TextUI>
            </Group>
			
			<Box 
                flex="0 0 50%" 
                p="4" 
                display={"flex"}
                gap={4}
                flexDirection={"column"}
            >
                <InputAndTextUI 
					value={message?.text}
					onChange={(e)=> setMessage({...message, text: e.target.value})}
                    label="Mesaj İçeriği" 
                    placeholder="Mesaj..."
					
                />

                <Flex gap={4}>
                    <SelectUI
                        value={message?.type}
                        title="Tür Seçin:  "
                        items={[
                            {label: 'Sunucu', value: 'guild'},
                            {label: 'Kullanıcı', value: 'dm'}
                        ]}
                        setValue={(val) => setMessage({...message, type: val})}
                    />

                    <SelectUI
                        value={message?.type}
                        title="Gönderim Türü:  "
                        items={[
                            {label: 'Direkt Gönder', value: 'send'},
                            {label: 'Mesajı Yanıtla', value: 'reply'}
                        ]}
                        setValue={(val) => setMessage({...message, genre: val})}
                    />
                </Flex>

                <Flex gap={4}>
                    <SelectUI
                        value={message?.server}
                        title="Bir sunucu seçin: "
                        items={servers}
                        setValue={(val) => setMessage({...message, server: val})}
                    />
                    
                    <SelectUI
                        value={message?.channel}
                        title="Bir Kanal seçin: "
                        items={channels}
                        setValue={(val) => setMessage({...message, channel: val})}
                    />

                    <SelectUI
                        value={message?.msg}
                        title="Yanıtlanacak Mesajı seçin: "
                        items={messageData ? messageData : []}
                        setValue={(val) => setMessage({...message, msg: val})}
                    />
                </Flex>

                

                {/*
                <SelectUI
                    value={message?.user}
                    title="Bir Kullanıcı seçin: "
                    items={users}
                    setValue={(val) => setMessage({...message, user: val})}
                />
                */  }

                <InputAndTextUI 
					value={message?.user}
					onChange={(e)=> setMessage({...message, user: e.target.value})}
                    label="Kullanıcı ID'si" 
                    placeholder="ID..."
					
                />
					
                <Group>
                    <ButtonUI onClick={handleSubmit}>Gönder</ButtonUI>
                </Group>
            </Box>
        </>
    );
}