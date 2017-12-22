import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getDecks } from '../../utils/api';

import Deck from './Deck';

function Btn({ btnTitle, onPress, style, textStyle }) {
  return(
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{btnTitle}</Text>
    </TouchableOpacity>
  )
}

export default class HomeView extends Component {
  state = {
    decks: [],
  }

  componentWillMount() {
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

  newDeck = () => {
    const {navigate} = this.props.navigation;
    navigate('NEW DECK');
  }

  render () {
    const {decks} = this.state;

    return (
      <View style={styles.container}>
      {decks.length === 0
        ? <View style={styles.welcome}>
            <Text style={{textAlign: 'center'}}>No decks!{'\n'}Go ahead and create a new one.</Text>
            <Btn btnTitle="New Deck" style={styles.btn} onPress={this.newDeck}/>
          </View>
        : <ScrollView style={styles.container}>
            {decks.map((deck) => <Deck
              key={deck.id} 
              data={deck}
              viewDetail={this.viewDeckDetail}
            />)
            }
          </ScrollView>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    alignItems: 'center',
  },
});