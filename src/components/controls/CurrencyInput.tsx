import { NativeSelect, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

const data = [
    { value: 'EUR', label: '🇪🇺 EUR' },
    { value: 'PLN', label: '🇵🇱 PLN' }
];

type CurrencyInputState = [number | undefined, string | undefined]

function CurrencyInput({ rate, setRate, label } : { rate : CurrencyInputState, setRate: Dispatch<SetStateAction<CurrencyInputState>>, label: string } ) {
    const select = (
        <NativeSelect
            data={data}
            styles={{
                input: {
                    fontWeight: 500,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                },
            }}
            onChange={(event) => setRate((prev) => [prev[0], event.target.value])}
        />
    );

    return (
        <TextInput
            type="number"
            rightSection={select}
            rightSectionWidth={92}
            label = {label}
            value={rate[0]}
            onChange={(event) => setRate((prev) => [Number.parseFloat(event.target.value), prev[1]])}
        />
    );
}

export { CurrencyInput }