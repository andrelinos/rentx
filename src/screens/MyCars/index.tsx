import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/models/Car';

import { Car } from '../../components/Car';
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
  CarFooterDate,
} from './styles';

export interface CarProps {
  id: string;
  user_id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
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

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/rentals');

        const formattedData = response.data.map((data: CarProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          };
        });

        setCars(formattedData);
      } catch (error) {
        console.log((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [cars]);

  useEffect(() => {
    if (user.token === '') {
      console.log('Usuário não logado...');
    } else {
      console.log('Usuário logado...');
    }
  }, [user.token]);

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
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
        )}

        {loading ? (
          <LoadAnimated />
        ) : (
          <CarsList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={16}
                      color={theme.colors.text}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
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
