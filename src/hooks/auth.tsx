import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import api from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/models/User';
import { Alert } from 'react-native';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}
interface UserSignOut {
  id: string;
  token: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: (user: UserSignOut) => Promise<void>;
  updatedUser: (user: User) => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post<AuthState>('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        await userCollection.create(newUser => {
          (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.avatar = user.avatar),
            (newUser.token = token);
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        userSelected.destroyPermanently;
      });
      setData({} as User);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  // async function signOut(user: UserSignOut) {
  //     try {
  //         const userCollection = database.get<any>('users');
  //         await database.write(async () => {
  //             const userSelected = await userCollection.find(user.id);
  //             userSelected.update((userData: { token: string }) => {
  //                 userData.token = user.token;
  //             });

  //             setData({} as User);
  //         });
  //     } catch (error) {
  //         throw new Error((error as Error).message);
  //     }
  // }

  async function updatedUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        userSelected.update(userData => {
          (userData.name = user.name),
            (userData.driver_license = user.driver_license),
            (userData.avatar = user.avatar);
        });

        setData(user);
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;

        const { id, name, driver_license, avatar, email, token } = userData;

        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${userData.token}`;

        setData(userData);
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data, signIn, signOut, updatedUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
