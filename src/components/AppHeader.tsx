import { Container, Grid, Header } from '@mantine/core';
import { UserMenu } from 'components/header/UserMenu'

function AppHeader() {
    const heightLogo = "55px"
    return (
        <Header height={80}>
            <Container size={1440} style={{height: "100%"}}>
                <Grid gutter={0} justify="space-between" align="center" style={{height: "100%"}}>
                    <Grid.Col span={4}>
                        <img src="bearbnb.png" alt="Bearbnb logo" height={heightLogo} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div>Search settings</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Grid justify="flex-end">
                            <Grid.Col span={10}><div>Right side components</div></Grid.Col>
                            <Grid.Col span={2}><UserMenu /></Grid.Col>
                        </Grid>
                    </Grid.Col>
                </Grid>
            </Container>
        </Header>
    );
}

export { AppHeader }