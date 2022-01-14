import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
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
    const { user, signOut, updatedUser } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();

    const [option, setOption] = useState<OptionProps>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    function handleBack() {
        navigation.navigate<any>('Home');
    }

    async function SignOut() {
        await signOut({
            id: user.id,
            token: ''
        });
    }

    async function handleSignOut() {
        Alert.alert(
            'Confirmar saída',
            'Se você sair, irá precisar de internet para conectar-se novamente.' +
                '\n Tem certeza?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Sair',
                    onPress: () => SignOut()
                }
            ],
            {
                cancelable: true
            }
        );
    }

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

        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    }

    function handleAvatarChange() {
        Alert.alert(
            'Tocar foto do perfil',
            '',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Remover',
                    onPress: () => setAvatar('')
                },
                {
                    text: 'Trocar',
                    onPress: () => handleAvatarSelect()
                }
            ],
            {
                cancelable: true
            }
        );
    }

    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória'),
                name: Yup.string().required('Nome é obrigatório')
            });

            const data = { name, driverLicense };
            await schema.validate(data);

            await updatedUser({
                id: user.id,
                user_id: user.user_id,
                name,
                email: user.email,
                driver_license: user.driver_license,
                avatar,
                token: user.token
            });
            Alert.alert('Perfil atualizado com sucesso!');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Não foi possível atualizar o perfil');
            }
        }
    }

    useFocusEffect(() => {
        if (user.token === '') {
            console.log('Usuário não logado...');
        } else {
            console.log('Usuário logado...');
        }
    });

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
                                        uri: avatar
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
                            <PhotoButton onPress={handleAvatarChange}>
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
                        <Button
                            title="Salvar alterações"
                            onPress={handleProfileUpdate}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
