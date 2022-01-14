import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StatusBar, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import api from '../../services/api';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

import { useAuth } from '../../hooks/auth';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/models/Car';
import { Header } from '../../components/Header';
import { LoadAnimated } from '../../components/LoadAnimated';

import { CarsList, Container } from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_event, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        console.log('USER CHANGES:', response);

        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };
      },
      pullChanges: async ({ changes }) => {
        const user = changes.users;
        console.log('USER CHANGES:', user);
        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        // const response = await api.get('/cars');
        const carCollection = database.get<ModelCar>('/cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }

        console.log('CARS LIST:', cars);
      } catch (error) {
        console.log((error as Error).message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => backHandler.remove();
  });

  useFocusEffect(() => {
    if (user.token === '') {
      console.log('Usuário não logado...');
    } else {
      console.log('Usuário logado...');
    }
  });

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert('Você está On-Line');
      // offlineSynchronize();
    } else {
      Alert.alert('Você está Off-Line');
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        hidden={false}
        translucent
      />

      <Header
        title={`${
          cars.length > 0 ? 'Total de ' + cars.length + ' carros' : ''
        }`}
      />

      {loading ? (
        <LoadAnimated />
      ) : (
        <CarsList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport"
              color={theme.colors.shape}
              size={32}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
