import { Container, Grid, Footer, Text } from '@mantine/core';

function AppFooter() {
    return (
        <Footer height={50}>
            <Container size={1440} px={0}>
                <Grid gutter={0}> 
                    <Grid.Col span={6}>
                        <Text size="lg" weight={500} style={{paddingTop: "0.5em"}} >©2022 Domirar Inc.</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                    </Grid.Col>
                </Grid>
            </Container>
        </Footer>
    );
}

export { AppFooter }