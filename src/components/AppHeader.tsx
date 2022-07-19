import { Container, Grid, Header } from '@mantine/core';
import { UserMenu } from 'components/header/UserMenu'

function AppHeader() {
    const heightLogo = "75px"
    return (
        <Header height={80}>
            <Container size={1440} px={0}>
                <Grid gutter={0}> 
                    <Grid.Col span={4}>
                        <img src="bearbnb.png" alt="Bearbnb logo" height={heightLogo} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div>Search settings</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div>Right side components</div>
                        <UserMenu/>
                    </Grid.Col>
                </Grid>
            </Container>
        </Header>
    );
}

export { AppHeader }