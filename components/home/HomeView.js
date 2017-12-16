import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDecks } from '../../utils/api';

import Deck from './Deck';

export default class HomeView extends Component {
  state = {
    decks: [],
  }

  componentWillMount() {
    console.log('componentWillMount...');
    getDecks()
    .then(decks => {
      this.setState({ decks })
    });
  }

  viewDeckDetail = (deck) => {
    this.props.navigation.navigate(
      'DeckDetail',
      {deck}
    )
  }

  render () {
    const {decks} = this.state;
    console.log('decks', decks);

    return (
      <ScrollView style={styles.container}>
        {decks.map((deck) => <Deck
                                key={deck.id} 
                                data={deck}
                                viewDetail={this.viewDeckDetail}
                              />)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});