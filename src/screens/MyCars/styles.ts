import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { CarDTO } from '../../dtos/CarDTO';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.header};
    justify-content: center;
    padding: ${getStatusBarHeight() + RFPercentage(2)}px 25px 16px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(32)}px;
    margin-top: 8px;
`;

export const SubTitle = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    font-size: ${RFValue(18)}px;
    margin-top: 8px;
`;

export const CarsList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
    contentContainerStyle: {
        padding: 24
    },

    showsVerticalScrollIndicator: false
})``;

