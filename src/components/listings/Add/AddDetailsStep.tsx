import { UseFormReturnType } from "@mantine/form"
import { FormValues } from "./AddListing"
import { NumberInputWithSideControls } from 'components/controls/NumberInputWithSideControls'
import { Checkbox } from '@mantine/core'

type Props = {
    form: UseFormReturnType<FormValues>
}

function AddDetailsStep(props: Props) {
    const form = props.form
    return (
        <>
                    <NumberInputWithSideControls label="Number of bedrooms" {...form.getInputProps('bedrooms')} />
                    <NumberInputWithSideControls label="Number of bathrooms" {...form.getInputProps('bathrooms')} />
                    <NumberInputWithSideControls label="Allowed guests" {...form.getInputProps('guestsLimit')} />
                    <Checkbox label="Pets allowed?" {...form.getInputProps('petFriendly')} />
        </>
    )
}
export { AddDetailsStep }