import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import {
    Container,
    Header,
    CarImagesContainer,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    About,
    Footer
} from './styles';

interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const navigation = useNavigation();
    const route = useRoute();

    const { car } = route.params as Params;

    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car });
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <BackButton onPress={handleBack} />
            </Header>
            <CarImagesContainer>
                <ImageSlider key={car.id} imagesUrl={car.photos} />
            </CarImagesContainer>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>{`R$ ${car.rent.price}`}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {car.accessories.map((accessory) => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))}

                    {/* {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))} */}
                </Accessories>

                <About>{car.about}</About>
            </Content>
            <Footer>
                <Button
                    title="Escolher período do aluguel"
                    onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
}
