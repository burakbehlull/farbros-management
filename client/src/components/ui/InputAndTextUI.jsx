import { Field, Input } from "@chakra-ui/react"

const InputAndTextUI = ({ label, helperText, ...props }) => {
    return (
        <Field.Root required>
            <Field.Label>
                {label} <Field.RequiredIndicator />
            </Field.Label>
            <Input {...props} />
            {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
        </Field.Root>
    )
}

export default InputAndTextUI
