import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCarAnimated from '../../assets/loadingCarAnimated.json';
import roadAnimated from '../../assets/road.json';

import { Container, LoadingView, Car, LoadText } from './styles';

export function LoadAnimated() {
    return (
        <Container>
            <LoadingView>
                <Car>
                    <LottieView
                        style={{ height: 180 }}
                        source={loadingCarAnimated}
                        resizeMode="contain"
                        autoPlay
                        loop
                    />
                </Car>
                <LoadText>Carregando...</LoadText>
            </LoadingView>
        </Container>
    );
}
