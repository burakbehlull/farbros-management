import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Flex, Box, Group, Highlight } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { BiLeftArrowAltIcon } from "@icons";

import { botAPI } from '@requests'
import { TextUI, InputAndTextUI, ButtonUI, SelectUI } from '@ui'

import { showToast } from "@partials"


const statusFlags = [
	{label: 'idle', value: 'idle'},
    {label: 'dnd', value: 'dnd'},
    {label: 'online', value: 'online'},
    {label: 'offline', value: 'offline'},
]
const presenceFlags = [
    {label: 'Playing', value: 0},
    {label: 'Streaming', value: 1},
    {label: 'Listening', value: 2},
    {label: 'Watching', value: 3},
]

export default function BotPanel() {
	const { botId } = useParams();
	const navigate = useNavigate()
	
	const [botDetail, setBotDetail] = useState(null);
	const [config, setConfig] = useState({
		presenceName: '',
		presenceType: '',
		status: ''
	});
	
	const fetchBotDetails = async (id) => {
        try {
            const response = await botAPI.getBotById(id);
            setBotDetail(response.data);
        } catch (error) {
            console.error("Error fetching bot details:", error);
        }
    }
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setConfig((prev) => ({
		  ...prev,
		  [name]: value
		}));
	};
	
	async function handleSubmit(){
		const result = await botAPI.presence(botId,{
			presenceName: config.presenceName,
			presenceType: config.presenceType[0],
			status: config.status[0]
		})
		
		if(!result?.status){
			showToast({
				message: `Özellik eklenemedi: ${result?.message || result?.error}`,
				type: 'error',
				id: 'bot-panel',
				duration: 3000
			})
		}
		
		showToast({
            message: `${result?.message}`,
            type: 'success',
            id: 'bot-panel',
            duration: 3000
        });
		
	}
	
	useEffect(() => {
        fetchBotDetails(botId);
    }, [botId]);
	
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
                        styles={{ px: "1.5", bg: "yellow.300", borderRadius: "sm"}}
                    >{botDetail?.username ? botDetail.username : "  "}</Highlight> Bot Paneli
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
					value={config?.presenceName}
					onChange={(e)=> setConfig({...config, presenceName: e.target.value})}
                    label="Bot Durumu" 
                    placeholder="Bot durumu giriniz.."
					
                />
                <SelectUI
                    value={config?.presenceType}
                    title="Bir aksiyon seçin: "
                    items={presenceFlags}
                    setValue={(val) => setConfig({...config, presenceType: val})}
                />
				
				<SelectUI
                    value={config?.status}
                    title="Bir bot durum seçin: "
                    items={statusFlags}
                    setValue={(val) => setConfig({...config, status: val})}
                />
					
                <Group>
                    <ButtonUI onClick={handleSubmit}>Güncelle</ButtonUI>
                </Group>
            </Box>
        </>
    );
}