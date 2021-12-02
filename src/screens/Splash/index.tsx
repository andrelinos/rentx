import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS // Para continuar rodando o código JS da App
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

export function Splash() {
    const splashAnimation = useSharedValue(0);

    const navigation = useNavigation();

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
            translateX: interpolate(
                splashAnimation.value,
                [0, 50],
                [0, -50],
                Extrapolate.CLAMP
            )
        };
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                splashAnimation.value,
                [0, 25, 50],
                [0, 0.3, 1]
            ),
            translateX: interpolate(
                splashAnimation.value,
                [0, 50],
                [-50, 0],
                Extrapolate.CLAMP
            )
        };
    });

    function goHome() {
        navigation.navigate('Home');
    }

    useEffect(() => {
        splashAnimation.value = withTiming(50, { duration: 3000 }, () => {
            'worklet' // para chamadas de threads diferentes no fluxo d App
            runOnJS(goHome)();
        });
    }, []);

    return (
        <Container>
            <Animated.View style={[brandStyle, { position: 'absolute' }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>
            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    );
}
