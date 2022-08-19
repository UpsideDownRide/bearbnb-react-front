import { Group, SimpleGrid, Text, Image } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';

type OnDrop = {
    onDrop: (files: File[]) => void
}

type Props = Omit<Partial<DropzoneProps>, 'onDrop'> & OnDrop

function AddPhotosStep(props: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const { onDrop, ...rest } = props
    const dropHandler = (droppedFiles: File[]) => {
        setFiles(prev => { onDrop([...prev, ...droppedFiles])
            return [...prev, ...droppedFiles] })
    }

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Image
                key={index}
                src={imageUrl}
                imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
        );
    });

    return (
        <>
            <Dropzone
                onReject={(files) => console.log('rejected files', files)}
                maxSize={10 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                onDrop={dropHandler}
                {...rest}
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
            <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={previews.length > 0 ? 'xl' : 0}
            >
                {previews}
            </SimpleGrid>
        </>
    );
}

export { AddPhotosStep }