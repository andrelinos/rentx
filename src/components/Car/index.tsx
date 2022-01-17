import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';

import { Car as ModelCar } from '../../database/models/Car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

export interface CarProps {
  data: ModelCar;
  onPress?: () => void;
}

export function Car({ data, onPress }: CarProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  const netInfo = useNetInfo();

  return (
    <Container onPress={onPress}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${
              netInfo.isConnected === true ? data.price : '...'
            }`}</Price>
          </Rent>
          <Type>
            <MotorIcon width={20} />
          </Type>
        </About>
      </Details>
      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
