import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, IconContainer, InputText } from './styles';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const theme = useTheme();

    function HandlePasswordVisibilityChange() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={
                        isFocused || isFilled
                            ? theme.colors.main
                            : theme.colors.text_detail
                    }
                />
            </IconContainer>
            <InputText
                isFocused={isFocused}
                secureTextEntry={isPasswordVisible}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...rest}
            />

            <BorderlessButton onPress={HandlePasswordVisibilityChange}>
                <IconContainer isFocused={isFocused}>
                    <Feather
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    );
}
