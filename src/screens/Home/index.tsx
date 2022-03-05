import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

import { database } from '../../database';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/models/Car';
import { Header } from '../../components/Header';
import { LoadAnimated } from '../../components/LoadAnimated';
// import { LoadAnimated } from '@components/LoadAnimated';

import { CarsList, Container } from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, signOut } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const synchronizing = useRef(false);

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

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  async function SignOut() {
    await signOut({
      id: user.id,
      token: '',
    });
  }

  useEffect(() => {
    let isMounted = true;
    // SignOut();

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const carsList = await carCollection.query().fetch();

        if (isMounted) {
          setCars(carsList);
        }
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

  useEffect(() => {
    if (user.token === '') {
      console.log('Usuário não logado...');
    } else {
      console.log('Usuário logado...');
    }
  }, [user.token]);

  useEffect(() => {
    const syncChanges = async () => {
      if (netInfo.isConnected && !synchronizing.current) {
        synchronizing.current = true;
        try {
          await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
              const response = await api.get(
                `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
              );

              const { changes, latestVersion } = response.data;

              return { changes, timestamp: latestVersion };
            },
            pushChanges: async ({ changes }) => {
              const user = changes.users;

              await api.post('/users/sync', user);
            },
          });
        } catch (error) {
          console.log((error as Error).message);
        } finally {
          synchronizing.current = false;
        }
      }
    };
    syncChanges();
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
          keyExtractor={item => String(item.id)}
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
