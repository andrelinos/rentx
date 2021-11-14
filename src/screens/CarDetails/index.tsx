import React from 'react';
import { StatusBar } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSVG from '../../assets/people.svg';

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
import { useNavigation } from '@react-navigation/native';

export function CarDetails() {
    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate('Scheduling');
    }

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <BackButton onPress={() => {}} />
            </Header>
            <CarImagesContainer>
                <ImageSlider
                    key="1"
                    imagesUrl={[
                        'https://st.motortrend.com/uploads/sites/10/2015/11/2016-audi-s5-coupe-premium-plus-coupe-angular-front.png'
                    ]}
                />
            </CarImagesContainer>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>
                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580,00</Price>
                    </Rent>
                </Details>

                <Accessories>
                    <Accessory icon={speedSvg} name="380Km/h" />
                    <Accessory icon={accelerationSvg} name="3.2s" />
                    <Accessory icon={forceSvg} name="800 HP" />
                    <Accessory icon={gasolineSvg} name="Gasolina" />
                    <Accessory icon={exchangeSvg} name="Auto" />
                    <Accessory icon={peopleSVG} name="2 pessoas" />
                    <Accessory icon={peopleSVG} name="Teste" />
                </Accessories>

                <About>
                    Este é um automóvel desportivo. Surgiu do lendário touro de
                    lide indultado na praça Real Maestranza de Sevilla. É um
                    belíssimo caro para quem gosta de acelerar.
                </About>
            </Content>
            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}
