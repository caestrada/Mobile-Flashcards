import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import HomeView from './components/home/HomeView';
import NewDeckView from './components/deck/NewDeckView';


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
})

export default class App extends React.Component {
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
