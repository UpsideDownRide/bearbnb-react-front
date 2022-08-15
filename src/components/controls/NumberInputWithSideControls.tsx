import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon, NumberInputHandlers, Space,  } from '@mantine/core';

function NumberInputWithSideControls({...props}) {
    const [value, setValue] = useState(0);
    const handlers = useRef<NumberInputHandlers>();
    const {label, ...restProps} = props

    return (
        <>
            <label style={{fontSize: "14px"}}>{label}</label>
            <Space h="sm" />
            <Group spacing={5}>
                <ActionIcon size={36} variant="default" onClick={() => handlers?.current?.decrement()}>
                    –
                </ActionIcon>

                <NumberInput
                    hideControls
                    value={value}
                    onChange={(val) => val ? setValue(val) : null}
                    handlersRef={handlers}
                    max={10}
                    min={0}
                    step={1}
                    styles={{ input: { width: 50, textAlign: 'center' } }}
                    {...restProps}
                />

                <ActionIcon size={36} variant="default" onClick={() => handlers?.current?.increment()}>
                    +
                </ActionIcon>
            </Group>
        </>
    );
}

export { NumberInputWithSideControls }