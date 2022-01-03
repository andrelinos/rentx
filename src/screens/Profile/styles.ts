import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 227px;
    padding: 0 24px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderTop = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${getStatusBarHeight() + RFPercentage(2)}px;
`;

export const HeaderTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.background_secondary};
    font-size: ${RFValue(25)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
    width: 186px;
    height: 186px;
    border-radius: 93px;
    margin-top: 48px;
    justify-content: center;
    align-items: center;
    border: 2px;
    border-color: ${({ theme }) => theme.colors.main};
    background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Photo = styled.Image`
    width: 180px;
    height: 180px;
    border-radius: 90px;
    position: relative;
`;

export const PhotoButton = styled(RectButton)`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    position: absolute;
    bottom: 5px;
    right: 0px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.main};
`;
