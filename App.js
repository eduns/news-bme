import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import SideMenu from './src/components/SideMenu';
import Drawer from './src/components/Drawer';

import Feed from './src/pages/Feed';
import Post from './src/pages/Post';
import Login from './src/pages/Login';
import Register from './src/pages/Register';

const { width } = Dimensions.get('window');

global.userIsLogged = false;

const MainScreens = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: ({ navigation }) => ({
      title: 'Notícias',
      headerLeft: () => (<Drawer toggleDrawer={navigation.toggleDrawer} />)
    })
  },
  Post: {
    screen: Post,
    navigationOptions: ({ navigation }) => ({
      title: 'Ler Notícia',
      headerLeft: () => (<Drawer toggleDrawer={navigation.toggleDrawer} />)
    })
  }
}, {
  initialRouteName: 'Feed',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#006fa6'
    },
    headerBackTitleVisible: false,
    headerTintColor: '#FFF',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Roboto'
    },
    headerTitleAlign: 'center'
  }
});

const LoginScreens = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Entrar - News BME',
      headerLeft: () => (<Drawer toggleDrawer={navigation.toggleDrawer} />)
    })
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      title: 'Cadastre-se - News BME',
      headerLeft: () => (<Drawer toggleDrawer={navigation.toggleDrawer} />)
    })
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#006fa6'
    },
    headerBackTitleVisible: false,
    headerTintColor: '#FFF',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Roboto'
    },
    headerTitleAlign: 'center'
  }
});

const App = createDrawerNavigator({
  MainStack: {
    screen: MainScreens
  },
  LoginStack: {
    screen: LoginScreens
  }
}, {
  headerMode: 'float',
  drawerWidth: width - 120,
  contentComponent: SideMenu
});

export default createAppContainer(App)