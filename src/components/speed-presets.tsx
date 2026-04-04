import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import WebSocketService from '../services/comm-service';


export const SpeedPresets = (): React.JSX.Element => {
    const presets = [
        {
            label: 'Stealth',
            speed: 5,
        },
        {
            label: 'Quiet',
            speed: 10,
        },
        {
            label: 'Turbo',
            speed: 100,
        },
        {
            label: 'Low',
            speed: 25,
        },
        {
            label: 'Medium',
            speed: 50,
        },
        {
            label: 'High',
            speed: 75,
        },
    ];

    const updateSpeed = (speed: number) => {
        WebSocketService.send({ speed });
    }
    
    return (
        <View style={styles.container}>
            <FlatList 
                data={presets} 
                numColumns={3} 
                renderItem={({item})=>(
                    <Pressable style={({ pressed }) => [
                        styles.presetBtn,
                        pressed && styles.presetPressed,
                    ]}
                    onPress={() => updateSpeed(item.speed)}>
                        <Text>{item.label}</Text>
                    </Pressable>
                )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    presetBtn: {
        flex: 1,
        margin: 5,
        height: 50,
        backgroundColor: '#dfcae8',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    presetPressed: {
        backgroundColor: '#ffaa0d',
    }
});