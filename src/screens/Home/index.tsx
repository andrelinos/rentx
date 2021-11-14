import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { Car } from '../../components/Car';

import { CarsList, Container } from './styles';

export function Home() {
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
