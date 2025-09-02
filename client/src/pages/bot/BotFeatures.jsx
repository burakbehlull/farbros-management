import { useEffect, useState, useRef } from "react";
import { Flex, Group } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PaginationUI, TextUI } from "@ui";
import { CardItemUI, controlIconType } from "@misc";
import { botFeatureAPI } from "@requests";

export default function BotFeatures() {

    const { botId } = useParams();
    const [features, setFeatures] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 9;

    const fetchBotFeatures = async () => {
        const response = await botFeatureAPI.getFeatures(botId, page, limit);
        setFeatures(response.data);
        setTotalItems(response.totalItems);
    };

    useEffect(() => {
        fetchBotFeatures();        
    }, []);

    useEffect(() => {
        fetchBotFeatures(page, limit);
    }, [page]);

    const clickRef = useRef();

    return (
        <Flex direction="column" p={4}>

            <Group mb={4} width="100%" display="flex" justifyContent={{
                base: "center",
                sm: "center",
                md: "flex-start"
            }}>
                <TextUI fontSize="2xl" fontWeight="bold" mb={4}>
                    Bot Özellikleri
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

                            // detailButton="Detay" 
                            // detailClick={() => null}

                            addButton="Ekle" 
                            addClick={()=> {
                                setSelectedFeature(feature);
                                clickRef.current.click();
                            }}
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
