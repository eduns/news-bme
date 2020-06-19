import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import categoryUtil from '../utils/Category';
import * as ColorTheme from '../utils/ColorTheme';

function News({ data, isTrendingTopic }) {
    const datePublished = isTrendingTopic? null : new Date(data.datePublished);
    const [month, day, year] = isTrendingTopic? [null, null, null] : datePublished.toLocaleDateString().split('/');
    const [hour, minute] = isTrendingTopic? [null, null] : datePublished.toLocaleTimeString().split(':');

    return (
        <View style={styles.container}>
            {isTrendingTopic? null :
                (
                    <View style={[styles.labelBox, {backgroundColor: ColorTheme.Modes.DARK}]}>
                        <Text style={[styles.labelText, {color: data.category? '#fff':'yellow'}]}>
                            {data.category? categoryUtil.translate(data.category):'nocategory'}
                        </Text>
                    </View>
                )
            }

            {isTrendingTopic? null :
                (
                    <View style={[styles.labelBox, {backgroundColor: '#fff'}]}>
                        <Text style={[styles.labelText, {color: ColorTheme.Modes.MILD}]}>
                            Publicado em {day}/{month}/{year} às {hour}:{minute}
                        </Text>
                    </View>
                )
            }

            <View style={styles.content}>
                <View style={{ flexDirection: 'row' }}>
                    <>
                    <Image style={styles.image}
                        source={{uri: isTrendingTopic? data.image.url :
                            data.image.thumbnail?
                            data.image.thumbnail.contentUrl :
                            require('../assets/noimageavailable.png') }
                        }
                    />
                    <View style={[styles.titleBox, { justifyContent: 'center'}]}>
                        <Text style={styles.title}>{data.name}</Text>
                    </View>
                    </>
                </View>
                <View style={[styles.labelBox,
                    {backgroundColor: ColorTheme.Modes.GRAY, borderRadius: 5}]}>
                    <Text style={[styles.labelText, {color: '#fff'}]}>
                        {isTrendingTopic? data.image.provider[0].name: data.provider[0].name}
                    </Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>
                        {isTrendingTopic? data.query.text: `${data.description} (...)`}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 2,
        backgroundColor: '#ecf0f1',
        borderBottomWidth: 1,
        borderColor: '#652435',
        marginBottom: 5
    },

    content: {
        justifyContent: 'center'
    },

    textBox: {
        marginTop: 20,
        marginBottom: 20,
        borderLeftWidth: 5,
        borderLeftColor: ColorTheme.Modes.DARK
    },

    titleBox: {
        flex: 1,
        width: 'auto',
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    title: {
        fontSize: 17,
        marginLeft: 5,
        fontWeight: 'bold'
    },

    image: {
        width: 170,
        height: 120,
        borderRadius: 5
    },

    labelBox: {
        flex: 1,
        height: 24,
        width: 'auto',
        marginTop: 3,
        marginBottom: 3,
        marginHorizontal: 0,
        paddingHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },

    text: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 2,
        textAlign: 'justify',
        fontSize: 16
    },

    labelText: {
        fontWeight: 'bold',
        fontSize: 13
    }
})

export default News