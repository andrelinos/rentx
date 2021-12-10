import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCarAnimated from '../../assets/loadingCarAnimated.json';
import roadAnimated from '../../assets/road.json';

import { Container, LoadingView, Road, Car, LoadText } from './styles';

export function LoadAnimated() {
    return (
        <Container>
            <LoadingView>
                <Road>
                    <LottieView
                        style={{ width: '100%' }}
                        source={roadAnimated}
                        autoPlay
                    />
                </Road>
                <Car>
                    <LottieView
                        style={{ height: 180 }}
                        source={loadingCarAnimated}
                        autoPlay
                    />
                </Car>
            </LoadingView>
            <LoadText>Carregando...</LoadText>
        </Container>
    );
}
