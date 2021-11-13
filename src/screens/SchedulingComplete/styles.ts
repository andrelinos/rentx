import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.header};
    padding-top: ${RFValue(90)}px;
`;

export const Content = styled.View`
    position: absolute;
    justify-content: center;
    align-items: center;
    align-self: center;
    top: 40%;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    margin-top: ${RFValue(30)}px;
`;

export const Message = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text_detail};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    line-height: ${RFValue(25)}px;
    text-align: center;
    margin-top: ${RFValue(16)}px;
`;

export const ButtonContainer = styled.View`
   width: 80px; 
   margin-top: ${RFValue(80)}px;
`;