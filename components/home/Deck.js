import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class Deck extends Component {
  
  render() {
    const deck = this.props.data

    return (
      <TouchableOpacity 
        onPress={() => this.props.viewDetail(deck)}
        style={styles.deck}>
        <Text style={{fontSize: 25}}>{deck.title}</Text>
        <Text>{deck.questions.length} card{deck.questions.length === 1 ? '' : 's'}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: '#eee',
    borderRadius: 16,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
})

