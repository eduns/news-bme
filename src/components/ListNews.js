import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import News from './News';

import data from '../mock/data';

function ListNews(props) {
  return (
    <FlatList
      data={data}
      renderItem={item => console.log(item)}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  }
})

export default ListNews