import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import SearchProvider from './src/context/SearchCategory';

import SideMenu from './src/components/SideMenu';
import Drawer from './src/components/Drawer';

import Feed from './src/pages/Feed';
import Post from './src/pages/Post';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import TrendingTopics from './src/pages/TrendingTopics';

const { width } = Dimensions.get('window');

import * as ColorTheme from './src/utils/ColorTheme';

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
    navigationOptions: {
      title: 'Ler Notícia'
    }
  },
  TrendingTopics: {
    screen: TrendingTopics,
    navigationOptions: {
      title: 'Trending Topics'
    }
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
      backgroundColor: ColorTheme.Modes.DARK
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

const RootStack = createDrawerNavigator({
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

const AppContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <SearchProvider>
      <AppContainer />
    </SearchProvider>
  )
}