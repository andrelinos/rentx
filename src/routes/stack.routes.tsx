import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CarDTO } from '../dtos/CarDTO';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';

export type RootStackParamList = {
    Home: undefined;
    CarDetails: { car: CarDTO | undefined };
    Scheduling: { car: CarDTO | undefined };
    SchedulingDetails: { car: CarDTO; dates: string[] };
    SchedulingComplete: undefined;
    MyCars: undefined;
    Splash: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name="Home" component={Home} />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Scheduling" component={Scheduling} />
            <Screen name="SchedulingDetails" component={SchedulingDetails} />
            <Screen name="SchedulingComplete" component={SchedulingComplete} />
        </Navigator>
    );
}
