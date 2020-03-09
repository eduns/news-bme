import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Feed from './pages/Feed';

const Routes = createAppContainer(
    createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Entrar - News BME'
            },
        },
        Feed: {
            screen: Feed,
            navigationOptions: {
                title: 'Notícias - News BME'
            }
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
    })
);

export default Routes