import React from 'react';
import {
    StatusBar,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'styled-components';

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

export function SignUpSecondStep() {
    const navigation = useNavigation();

    const theme = useTheme();

    function handleBack() {
        navigation.goBack();
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
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            autoCapitalize="none"
                            onChangeText={() => {}}
                            value={'password'}
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir senha"
                            autoCapitalize="none"
                            onChangeText={() => {}}
                            value={'repeat_password'}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Cadastrar"
                            color={theme.colors.success}
                            onPress={() => {}}
                            enabled={true}
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
