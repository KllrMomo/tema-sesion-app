import { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

const TOKEN_KEY = 'user_token';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // TODO: Implementar checkToken
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      // Simular delay de carga
      await new Promise(resolve => setTimeout(resolve, 1000));

      // obtener token
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token !== null) {
        setIsLoggedIn(true); // si no es nulo iniciar sesion
      } else {
        setIsLoggedIn(false); // si es nulo no iniciar sesion
      }
    } catch (error) {
      console.error('Error al verificar token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
  };

  const handleLogout = async() => {
    setIsLoggedIn(false);
  };

  // SplashScreen simulado
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FDB813" />
      </View>
    );
  }
  return isLoggedIn ? (
    <HomeScreen onLogout={handleLogout} />
  ) : (
    <LoginScreen onLoginSuccess={handleLoginSuccess} />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
});
