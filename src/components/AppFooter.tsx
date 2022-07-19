import { Container, Grid, Footer } from '@mantine/core';

function AppFooter() {
    return (
        <Footer height={50}>
            <Container size={1440} px={0}>
                <Grid gutter={0}> 
                    <Grid.Col span={6}>
                        <div>Left side components</div>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <div>Right side components</div>
                    </Grid.Col>
                </Grid>
            </Container>
        </Footer>
    );
}

export { AppFooter }