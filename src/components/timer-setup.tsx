import React, { useState } from 'react';
import { Button, StyleSheet, Text, useColorScheme, View } from 'react-native';
import WheelPicker from '@quidone/react-native-wheel-picker';
import WebsocketService from '../services/comm-service';

export const TimerSetup = (): React.JSX.Element => {
    const theme = useColorScheme();
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);

    const hours = [...Array(24).keys()].map((index) => ({
        value: index,
        label: index.toString(),
    }));

    const mins = [...Array(60).keys()].map((index) => ({
        value: index,
        label: index.toString(),
    }));

    const startTimer = () => {
        const totalSeconds = (hour * 3600) + (min * 60);
        WebsocketService.send({ timer: totalSeconds });
        setHour(0);
        setMin(0);
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.heading, theme === 'dark' ? styles.headingDark : styles.headingLight]}>Timer</Text>
            <View style={styles.timerPicker}>
                <View>
                    <Text style={{color: theme === 'dark' ? '#dcdcdc' : '#121212'}}>Hours</Text>
                    <WheelPicker
                        data={hours}
                        value={hour}
                        onValueChanged={({item: {value}}) => setHour(value)}
                        itemHeight={25}
                        width={100}
                        itemTextStyle={{color: theme === 'dark' ? '#dcdcdc' : '#121212', fontSize: 14}}
                    />
                </View>
                <View>
                    <Text style={{color: theme === 'dark' ? '#dcdcdc' : '#121212'}}>Minutes</Text>
                    <WheelPicker
                        data={mins}
                        value={min}
                        onValueChanged={({item: {value}}) => setMin(value)}
                        itemHeight={25}
                        width={100}
                        itemTextStyle={{color: theme === 'dark' ? '#dcdcdc' : '#121212', fontSize: 14}}
                    />
                </View>
                <Button
                    title="Start"
                    onPress={startTimer}/>
            </View>
        </View>
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
    container: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    heading: {
        fontSize: 16,
        color: '#121212',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    headingDark: {
        color: '#dcdcdc',
    },
    headingLight: {
        color: '#121212',
    },
    timerPicker: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})