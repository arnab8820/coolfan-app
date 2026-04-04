import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MainControls } from './main-controls';
import { RangeInput } from './range-input';
import { SpeedPresets } from './speed-presets';
import { TimerSetup } from './timer-setup';

export function Main(): React.JSX.Element {
    const theme = useColorScheme();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={[styles.mainView, theme === 'dark' ? styles.dark : styles.light]}>
                    <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
                    <MainControls/>
                    <RangeInput />
                    <SpeedPresets />
                    <TimerSetup />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
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
    mainView: {
        height: '100%',
    },
})