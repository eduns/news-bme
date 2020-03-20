import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Drawer({ toggleDrawer }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginLeft: 14 }} onPress={() => toggleDrawer()}>
                <Ionicons name='md-menu' size={42}/>
            </TouchableOpacity>
        </View>
    )
}