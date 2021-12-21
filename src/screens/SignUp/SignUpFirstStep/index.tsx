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

    const navigation = useNavigation();
    
    const theme = useTheme();

    function handleBack() {
        navigation.goBack();
    }

    function handleNextStep() {
        navigation.navigate('SignUpSecondtStep')
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
                            onChangeText={() => {}}
                            value="Nome"
                        />
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={() => {}}
                            value="email"
                        />
                        <Input
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            autoCorrect={false}
                            onChangeText={() => {}}
                            value="Nome"
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
