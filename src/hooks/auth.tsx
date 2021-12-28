import React, { createContext, useState, useContext, ReactNode } from 'react';
import api from '../services/api';

interface User {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
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
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);

    async function signIn({ email, password }: SignInCredentials) {
        const response = await api.post('/sessions', {
            email,
            password
        });

        const { token, user } = response.data();

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setData({ ...user, token });
    }

    return (
        <AuthContext.Provider 
            value={{ 
                user: data, signIn
            }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
