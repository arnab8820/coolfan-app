import React from 'react';
import { StyleSheet, Text, useColorScheme } from 'react-native';

export const TimerText = ({ timer }: { timer: number }): React.JSX.Element => {
    const theme = useColorScheme();

    const formatTime = (seconds: number): string => {
        if (seconds <= 0) {return 'Off';}
        const minutes = Math.floor(seconds / 60);
        return `${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Text style={[styles.time, theme === 'dark' ? styles.dark : styles.light]}>
                {formatTime(timer)}
            </Text>
            <Text style={styles.label}>Timer</Text>
        </>
    );
}


const styles = StyleSheet.create({
    dark: {
        backgroundColor: '#000',
        color: '#fff',
    },
    light: {
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        color: '#cdcdcd',
        marginTop: 0,
        lineHeight: 18,
    },
    time: {
        fontSize: 20,
    }
});