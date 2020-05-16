import React from 'react';
import { StyleSheet, Modal, View, ActivityIndicator } from 'react-native';

import * as ColorTheme from '../utils/ColorTheme';

export default function Loader({loading}) {
    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={loading}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={loading} size={60} color={ColorTheme.Modes.MILD} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060'
    },

    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 150,
        width: 150,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})