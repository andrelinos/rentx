import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppStackRoutes } from './app.stack.routes';

import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { MyCars } from '../screens/MyCars';

export function AppTabRoutes() {
    const { Navigator, Screen } = createBottomTabNavigator();

    return (
        <Navigator>
            <Screen 
                name="Home" 
                component={AppStackRoutes} 
            />
            <Screen 
                name="Profile" 
                component={Profile} 
            />
            <Screen 
                name="MyCars" 
                component={MyCars} 
            />
        </Navigator>
    );
}
