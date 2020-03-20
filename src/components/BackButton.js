import React from 'react';
import { TouchableOpacity, Button } from 'react-native';

export default function BackButton({ navDispatch, backScreen }) {
    return (
        <TouchableOpacity
            style={{ 
                width: 100,
                position: 'absolute',
                margin: 16,
                bottom: 0,
                right: 0
            }}
            activeOpacity={0.4}>

            <Button title={'Voltar'}  onPress={() => navDispatch(backScreen())} />
        </TouchableOpacity>
    )
}