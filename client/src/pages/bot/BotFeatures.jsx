import { useEffect, useState } from "react";
import { Flex, Group, Highlight  } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PaginationUI, TextUI, SwitchUI } from "@ui";
import { CardItemUI, controlIconType } from "@misc";
import { botFeatureAPI, botAPI } from "@requests";
import { showToast } from "@partials"


export default function BotFeatures() {

    const { botId } = useParams();
    const [features, setFeatures] = useState([]);
    const [botDetail, setBotDetail] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const limit = 9;

    const fetchBotFeatures = async () => {
        const response = await botFeatureAPI.getFeatures(botId, page, limit);
        setFeatures(response.data);
        setTotalItems(response.totalItems);
    };

    const fetchBotDetails = async (id) => {
        try {
            const response = await botAPI.getBotById(id);
            setBotDetail(response.data);
        } catch (error) {
            console.error("Error fetching bot details:", error);
        }
    }

    const handleBotFeatureUpdate = async (featureId, newValue) => {
        return await botFeatureAPI.updateBotFeatureStatus({ botId: botDetail._id, featureId, status: newValue });
    };

    const handleSwitchChange = async (featureId, newValue) => {
        const result = await handleBotFeatureUpdate(featureId, newValue);
        if(result?.status){
            showToast({
                message: `Özellik durumu başarıyla güncellendi.`,
                type: 'success',
                id: 'bot-feature-update-success',
                duration: 3000
            });
        } else {
            showToast({
                message: 'Özellik durumu güncellenemedi.',
                type: 'error',
                id: 'bot-feature-update-error',
                duration: 3000
            });
        }
        setFeatures((prevFeatures) =>
            prevFeatures.map((feature) =>
                feature.feature._id === featureId ? { ...feature, status: newValue } : feature
            )
        );
    };

    useEffect(() => {
        fetchBotDetails(botId)
        fetchBotFeatures();
    }, []);

    useEffect(() => {
        fetchBotFeatures(page, limit);
    }, [page]);

    return (
        <Flex direction="column" p={4}>

            <Group mb={4} width="100%" display="flex" justifyContent={{
                base: "center",
                sm: "center",
                md: "flex-start"
            }}>
                <TextUI fontSize="2xl" fontWeight="bold" mb={4}>
                    <Highlight query={botDetail?.username ? botDetail.username : "  "}
                        styles={{ px: "1.5", bg: "teal.muted", borderRadius: "sm"}}
                    >{botDetail?.username ? botDetail.username : "  "}</Highlight> Bot Özellikleri
                </TextUI>
            </Group>
            <Flex wrap="wrap" gap={4} mb={4} justify="flex-start">
                {features?.length > 0 ? (
                    features.map((feature, fid) => (
                        <CardItemUI 
                            key={fid} 
                            title={feature?.feature.name} 
                            description={feature?.feature.description || "Açıklama yok"} 
                            icon={controlIconType(feature?.feature?.type)} 
                            childrenFooter={<SwitchUI checked={feature?.status} setChecked={(value) => handleSwitchChange(feature?.feature?._id, value)} />}

                            // detailButton="Detay" 
                            // detailClick={() => null}
                            // addButton="Ekle" 
                            // addClick={()=> null}
                        />

                    ))
                ) : (
                    <TextUI>Bota Özellik Eklenmemiş.</TextUI>
                )}
                
            </Flex>
            <Flex mt={10} justify="center">
                {features?.length > 0 ? ( 
                    <PaginationUI 
                        totalItems={totalItems}
                        limit={limit}
                        currentPage={page}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                ) : null}
            </Flex>
        </Flex>
    );
}
