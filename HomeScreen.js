import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './useTheme';
import { getTheme } from './theme';
const TOKEN_KEY = 'user_token';
export default function HomeScreen({ onLogout }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const theme = getTheme(isDarkMode);
    const handleLogout = async () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro que deseas salir?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Salir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Se elimina el token para no mantener la sesión activa
                            await AsyncStorage.removeItem(TOKEN_KEY);
                            onLogout();
                        } catch (error) {
                            console.error('Error al cerrar sesión:', error);
                        }
                    },
                },
            ]
        );
    };
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.title, { color: theme.text }]}>
                    Sesión Activa
                </Text>
                <Text style={[styles.subtitle, { color: theme.secondary }]}>
                    Tu sesión se mantiene incluso al cerrar la app
                </Text>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        Tema de la Aplicación
                    </Text>
                    <TouchableOpacity
                        style={[styles.themeButton, { borderColor: theme.border }]}
                        onPress={toggleTheme}
                    >
                        <Text style={[styles.themeButtonText, { color: theme.text }]}>
                            {isDarkMode ? ' Modo Oscuro' : ' Modo Claro'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>
                        Cerrar Sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        padding: 30,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    themeButton: {
        borderWidth: 2,
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
    },
    themeButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});
