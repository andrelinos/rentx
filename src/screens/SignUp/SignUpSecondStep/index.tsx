import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import {
    StatusBar,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import * as Yup from 'yup';

import api from '../../../services/api';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
    Container,
    Header,
    Nav,
    Steps,
    Title,
    SubTitle,
    Form,
    Footer,
    FormTitle
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    };
}

interface ConfirmationProps {
    nextScreenRoute: 'SignIn';
    title: string;
    message: string;
}

export function SignUpSecondStep() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();

    const { user } = route.params as Params;

    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        try {
            const schema = Yup.object().shape({
                passwordConfirm: Yup.string()
                    .required('Confirme sua senha')
                    .oneOf(
                        [Yup.ref('password'), null],
                        'As senhas precisam ser iguais.'
                    ),
                password: Yup.string()
                    .required('Senha obrigatória')
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        'A senha precisa ter no mínimo 8 caracteres, ' +
                            'uma letra maiúscula e uma letra minúscula, ' +
                            'um número e um caractere especial'
                    )
            });

            const data = { password, passwordConfirm };
            await schema.validate(data);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa!', error.message);
            }
        }

        await api
            .post('/users', {
                name: user.name,
                email: user.email,
                driver_license: user.driverLicense,
                password
            })
            .then(() => {
                navigation.navigate('Confirmation', {
                    nextScreenRoute: 'SignIn',
                    title: 'Conta Criada',
                    message: `Agora é só fazer o login\ne aproveitar`
                });
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Opa!', 'Não foi possível cadastrar');
            });
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={theme.colors.background_primary}
                        translucent
                    />
                    <Header>
                        <Nav>
                            <BackButton onPress={handleBack} />
                            <Steps>
                                <Bullet />
                                <Bullet active />
                            </Steps>
                        </Nav>
                        <Title>Crie sua{'\n'}conta.</Title>
                        <SubTitle>
                            Faça seu cadastro{'\n'}forma rápida e fácil.
                        </SubTitle>
                    </Header>
                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            value={password}
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir senha"
                            autoCapitalize="none"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Cadastrar"
                            color={theme.colors.success}
                            onPress={handleRegister}
                            enabled={true}
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
