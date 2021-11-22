import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
    Calendar,
    DayProps,
    generateInterval,
    MarkedDatesPros
} from '../../components/Calendar';

import { getPlatformDate } from '../../utils/getPlatformDate';
import ArrowSvg from '../../assets/arrow.svg';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer
} from './styles';

interface RentalPeriod {
    start: number;
    startFormatted: string;
    end: number;
    endFormatted: string;
}

export function Scheduling() {
    const [lastSelectedDate, setSelectedDate] = useState<DayProps>(
        {} as DayProps
    );
    const [markedDates, setMarkedDates] = useState<MarkedDatesPros>(
        {} as MarkedDatesPros
    );
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
        {} as RentalPeriod
    );

    const theme = useTheme();
    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate('SchedulingDetails');
    }

    function handleBack() {
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        console.log(markedDates);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            start: start.timestamp,
            end: end.timestamp,
            startFormatted: format(
                getPlatformDate(new Date(firstDate)),
                'dd/MM/yyyy'
            ),
            endFormatted: format(
                getPlatformDate(new Date(endDate)),
                'dd/MM/yyyy'
            )
        });
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <BackButton onPress={handleBack} color={theme.colors.shape} />

                <Title>Escolha uma data e início e fim do aluguel</Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={false}>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={{ markedDates }}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}
