import React, {useEffect, useState } from 'react';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { SpeedText } from './speed-text';
import { TimerText } from './timer-text';
import { webSocketMessage, webSocketStatus } from '../services/comm-service';
import WebsocketService from '../services/comm-service';

export function MainControls(): React.JSX.Element {
    const theme = useColorScheme();
    const [curSpeed, setCurSpeed] = useState(0);
    const [curTimer, setCurTimer] = useState(0);
    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
        webSocketMessage.subscribe((message) => {
            const {speed, timer} = message;
            setCurSpeed(speed);
            setCurTimer(timer);
        });
        webSocketStatus.subscribe(data=>setSocketConnected(data));
        return () => {
            webSocketMessage.unsubscribe();
            webSocketStatus.unsubscribe();
        }
    }, []);

    const turnOffFan = () => {
        if (curSpeed === 0) {return;}
        WebsocketService.send({ speed: 0 });
    }

    const turnOffTimer = () => {
        WebsocketService.send({ timer: 0 });
    }

    return (
        <View style={[
            styles.container,
            theme === 'dark' ? styles.dark : styles.light,
        ]}>
            <View style={[
                styles.control,
                socketConnected ? styles.connected : styles.disconnected,
                theme === 'dark' ? styles.dark : styles.light]}>
                    <Pressable onPress={turnOffFan} style={styles.control}>
                        <SpeedText speed={curSpeed}/>
                    </Pressable>
                    {!!curTimer && <Pressable onPress={turnOffTimer} style={styles.timer}>
                        <View style={[styles.timer, theme === 'dark' ? styles.dark : styles.light]}>
                            <TimerText timer={curTimer} />
                        </View>
                    </Pressable>}
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
    },
    control: {
        width: 300,
        height: 300,
        borderRadius: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    timer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 100,
        height: 100,
        fontSize: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        boxShadow: '0 0px 15px 5px rgba(200, 200, 200, 0.5)',
    },
    connected: {
        boxShadow: '0 0px 25px 5px rgba(0, 219, 88, 0.4)',
    },
    disconnected: {
        boxShadow: '0 0px 25px 5px rgba(255, 23, 54, 0.4)',
    },
});