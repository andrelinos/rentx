import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width: 31.75%;
    min-width: 26%;
    height: 92px;
    justify-content: space-around;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background_primary};
    padding: 16px;
    margin-bottom: 8px;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(13)}px;
`;
