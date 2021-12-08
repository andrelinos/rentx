import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 113px;
    background-color: ${({ theme }) => theme.colors.header};
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 24px;
    padding-bottom: 32px;
`;
export const TotalCars = styled.Text`
  color: ${({ theme }) => theme.colors.line};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
