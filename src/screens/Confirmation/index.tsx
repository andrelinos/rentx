import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components';

import DoneSvg from '../../assets/done.svg';
import { Button } from '../../components/Button';

import {
    Container,
    ContainerContent,
    BrandLogo,
    Content,
    Title,
    Message,
    ButtonContainer
} from './styles';

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string ; // corrigir tipagem
}

export function Confirmation() {
    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();

    const { title, message, nextScreenRoute } = route.params as Params;

    function handleGoToScreen() {
        navigation.navigate(nextScreenRoute);
    }

    const { width } = useWindowDimensions();
    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <ContainerContent>
                <BrandLogo width={width} />

                <Content>
                    <DoneSvg width={80} height={80} />
                    <Title>{title}</Title>

                    <Message>{message}</Message>
                    <ButtonContainer>
                        <Button
                            title="Ok"
                            color={theme.colors.shape_dark}
                            onPress={handleGoToScreen}
                        />
                    </ButtonContainer>
                </Content>
            </ContainerContent>
        </Container>
    );
}
