import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user_token';

export default function LoginScreen({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // Validación básica
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }
        setIsLoading(true);
        // Simulación de login (2 segundos)
        setTimeout(async () => {
            // Credenciales de prueba
            if (email === 'admin@app.com' && password === '123456') {
                // Generar token simulado
                const fakeToken = `token_${Date.now()}_${Math.random()}`;
                try {
                    // TODO: Guardar token en AsyncStorage
                    // Pista: Usa AsyncStorage.setItem(TOKEN_KEY, fakeToken)
                    await AsyncStorage.setItem(TOKEN_KEY, fakeToken);
                    onLoginSuccess(fakeToken);
                } catch (error) {
                    console.error('Error al guardar token:', error);
                    Alert.alert('Error', 'No se pudo guardar la sesión');
                }
            } else {
                Alert.alert('Error', 'Credenciales incorrectas');
            }
            setIsLoading(false);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Iniciar Sesión</Text>
            <Text style={styles.subtitle}>
                Prueba: admin@app.com / 123456
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
            />
            <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
        color: '#1A1A1A',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 40,
        textAlign: 'center',
        color: '#4A4A4A',
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#FDB813',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#1A1A1A',
        fontSize: 18,
        fontWeight: '700',
    },
});