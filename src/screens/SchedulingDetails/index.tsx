import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

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
    Footer,
    RetailPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RetalPrice,
    RentalPriceLabel,
    RetalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal
} from './styles';

export function SchedulingDetails() {
    const theme = useTheme();

    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate('SchedulingComplete');
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
                </Accessories>

                <RetailPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(24)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>
                </RetailPeriod>

                <RetalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RetalPriceDetails>
                        <RentalPriceQuota>
                            R$ 580, 00 x3 diárias
                        </RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900,00</RentalPriceTotal>
                    </RetalPriceDetails>
                </RetalPrice>
            </Content>
            <Footer>
                <Button
                    title="Alugar agora"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
}
