import React from 'react';
import LottieView from 'lottie-react-native';

import road from '../../assets/road.json';

import { Container } from './styles';

export function RoadAnimated() {
    return (
        <Container>
            <LottieView
                source={road}
                autoPlay
            />
        </Container>
    );
}
