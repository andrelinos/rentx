import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Animated from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const CarsList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
    contentContainerStyle: {
        padding: 24
    },

    showsVerticalScrollIndicator: false
})``;

export const MyCarsButton = styled(ButtonAnimated)`
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;

    background-color: ${({ theme }) => theme.colors.main};

    border-radius: ${RFValue(30)}px;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: ${RFPercentage(4)}px;
    bottom: ${RFPercentage(2)}px;

`;