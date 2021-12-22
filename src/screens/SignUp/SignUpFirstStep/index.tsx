import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    StatusBar,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import * as Yup from 'yup';

import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
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

export function SignUpFirstStep() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    const navigation = useNavigation();

    const theme = useTheme();

    function handleBack() {
        navigation.goBack();
    }

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('E-mail inválido'),
                name: Yup.string().required('Nome obrigatório')
            });

            const data = { name, email, driverLicense };
            await schema.validate(data);

            navigation.navigate('SignUpSecondStep', { user: data });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa!', error.message);
            }
        }
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
                                <Bullet active />
                                <Bullet />
                            </Steps>
                        </Nav>
                        <Title>Crie sua{'\n'}conta.</Title>
                        <SubTitle>
                            Faça seu cadastro{'\n'}forma rápida e fácil.
                        </SubTitle>
                    </Header>
                    <Form>
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName="user"
                            placeholder="Nome"
                            autoCorrect={false}
                            onChangeText={setName}
                            value={name}
                        />
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Input
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            autoCorrect={false}
                            onChangeText={setDriverLicense}
                            value={driverLicense}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Próximo"
                            onPress={handleNextStep}
                            enabled={true}
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
