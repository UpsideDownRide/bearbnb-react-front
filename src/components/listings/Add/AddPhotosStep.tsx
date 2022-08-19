import { Group, Text  } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

type OnDrop = {
    onDrop: (files: File[]) => void 
}

type Props = Omit<Partial<DropzoneProps>, 'onDrop'> & OnDrop

function AddPhotosStep(props: Props ) {
    return (
        <Dropzone
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            {...props}
        >
            <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                <div>
                    <Text size="xl" inline>
                        Drag images here or click to select files
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 3mb
                    </Text>
                </div>
            </Group>
        </Dropzone>
    );
}

export { AddPhotosStep }