import { Flex, Group } from "@chakra-ui/react";
import { InputAndTextUI, ButtonUI, TextUI } from "@ui"
import { BotCreateSchema } from "@schemas"
import { botAPI } from "@requests"
import { showToast } from "@partials"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function BotCreatePage(){

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(BotCreateSchema)
    });

    const handleCreateBot = async (data) => {
        try {
            const response = await botAPI.addBot({
                token: data.token,
                userId: "68ae0bbe6642cd4b63ed9dcd"
            })
            showToast({
                message: `${response.bot.username} Bot başarıyla oluşturuldu.`,
                type: 'success',
                id: 'bot-create-success',
                duration: 3000
            });
        } catch (error) {
            showToast({
                message: 'Bot oluşturulamadı.',
                type: 'error',
                id: 'bot-create-error',
                duration: 3000
            });
            console.error('Error creating bot:', error);
        }
    };

    const onSubmit = (data) => {
        handleCreateBot(data);
    };

    return (
        <Flex direction="column" align="flex-start" justify="center">
            <Group mb={4} width="100%" display="flex" justifyContent={{
                base: "center",
                sm: "center",
                md: "flex-start"
            }}>
                <TextUI fontSize="2xl" fontWeight="bold" mb={4}>
                    Bot Ekle
                </TextUI>
            </Group>
            <Group 
                mt={4}
                width={{
                    base: "90vw",
                    sm: "90vw",
                    md: "600px"
                }}
                spacing={4} 
                gap={10}
                p={4}
                height="auto"
                display="flex"
                flexDirection={{
                    base: "column",
                    sm: "column",
                    md: "column"
                }}
            >
                <InputAndTextUI label="Bot Token" placeholder="Enter bot token" errorText={errors?.token?.message} {...register('token')}
                />
                <ButtonUI onClick={handleSubmit(onSubmit)}>Oluştur</ButtonUI>
            </Group>
        </Flex>
    );
}