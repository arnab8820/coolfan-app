import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { webSocketMessage } from '../services/comm-service';
import WebSocketService from '../services/comm-service';
import React, { useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { debounceTime, Subject } from 'rxjs';

export const RangeInput = () => {
    const theme = useColorScheme();
    const [curSpeed, setCurSpeed] = React.useState(0);
    const [showUpdatedSpeed, setShowUpdatedSpeed] = React.useState(false);
    const speedSub = React.useMemo(() => new Subject(), []);

    useEffect(() => {
        webSocketMessage.subscribe((message) => {
            const { speed } = message;
            setCurSpeed(speed);
            return () => {
                webSocketMessage.unsubscribe();
            }
        });
    }, []);

    useEffect(() => {
        speedSub.pipe(
            debounceTime(300)
        ).subscribe((speed) => {
            WebSocketService.send({ speed });
            setShowUpdatedSpeed(false);
        });
    }, [speedSub]);

    const updateSpeed = (speed: number) => {
        if (speed === curSpeed) { return; }
        setCurSpeed(speed);
        setShowUpdatedSpeed(true);
        speedSub.next(speed);
    }

    return (
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <View style={styles.headingWrapper}>
                <Text style={[styles.heading, theme === 'dark' ? styles.headingDark : styles.headingLight]}>
                    Set Speed
                </Text>
                {showUpdatedSpeed && <Text style={[styles.heading, theme === 'dark' ? styles.headingDark : styles.headingLight]}>
                    {curSpeed}
                </Text>}
            </View>            
            <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={100}
                value={curSpeed}
                onValueChange={updateSpeed}
                step={1}
                minimumTrackTintColor="#b82bf0"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#eac3fa"
            />
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
    headingWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
});