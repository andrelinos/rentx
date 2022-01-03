import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton
} from './styles';

export function Profile() {
    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.navigate<any>('Home');
    }

    function handleLogout() {}

    function handlePhotoChange() {}

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderTop>
                    <BackButton
                        onPress={handleBack}
                        color={theme.colors.shape}
                    />
                    <HeaderTitle>Editar Perfil</HeaderTitle>
                    <LogoutButton onPress={handleLogout}>
                        <Feather
                            name="power"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </LogoutButton>
                </HeaderTop>

                <PhotoContainer>
                    <Photo
                        source={{ uri: 'https://github.com/andrelinos.png' }}
                    />
                    <PhotoButton onPress={handlePhotoChange}>
                        <Feather
                            name="camera"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </PhotoButton>
                </PhotoContainer>
            </Header>
        </Container>
    );
}
