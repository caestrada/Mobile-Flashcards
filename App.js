import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { setLocalNotification, clearLocalNotification } from "./utils/helpers";

import HomeView from './components/home/HomeView';
import NewDeckView from './components/deck/NewDeckView';
import DeckDetailView from './components/deck/DeckDetailView';
import AddCardView from './components/deck/AddCardView';
import QuizView from './components/quiz/QuizView';


const Tabs = TabNavigator({
  'DECKS':    { 
    screen: HomeView,
    navigationOptions: {
      header: null,
    }
  },
  'NEW DECK': { 
    screen: NewDeckView, 
    navigationOptions: {
      headerTitle: 'New Deck',
    }
  }
});

const MainNavigator = StackNavigator({
  Home: { screen: Tabs },
  DeckDetail: { screen: DeckDetailView },
  NewCard: { screen: AddCardView },
  Quiz: { screen: QuizView },
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification() 
    // clearLocalNotification()
  }

  render() {
    return (
      <View style={[styles.container, {marginTop: 10}]}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
