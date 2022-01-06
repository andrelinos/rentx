import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface OptionProps {
    active: boolean;
}

export const Container = styled.View`
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
    padding-top: ${getStatusBarHeight() + RFPercentage(2)}px;
`;

export const HeaderTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.background_secondary};
    font-size: ${RFValue(25)}px;
`;

export const SignOutButton = styled(BorderlessButton)``;

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
    overflow: hidden;
`;

export const PhotoDefault = styled.View`
    width: 180px;
    height: 180px;
    border-radius: 90px;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.shape_dark};
    overflow: hidden;
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
    z-index: 5;
`;

export const Content = styled.View`
    padding: 0 24px;
    margin-top: 122px;
`;

export const Options = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.line}

    flex-direction: row;
    margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
    flex: 1;
    padding-bottom: 14px;
    border-bottom-width: 3px;
    border-bottom-color: transparent;
    align-items: center;

    ${({ active }) =>
        active &&
        css`
            border-bottom-color: ${({ theme }) => theme.colors.main};
        `}
`;

export const OptionTitle = styled.Text<OptionProps>`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme, active }) =>
        active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
    color: ${({ theme, active }) =>
        active ? theme.colors.header : theme.colors.text_detail};
`;

export const Section = styled.View``;
