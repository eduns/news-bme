import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import * as ColorTheme from '../utils/ColorTheme';

export default function BackButton({ navDispatch, backScreen }) {
    return (
        <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navDispatch(backScreen())}
            style={{
                width: 100, height: 40, position: 'absolute', margin: 10,
                top: 0, right: 0, borderRadius: 10, backgroundColor: ColorTheme.Modes.GRAY,
                alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'
            }}>
            <Ionicons name='md-arrow-back' size={32} color='#fff' />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16}}>Voltar</Text>
        </TouchableOpacity>
    )
}