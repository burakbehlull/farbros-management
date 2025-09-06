import { useEffect, useState } from "react";
import { ModalUI, SelectUI, TextUI } from "@ui"
import { userAPI, botFeatureAPI } from "@requests";
import { showToast } from "@partials"
import { useStore } from "@hooks"

export default function AddFeatureModal({ clickRef, data }){

    const [bots, setBots] = useState([]);
    const [selectedBot, setSelectedBot] = useState([]);

    const { getUser } = useStore()
    const user = getUser()

    const addFeature = async () => {
        const response = await botFeatureAPI.addOneFeature({
            botId: selectedBot,
            feature: data._id
        })
        
        if (response.status) {
            showToast({
                message: `${response.message}`,
                type: 'success',
                id: 'add-feature-success',
                duration: 3000
            });
        } else {
            showToast({
                message: `Özellik eklenemedi: ${response.message || response.error}`,
                type: 'error',
                id: 'add-feature-error',
                duration: 3000
            });
        }
    };

    const fetchBots = async () => {
            const response = await userAPI.getUserBots('68ae0bbe6642cd4b63ed9dcd')
            setBots(response.bots.bots);
    };

    const handleSubmit = () => addFeature()

    useEffect(() => {
        fetchBots();
    }, []);

    return (
        <>
            <ModalUI
                clickName="Ekle"
                modalTitle="Özellik Ekle"
                content={<p></p>}
                clickRef={clickRef}
                onClick={handleSubmit}
            >
                <TextUI mb={2}>
                    Komut Adı: <strong>{data?.name}</strong>
                    <br />
                    Komut Tipi: <strong>{data?.type}</strong>
                </TextUI>
                <TextUI>Özellikleri kaldırmak ve güncellemek için botlar kısmından bota gidin.</TextUI>
                <SelectUI
                    value={selectedBot}
                    title="Özellik ekleyeceğiniz botu seçin:"
                    items={bots.map(bot => ({ value: bot._id, label: bot.username }))}
                    setValue={(val) => setSelectedBot(val)}
                />
            </ModalUI>
        </>
    )
}