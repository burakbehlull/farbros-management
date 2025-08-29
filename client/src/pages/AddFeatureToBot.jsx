import { SimpleGrid } from "@chakra-ui/react";
import { CardUI } from "@ui";

export default function AddFeatureToBot() {
  return (
    <SimpleGrid 
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
      spacing={4} 
      mb={6}
      gap={8}
    >
      <CardUI 
        title="Bota Özellik Ekle" 
        description="Bu alandan bota yeni özellikler ekleyebilirsiniz." 
      />
      <CardUI 
        title="Bota Özellik Ekle" 
        description="Bu alandan bota yeni özellikler ekleyebilirsiniz." 
      />
      <CardUI 
        title="Bota Özellik Ekle" 
        description="Bu alandan bota yeni özellikler ekleyebilirsiniz." 
      />
      <CardUI 
        title="Bota Özellik Ekle" 
        description="Bu alandan bota yeni özellikler ekleyebilirsiniz." 
      />
    </SimpleGrid>
  );
}
