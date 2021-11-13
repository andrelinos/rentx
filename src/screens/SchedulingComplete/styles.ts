import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import BrandSvg from '../../assets/logo_background_gray.svg';

interface BrandLogoProps {
    width?: number;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.header};
    justify-content: center;
    align-items: center;

`;

export const ContainerContent = styled.View`
    width: 100%;
    height: 80%;

`;

export const BrandLogo = styled(BrandSvg)<BrandLogoProps>`
    position: absolute;
    z-index: -9;
`;

export const Content = styled.View`
    /* position: absolute; */
    justify-content: center;
    align-items: center;
    align-self: center;
    /* margin-top: 60%; */
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
    margin-top: ${RFValue(40)}px;
`;
