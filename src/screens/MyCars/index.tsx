import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { BackButton } from '../../components/BackButton';

import { Container, Header, CarsList, Title, SubTitle } from './styles';

export function MyCars() {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    async function fetchCars() {
        try {
            const response = await api.get('/schedules_byuser?user_id=1');
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
                translucent
            />

<Header>
                <BackButton onPress={handleBack} color={theme.colors.shape} />

                <Title>Seus agendamentos, estão aqui.</Title>
                <SubTitle>Conforto, segurança e praticidade.</SubTitle>

            </Header>


            {/* {loading ? (
                <Load />
            ) : (
                <CarsList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Car
                            data={item}
                          
                        />
                    )}
                />
            )} */}
        </Container>
    );
}
