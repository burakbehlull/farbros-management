import { Field, Input } from "@chakra-ui/react"

const InputAndTextUI = ({ label, helperText, errorText, ...props }) => {
    const isError = errorText ? true : false;
    return (
        <Field.Root invalid={isError} required>
            <Field.Label>
                {label} <Field.RequiredIndicator />
            </Field.Label>
            <Input {...props} />
            {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
            {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
        </Field.Root>
    )
}

export default InputAndTextUI
