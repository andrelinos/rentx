import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const LoadingView = styled.View`
    position: relative;
    width: 100%;
    height: ${RFValue(150)}px
`;

export const Car = styled.View`
    width: 100%;
    height: ${RFValue(160)}px;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
`;

export const LoadText = styled.Text`
    position: absolute;
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(15)}px;
    text-align: center;
    bottom: ${RFValue(30)}px;
`;
