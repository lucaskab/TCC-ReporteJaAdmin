import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [ user] = await AsyncStorage.multiGet([
        '@ReporteJa:user',
      ]);
      if (user[1]) {
        setData({ user: JSON.parse(user[1])});
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const user = response.data;

    await AsyncStorage.multiSet([
      ['@ReporteJa:user', JSON.stringify(user)],
    ]);

    setData({user});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@ReporteJa:user']);

    setData({});
  }, []);

  const updateUser = useCallback(
    async (user) => {
      console.log(user);
      await AsyncStorage.setItem('@ReporteJa:user', JSON.stringify(user));
      setData({
        user,
      });
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{user: data.user, loading, signIn, signOut, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
}
