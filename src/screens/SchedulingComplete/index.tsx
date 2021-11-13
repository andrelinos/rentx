import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components';

import BrandSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { Button } from '../../components/Button';

import { Container, Content, Title, Message, ButtonContainer } from './styles';

export function SchedulingComplete() {
    const theme = useTheme();
    
    const { width } = useWindowDimensions();
    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <BrandSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro alugado!</Title>

                <Message>
                    Agora você só precisa ir{'\n'}até uma concessionária da
                    RENTX
                    {'\n'}e pegar seu automóvel
                </Message>
                <ButtonContainer>
                <Button title='Ok' color={theme.colors.shape_dark} />
                </ButtonContainer>
            </Content>
        </Container>
    );
}
