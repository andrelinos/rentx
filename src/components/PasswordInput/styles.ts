import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
    isFocused: boolean;
}

export const Container = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
    border-bottom-width: 2px;
    border-bottom-color: transparent;
`;

export const IconContainer = styled.View<Props>`
    width: 55px;
    height: 56px;
    justify-content: center;
    align-items: center;
    margin-right: 2px;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    border-bottom-width: 2px;
    border-bottom-color: transparent;

    ${({ isFocused, theme }) =>
        isFocused &&
        css`
            border-bottom-color: ${theme.colors.main};
        `};
`;

export const InputText = styled.TextInput<Props>`
    flex: 1;
    padding: 0 16px;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    border-bottom-width: 2px;
    border-bottom-color: transparent;

    ${({ isFocused, theme }) =>
        isFocused &&
        css`
            border-bottom-color: ${theme.colors.main};
        `};
`;
