import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';

import BrandSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message } from './styles';

export function SchedulingComplete() {
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
            </Content>
        </Container>
    );
}
