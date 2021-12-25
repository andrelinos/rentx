import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    margin-top: ${getStatusBarHeight() + RFValue(56)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(40)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
`;

export const SubTitle = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${RFValue(25)}px;
    margin-top: ${RFValue(16)}px;
`;

export const Form = styled.View`
    width: 100%;
    margin: 44px 0;
`;

export const Footer = styled.View``;
