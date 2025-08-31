"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"

const SelectUI = ({title}) => {
    return (
        <Select.Root collection={frameworks} size="sm" width="320px">
            <Select.HiddenSelect />
            {title && <Select.Label>{title}</Select.Label>}
            <Select.Control>
                <Select.Trigger>
                <Select.ValueText placeholder="Select framework" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                <Select.Content zIndex={99999999}>
                    {frameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                    </Select.Item>
                    ))}
                </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})
export default SelectUI