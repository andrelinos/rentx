import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Title } from './styles';

export function SignUpFirstStep() {
    const navigation = useNavigation();

    return (
        <Container>
            <Title>SignUpFirstStep</Title>
        </Container>
    );
}
