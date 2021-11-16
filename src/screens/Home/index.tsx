import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import { Header } from '../../components/Header';
import { Car, CarProps } from '../../components/Car';

import { CarsList, Container } from './styles';

export function Home() {
    const [cars, setCars] = useState();
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: '120'
        },
        thumbnail:
            'https://st.motortrend.com/uploads/sites/10/2015/11/2016-audi-s5-coupe-premium-plus-coupe-angular-front.png'
    };

    function handleCarDetails() {
        navigation.navigate('CarDetails');
    }

    async function fetchCars() {
        try {
            const response = await api.get('/cars');

            setCars(response.data);
            console.log(cars);
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
            <Header title="Total de 12 carros" />
            <CarsList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                keyExtractor={(item) => String(item)}
                renderItem={(item) => (
                    <Car data={carData} onPress={handleCarDetails} />
                )}
            />
        </Container>
    );
}
