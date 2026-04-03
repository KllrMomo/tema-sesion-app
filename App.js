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
      // TODO: Intentar leer el token de AsyncStorage
      // Pista 1: Usa AsyncStorage.getItem(TOKEN_KEY)
      // Pista 2: Si el token existe (no es null), llama a setIsLoggedIn(true)
      // Pista 3: Si no existe, el usuario debe hacer login
      // Simular delay de carga (opcional, para ver splash)
      await new Promise(resolve => setTimeout(resolve, 1000));
      // CÓDIGO A COMPLETAR AQUÍ (parte de la tarea)
    } catch (error) {
      console.error('Error al verificar token:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
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
