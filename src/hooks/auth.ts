import React, { createContext, useState, useContext } from 'react';

interface UserProps {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthStateProps {
  token: string;
  user: UserProps;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserProps;
  SignIn: (credentials: SignInCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>{{} as AuthContextData};