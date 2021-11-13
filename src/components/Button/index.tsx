import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
}

export function Button({ title, color, ...rest}: ButtonProps){
  return (
    <Container {...rest} color={color}> 
      <Title>{title}</Title>
    </Container>
  );
}