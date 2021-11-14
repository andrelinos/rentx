import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import EnergySvg from '../../assets/energy.svg';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage
} from './styles';

interface CardData {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: string;
    };
    thumbnail: string;
}

interface CarProps extends RectButtonProps {
    data: CardData;
}

export function Car({ data, ...rest }: CarProps) {
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>
                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>
                    <Type>
                        <GasolineSvg />
                    </Type>
                </About>
            </Details>
            <CarImage
                source={{
                    uri: data.thumbnail
                }}
                resizeMode="contain"
            />
        </Container>
    );
}
