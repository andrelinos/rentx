import React, { Children } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Container, TotalCars } from './styles';

interface HeaderProps {
  title: string;
}

export function Header({ title}: HeaderProps) {
    return (
        <Container>
            <Logo width={RFValue(108)} height={RFValue(12)} />
            <TotalCars>{title}</TotalCars>
        </Container>
    );
}
