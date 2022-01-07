import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { LoadAnimated } from '../../components/LoadAnimated';
import { BackButton } from '../../components/BackButton';

import {
    Container,
    Header,
    CarsList,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate
} from './styles';

export interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const theme = useTheme();

    const navigation = useNavigation();

    function handleBack() {
        navigation.navigate<any>('Home');
    }

    async function fetchCars() {
        try {
            const response = await api.get(
                `/schedules_byuser?user_id=${user.id}`
            );
            console.log('RESPONSE', response);

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
            <Content>
                {!loading && (
                    <Appointments>
                        <AppointmentsTitle>
                            Agendamentos feitos
                        </AppointmentsTitle>
                        <AppointmentsQuantity>
                            {cars.length}
                        </AppointmentsQuantity>
                    </Appointments>
                )}

                {loading ? (
                    <LoadAnimated />
                ) : (
                    <CarsList
                        data={cars}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>
                                            {item.startDate}
                                        </CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={16}
                                            color={theme.colors.text}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>
                                            {item.endDate}
                                        </CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                )}
            </Content>
        </Container>
    );
}
