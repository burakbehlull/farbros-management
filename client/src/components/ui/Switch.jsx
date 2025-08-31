import { Switch } from "@chakra-ui/react"

const SwitchUI = ({text, checked, setChecked}) => {
    return (
        <Switch.Root
            checked={checked}
            onCheckedChange={(e) => setChecked(e.checked)}
        >
            <Switch.HiddenInput />
            <Switch.Control />
            {text && <Switch.Label>{text}</Switch.Label>}
        </Switch.Root>
    )
}
export default SwitchUI