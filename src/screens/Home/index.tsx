import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useTheme } from 'styled-components';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Header } from '../../components/Header';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { CarsList, Container, MyCarsButton } from './styles';
import { RectButton } from 'react-native-gesture-handler';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const theme = useTheme();

    const { navigate } = useNavigation();

    function handleCarDetails(car: CarDTO) {
        navigate('CarDetails', { car });
    }

    function handleOpenMyCars() {
        navigate('MyCars');
    }

    async function fetchCars() {
        try {
            const response = await api.get('/cars');

            setCars(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                hidden={false}
                translucent
            />
            <Header title={`Total de ${cars.length} carros disponíveis`} />
            {loading ? (
                <Load />
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

            <Animated.View>
                <ButtonAnimated onPress={handleOpenMyCars}>
                    <Ionicons
                        name="ios-car-sport"
                        color={theme.colors.shape}
                        size={32}
                    />
                </ButtonAnimated>
            </Animated.View>
        </Container>
    );
}
