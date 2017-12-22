import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { createNewDeck } from '../../utils/api';
import { NavigationAction, NavigationActions } from 'react-navigation';

function Btn({ btnTitle, onPress, style, textStyle }) {
  return(
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{btnTitle}</Text>
    </TouchableOpacity>
  )
}

export default class NewDeckView extends Component {
  state = {
    input: ''
  }

  handleTextChange = (input) => { this.setState(() => ({input})) }
  submit = () => {
    const {input} = this.state;
    if(input === '') 
      return;
    
    createNewDeck(input).then(deck => {
      const {navigate} = this.props.navigation;
      navigate(
        'DeckDetail',
        {deck}
      )
    })
  }

  render() {
    const { input } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 40}}>What is the title of your new deck?</Text>
        <TextInput
          value={input}
          style={styles.input}
          onChangeText={this.handleTextChange}
        />
        <Btn btnTitle="Submit" style={styles.btn} onPress={this.submit}/>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 44,
    borderWidth: 1,
    padding: 8,
    borderColor: '#757575',
    margin: 50,
    backgroundColor: '#fff',
    borderRadius: 7,
    color: '#959595',
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
})
