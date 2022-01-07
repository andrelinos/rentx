import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import {
    CommonActions,
    useFocusEffect,
    useNavigation,
    StackRouter
} from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';

import { useAuth } from '../../hooks/auth';

import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import { Header } from '../../components/Header';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { LoadAnimated } from '../../components/LoadAnimated';

import { CarsList, Container } from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        };
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_event, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    });

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
    }

    useEffect(() => {
        let isMounted = true;

        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                if (isMounted) {
                    setCars(response.data);
                }
            } catch (error) {
                console.log((error as Error).message);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCars();
        return () => {
            isMounted = false;
        };
    }, []);

    useFocusEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true
        );
        return () => backHandler.remove();
    });

    // useFocusEffect(() => {
    //     if (user.token === '') {
    //         navigation.navigate('Confirmation', {
    //             nextScreenRoute: 'SignIn',
    //             title: 'Login necessário',
    //             message: `Você precisa realizar o login novamente para acessar a aplicação!`
    //         });
    //     }
    // });

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                hidden={false}
                translucent
            />

            <Header
                title={`${
                    cars.length > 0 ? 'Total de ' + cars.length + ' carros' : ''
                }`}
            />

            {loading ? (
                <LoadAnimated />
            ) : (
                <CarsList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Car
                            data={item}
                            onPress={() => handleCarDetails(item)}
                        />
                    )}
                />
            )}

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated
                        style={[
                            styles.button,
                            { backgroundColor: theme.colors.main }
                        ]}
                        onPress={handleOpenMyCars}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            color={theme.colors.shape}
                            size={32}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
