import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

import store from '../utils/StoreData';

export default function Chart({ navigation }) {
    const [accesses, setAccesses] = useState([]);

    const categoryAccesses = {
        'Brazil': countCategoryAccess('Brazil'),
        'World': countCategoryAccess('World'),
        'Politics': countCategoryAccess('Politics'),
        'Sports': countCategoryAccess('Sports'),
        'Business': countCategoryAccess('Business'),
        'Entertainment': countCategoryAccess('Entertainment'),
        'ScienceAndTechnology': countCategoryAccess('ScienceAndTechnology'),
    }

    function countCategoryAccess(category) {
        const filteredAccesses = accesses.filter(access => access.category === category);
        return filteredAccesses.length
    }

    useEffect(() => {
        async function fetchAccesses() {
            let userData = await store.get(`user_${global.user.email}`);
            if(!userData['accesses']) userData['accesses'] = [];
            setAccesses(userData['accesses'])
        }
        fetchAccesses()
    }, [])

    const accessData = [
        { // Brasil
            key: 1,
            value: categoryAccesses['Brazil'],
            svg: { fill: '#0b671a' },
            //arc: { outerRadius: '130%', cornerRadius: 10 }
        },
        { // Mundo
            key: 2,
            value: categoryAccesses['World'],
            svg: { fill: '#184ede' }
        },
        { // Política
            key: 3,
            value: categoryAccesses['Politics'],
            svg: { fill: '#222631' }
        },
        { // Esportes
            key: 4,
            value: categoryAccesses['Sports'],
            svg: { fill: '#db6015' }
        },
        { // Entretenimento
            key: 5,
            value: categoryAccesses['Entertainment'],
            svg: { fill: '#600080' }
        },
        { // Negócios
            key: 6,
            value: categoryAccesses['Business'],
            svg: { fill: '#253fac' }
        },
        { // Ciência e Tecnologia
            key: 7,
            value: categoryAccesses['ScienceAndTechnology'],
            svg: { fill: '#259bac'}
        }
    ];

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 40, alignSelf: 'center'}}>
                <Text style={styles.title}>Total: </Text>
                <Text style={[styles.title, styles.headline ]}>{accesses.length}</Text>
            </View>
            <PieChart
                style={{ height: 300 }}
                valueAccessor={({ item }) => item.value}
                animate={true}
                data={accessData}
                spacing={0}
                outerRadius={'95%'}
            />
            <View style={styles.categoryContainer}>
                <View style={styles.category}>
                    <View style={[styles.categoryColor, { backgroundColor: '#259bac' }]} />
                    <Text style={styles.title}>Ciência e Tecnologia - </Text>
                    <Text style={[styles.title, styles.headline]}>{categoryAccesses['ScienceAndTechnology']}</Text>
                </View>

                <View style={styles.category}>
                    <View style={[styles.categoryColor, { backgroundColor: '#253fac' }]} />
                    <Text style={styles.title}>Negócios - </Text>
                    <Text style={[styles.title, styles.headline]}>{categoryAccesses['Business']}</Text>
                </View>

                <View style={styles.category}>
                    <View style={[styles.categoryColor, { backgroundColor: '#600080' }]} />
                    <Text style={styles.title}>Entretenimento - </Text>
                    <Text style={[styles.title, styles.headline]}>{categoryAccesses['Entertainment']}</Text>
                </View>

                <View style={styles.category}>
                    <View style={[styles.categoryColor, { backgroundColor: '#db6015' }]} />
                    <Text style={styles.title}>Esportes - </Text>
                    <Text style={[styles.title, styles.headline]}>{categoryAccesses['Sports']}</Text>
                </View>

                <View style={styles.category}>
                    <View style={[styles.categoryColor, { backgroundColor: '#222631' }]} />
                    <Text style={styles.title}>Política - </Text>
                    <Text style={[styles.title, styles.headline]}>{categoryAccesses['Politics']}</Text>
                </View>

                <View style={styles.category}>
                    <View style={[styles.categoryColor, { backgroundColor: '#184ede' }]} />
                    <Text style={styles.title}>Mundo - </Text>
                    <Text style={[styles.title, styles.headline]}>{categoryAccesses['World']}</Text>
                </View>

                <View style={styles.category}>
                    <View style={[styles.categoryColor, { backgroundColor: '#0b671a', borderColor: '#fecc13' }]} />
                    <Text style={styles.title}>Brasil - </Text>
                    <Text style={[styles.title, styles.headline]}>{categoryAccesses['Brazil']}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    
    categoryContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 20,
        paddingHorizontal: 40 
    },

    categoryColor: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderRadius: 50,
        marginRight: 4,
        alignSelf: 'center'
    },

    category: {
        flexDirection: 'row',
    },

    title: {
        fontSize: 24,
    },

    headline: {
        color: 'blue',
        fontWeight: 'bold'
    }
})