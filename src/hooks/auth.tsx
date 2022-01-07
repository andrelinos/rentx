import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
} from 'react';

import api from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/models/User';

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
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post<AuthState>('/sessions', {
                email,
                password
            });

            const { token, user } = response.data;

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const userCollection = database.get<ModelUser>('users');
            await database.write(async () => {
                await userCollection.create((newUser) => {
                    (newUser.user_id = user.id),
                        (newUser.name = token),
                        (newUser.email = user.email),
                        (newUser.driver_license = user.driver_license),
                        (newUser.avatar = user.avatar),
                        (newUser.token = token);
                });
            });

            console.log('SIGNIN TOKEN: ', token);

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
                userSelected.update((userData) => {
                    (userData.name = user.name),
                        (userData.driver_license = user.driver_license),
                        (userData.avatar = user.avatar);
                });

                setData(user);
                console.log('UPDATE USER TOKEN: ', user.token);
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

                console.log('USER DATA INÍCIO Auth: ', userData.token);

                api.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${userData.token}`;
                setData(userData);
            }
        }

        loadUserData();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user: data, signIn, signOut, updatedUser }}
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
