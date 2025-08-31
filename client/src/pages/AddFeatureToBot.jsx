import { useEffect, useState, useRef } from "react";
import { Flex, Group } from "@chakra-ui/react";

import { PaginationUI, TextUI } from "@ui";
import { CardItemUI, controlIconType } from "@misc";
import { featureAPI } from "@requests";
import { AddFeatureModal } from "@modals";

export default function AddFeatureToBot() {

    const [features, setFeatures] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 9;

    const fetchFeatures = async () => {
        const response = await featureAPI.getFeatures(page, limit );
        console.log(response);
        setFeatures(response.data);
        setTotalItems(response.totalItems);
    };

    useEffect(() => {
        fetchFeatures();        
    }, []);

    useEffect(() => {
        fetchFeatures(page, limit);
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
                    Özellikler
                </TextUI>
            </Group>
            <Flex wrap="wrap" gap={4} mb={4} justify="flex-start">
                {features.length > 0 ? (
                    features.map((feature, fid) => (
                        <CardItemUI 
                            key={fid} 
                            title={feature.name} 
                            description={feature.description || "Açıklama yok"} 
                            icon={controlIconType(feature.type)} 

                            detailButton="Detay" 
                            detailClick={() => alert(`Detay for ${feature.name}`)}

                            addButton="Ekle" 
                            addClick={()=> {
                                setSelectedFeature(feature);
                                clickRef.current.click();
                            }}
                        />

                    ))
                ) : (
                    <TextUI>Özellik yok.</TextUI>
                )}
                <AddFeatureModal 
                    clickRef={clickRef} 
                    data={selectedFeature} 
                />
            </Flex>
            <Flex mt={10} justify="center">
                <PaginationUI 
                    totalItems={totalItems}
                    limit={limit}
                    currentPage={page}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </Flex>
        </Flex>
    );
}
