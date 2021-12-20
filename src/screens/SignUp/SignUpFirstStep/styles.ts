import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary}
    padding: 0 24px;
`;

export const Header = styled.View`
    width: 100%;

    padding: ${getStatusBarHeight() + RFPercentage(2)}px 0 16px;
`;

export const Nav = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(25)}px;
`;

export const Steps = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(40)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-top: ${RFPercentage(2)}%;
`;

export const SubTitle = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${RFValue(25)}px;
    margin-top: ${RFValue(16)}px;
`;

export const Form = styled.View``;

export const FormTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-bottom: ${RFValue(16)}px;
`;

export const Footer = styled.View`
    margin-top: ${RFValue(16)}px;
`;
