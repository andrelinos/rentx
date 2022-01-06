import React, { useState } from 'react';
import ImagePicker from 'expo-image-picker';
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
    SignOutButton,
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

type OptionProps = 'dataEdit' | 'passwordEdit';

export function Profile() {
    const { user } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();

    const [option, setOption] = useState<OptionProps>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    function handleBack() {
        navigation.navigate<any>('Home');
    }

    function handleSignOut() {}

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected);
    }

    async function handleAvatarSelect() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if (result.cancelled) {
            return;
        }

        if (result.uri) {
            setAvatar(result.uri);
        }
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
                            <SignOutButton onPress={handleSignOut}>
                                <Feather
                                    name="power"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </SignOutButton>
                        </HeaderTop>

                        <PhotoContainer>
                            {avatar ? (
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
                                        color={theme.colors.title}
                                    />
                                </PhotoDefault>
                            )}
                            <PhotoButton onPress={handleAvatarSelect}>
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
                                    onChangeText={setName}
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
                                    onChangeText={setDriverLicense}
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
