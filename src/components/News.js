import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';

function News(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Image source={props.imgSrc}/>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    title: {
        fontSize: 20
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    }
})

export default News