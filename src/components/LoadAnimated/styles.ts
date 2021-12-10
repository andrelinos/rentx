import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;
export const LoadingView = styled.View`
    width: 100%;
    height: 300px;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
    margin-top: 80px;
`;

export const Road = styled.View`
    position: relative;
    width: 100%;
    height: 190px;
    margin-bottom: ${RFValue(150)}px;
`;

export const Car = styled.View`
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    height: 190px;
    bottom: ${RFValue(-15)}px;
    z-index: 9;
`;

export const LoadText = styled.Text`
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(15)}px;
    text-align: center;
`;
