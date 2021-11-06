import React from 'react';
import { StatusBar } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Container, Header, CarImagesContainer } from './styles';

export function CarDetails() {
    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <BackButton onPress={() => {}} />
            </Header>
            <CarImagesContainer>
            <ImageSlider
                key="1"
                imagesUrl={[
                    'https://st.motortrend.com/uploads/sites/10/2015/11/2016-audi-s5-coupe-premium-plus-coupe-angular-front.png'
                ]}
            />
            </CarImagesContainer>
        </Container>
    );
}
