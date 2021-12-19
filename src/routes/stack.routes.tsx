import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CarDTO } from '../dtos/CarDTO';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SigIn } from '../screens/SigIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';

export function StackRoutes() {
    const { Navigator, Screen } = createStackNavigator();

    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="SigIn"
        >
            <Screen name="SigIn" component={SigIn} />
            <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
            <Screen
                name="Home"
                component={Home}
                options={{
                    gestureEnabled: false,
                    detachPreviousScreen: true
                }}
            />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Scheduling" component={Scheduling} />
            <Screen name="SchedulingDetails" component={SchedulingDetails} />
            <Screen name="SchedulingComplete" component={SchedulingComplete} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>
    );
}
