import { useEffect, useState } from "react";
import { Flex, Group } from "@chakra-ui/react";

import { PaginationUI, TextUI } from "@ui";
import { CardItemUI, controlIconType } from "@misc";
import { featureAPI } from "@requests";

export default function AddFeatureToBot() {

    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const fetchFeatures = async () => {
            const response = await featureAPI.getFeatures();
            console.log(response);
            setFeatures(response.data);
        };

        fetchFeatures();
    }, []);


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
                <PaginationUI />
            </Flex>
        </Flex>
    );
}
