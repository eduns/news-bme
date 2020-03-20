import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import News from '../components/News';
import data from '../mock/data';

export default function Feed({ navigation }) {

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.title}
      renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => {
              if(!global.userIsLogged) {
                navigation.dispatch(
                  NavigationActions.navigate({
                    routeName: 'LoginStack',
                    action: NavigationActions.navigate({
                      routeName: 'Login',
                      params: { post: item }
                    })
                  })
                )
              } else {
                navigation.navigate('Post', { post: item }) }
              }
            }
            >
            <News data={item} isPreview={true} />
          </TouchableOpacity>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  }
})