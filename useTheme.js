import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const THEME_KEY = 'app_theme';
export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // Cargar tema al montar
    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_KEY);
            if (savedTheme !== null) {
                setIsDarkMode(savedTheme === 'dark');
            }
        } catch (error) {
            console.error('Error al cargar tema:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTheme = async () => {
        try {
            const newTheme = !isDarkMode;
            setIsDarkMode(newTheme);
            await AsyncStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
        } catch (error) {
            console.error('Error al guardar tema:', error);
        }
    };
    return { isDarkMode, toggleTheme, isLoading };
};