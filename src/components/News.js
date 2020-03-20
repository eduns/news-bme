import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

function News({data, isPreview}) {

    return (
        <View style={isPreview? previewStyle.container : styles.container}>
            <View style={styles.subjectBox}>
                <Text style={styles.subjectText}>{data.subject}</Text>
            </View>
            <View style={isPreview? previewStyle.content : styles.content}>
                <View style={isPreview? {flexDirection: 'row'}: null}>
                    {
                        isPreview? (
                            <>
                            <Image style={previewStyle.image} source={data.imgSrc}/>
                            <View style={previewStyle.titleBox}>
                                <Text style={previewStyle.title}>{data.title}</Text>
                            </View>
                            </>
                        ) : (
                            <>
                            <Text style={styles.title}>{data.title}</Text>
                            <Image style={styles.image} source={data.imgSrc}/>
                            </>
                        )
                    }
                </View>
                <View style={styles.textBox}>
                    <Text style={isPreview? previewStyle.text : styles.text}>
                        {isPreview? `${data.text.substring(0, data.text.length * .25)} (...)`
                        : data.text}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const previewStyle = StyleSheet.create({
    container: {
        margin: 3,
        backgroundColor: '#ecf0f1',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#652435',
        marginBottom: 10
    },
    content: {
        justifyContent: 'center'
    },
    titleBox: {
        flex: 1,
        width: 'auto',
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 40,
        marginLeft: 5
    },
    image: {
        width: 170,
        height: 120
    },
    text: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 2,
        textAlign: 'justify',
        fontSize: 16
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        borderColor: '#652435',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 35
    },
    image: {
        width: 370,
        height: 300,
        borderColor: 'aquamarine',
        marginTop: 20
    },
    textBox: {
        marginTop: 20,
        marginBottom: 20,
        borderLeftWidth: 5,
        borderLeftColor: 'blue'
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2,
        marginBottom: 2,
        textAlign: 'justify',
        fontSize: 16
    },
    subjectBox: {
        flex: 1,
        height: 24,
        width: 'auto',
        marginTop: 3,
        marginBottom: 3,
        marginHorizontal: 0,
        paddingHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#006fa6'
    },
    subjectText: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#FFF'
    }
})

export default News