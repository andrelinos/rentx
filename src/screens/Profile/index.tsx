import React, { useState } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoDefault,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section
} from './styles';

export function Profile() {
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>(
        'dataEdit'
    );

    const { user } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.navigate<any>('Home');
    }

    function handleLogout() {}

    function handlePhotoChange() {}

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected);
    }

    return (
        <KeyboardAvoidingView behavior="position">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={theme.colors.header}
                        translucent
                    />
                    <Header>
                        <HeaderTop>
                            <BackButton
                                onPress={handleBack}
                                color={theme.colors.shape}
                            />
                            <HeaderTitle>Editar perfil</HeaderTitle>
                            <LogoutButton onPress={handleLogout}>
                                <Feather
                                    name="power"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>

                        <PhotoContainer>
                            {user.avatar.length > 0 ? (
                                <Photo
                                    source={{
                                        uri: user.avatar
                                    }}
                                />
                            ) : (
                                <PhotoDefault>
                                    <Feather
                                        name="user"
                                        size={80}
                                        color={theme.colors.shape}
                                    />
                                </PhotoDefault>
                            )}
                            <PhotoButton onPress={handlePhotoChange}>
                                <Feather
                                    name="camera"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>
                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() =>
                                    handleOptionChange('passwordEdit')
                                }
                            >
                                <OptionTitle active={option === 'passwordEdit'}>
                                    Trocar senha
                                </OptionTitle>
                            </Option>
                        </Options>
                        {option === 'dataEdit' ? (
                            <Section>
                                <Input
                                    iconName="user"
                                    placeholder="Nome"
                                    autoCapitalize="characters"
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                />
                                <Input
                                    iconName="mail"
                                    defaultValue={user.email}
                                    editable={false}
                                />
                                <Input
                                    iconName="credit-card"
                                    placeholder="CNH"
                                    keyboardType="numeric"
                                    defaultValue={user.driver_license}
                                />
                            </Section>
                        ) : (
                            <Section>
                                <PasswordInput
                                    iconName="lock"
                                    placeholder="Senha atual"
                                    autoCorrect={false}
                                />
                                <PasswordInput
                                    iconName="lock"
                                    placeholder="Nova senha"
                                    autoCorrect={false}
                                />
                                <PasswordInput
                                    iconName="lock"
                                    placeholder="Repetir senha"
                                    autoCorrect={false}
                                />
                            </Section>
                        )}
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
