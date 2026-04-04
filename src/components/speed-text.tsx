import React from 'react';
import { Text, useColorScheme } from 'react-native';

export const SpeedText = ({ speed }: { speed: number }): React.JSX.Element => {
    const theme = useColorScheme();

    return (
        <>
            <Text style={[
                styles.speed,
                theme === 'dark' ? styles.dark : styles.light,
            ]}>
                {speed || '--'}
            </Text>
            <Text style={styles.label}>Speed</Text>
        </>
    );
}

const styles = {
    dark: {
        backgroundColor: '#000',
        color: '#fff',
    },
    light: {
        backgroundColor: '#fff',
    },
    speed: {
        fontSize: 90,
        color: '#000',
        teextAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#cdcdcd',
        marginTop: 0,
        lineHeight: 18,
    },
};
