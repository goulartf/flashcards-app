import React from 'react';
import {StatusBar, View} from 'react-native';
import {Root} from 'native-base';
import {Constants} from 'expo'

import {createAppContainer, createStackNavigator} from 'react-navigation'

import {Provider} from "react-redux";
import reducer from './reducers';

import {createStore} from 'redux';

import Home from './components/Home';
import Deck from './components/Decks/Deck';
import CreateDeck from './components/Decks/CreateDeck';
import ListDeck from './components/Decks/ListDeck';
import CreateCard from './components/Cards/CreateCard';
import Quiz from './components/Quiz';

import { setLocalNotification } from './utils/helpers'

function MyStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const AppStackNavigator = createStackNavigator({
        Home: {
            screen: Home
        },
        Deck: {
            screen: Deck
        },
        ListDeck: {
            screen: ListDeck
        },
        CreateDeck: {
            screen: CreateDeck
        },
        CreateCard: {
            screen: CreateCard
        },
        Quiz: {
            screen: Quiz
        }
    },
    {
        initialRouteName: "Home",
        headerMode: "none"
    }
);

const MainNavigator = createAppContainer(AppStackNavigator)

export default class App extends React.Component {

    state = {
        isReady: false
    };

    componentWillMount() {

        setLocalNotification()
        this.loadFonts();
    }

    async loadFonts() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return (
            <Provider store={createStore(reducer)}>
                <Root>
                <View style={{flex: 1}}>
                    <MyStatusBar backgroundColor={"#30488B"} barStyle="light-content"/>
                    <MainNavigator/>
                </View>
                </Root>
            </Provider>
        );
    }
}
