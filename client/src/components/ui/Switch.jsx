import { Switch } from "@chakra-ui/react"

const SwitchUI = ({text, checked, setChecked, size}) => {
    return (
        <Switch.Root
            checked={checked}
            size={size}
            onCheckedChange={(e) => setChecked(e.checked)}
        >
            <Switch.HiddenInput />
            <Switch.Control />
            {text && <Switch.Label>{text}</Switch.Label>}
        </Switch.Root>
    )
}
export default SwitchUI