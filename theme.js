export const lightTheme = {
    background: '#FFFFFF',
    text: '#1A1A1A',
    cardBackground: '#F5F5F5',
    border: '#E0E0E0',
    primary: '#FDB813',
    secondary: '#4A4A4A',
};

export const darkTheme = {
    background: '#1A1A1A',
    text: '#FFFFFF',
    cardBackground: '#2C2C2C',
    border: '#4A4A4A',
    primary: '#FDB813',
    secondary: '#E0E0E0',
};

export const getTheme = (isDark) => (isDark ? darkTheme : lightTheme);