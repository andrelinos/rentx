import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import format from 'date-fns/format';

import api from '../../services/api';

import { getPlatformDate } from '../../utils/getPlatformDate';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  CarImagesContainer,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RetailPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RetalPrice,
  RentalPriceLabel,
  RetalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  function handleBack() {
    navigation.goBack();
  }

  async function handleConfirmRental() {
    setLoading(true);

    const response = await api.get(`/schedules_bycars/${car.id}`);

    const schedulesByCar = response.data;

    const unavailable_dates = [...schedulesByCar.unavailable_dates, ...dates];

    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });

    // Alternativa ao async-wait
    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          nextScreenRoute: 'MyCars',
          title: 'Carro alugado!',
          message: `Agora você só precisa ir\naté uma concessionária da RENTX\ne pegar seu carro!`,
        });
      })
      .catch(() => {
        Alert.alert('Não foi possível realizar o agendamento.');
        setLoading(false);
      });
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImagesContainer>
        <ImageSlider key="1" imagesUrl={car.photos} />
      </CarImagesContainer>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}i</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car?.accessories?.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RetailPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RetailPeriod>

        <RetalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RetalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.price} x${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RetalPriceDetails>
        </RetalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
