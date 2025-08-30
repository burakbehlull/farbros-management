import { useEffect, useState } from "react";
import { Flex, Group } from "@chakra-ui/react";

import { PaginationUI, TextUI } from "@ui";
import { CardItemUI, controlIconType } from "@misc";
import { featureAPI } from "@requests";

export default function AddFeatureToBot() {

    const [features, setFeatures] = useState([]);
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
        fetchFeatures(2, limit);
    }, [page]);


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
                        <CardItemUI key={fid} title={feature.name} description={feature.description || "Açıklama yok"} icon={controlIconType(feature.type)} />
                    ))
                ) : (
                    <TextUI>Botunuz yok.</TextUI>
                )}
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
