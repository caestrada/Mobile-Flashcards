import React, { PropTypes, Component } from 'react'
import { StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { addCardToDeck } from '../../utils/api'

function Btn({ btnTitle, onPress, style, textStyle }) {
  return(
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{btnTitle}</Text>
    </TouchableOpacity>
  )
}

export default class AddCardView extends Component {

  state = {
    question: 'Question',
    answer: 'Answer',
  }

  componentWillMount() {
    const {deckId} = this.props.navigation.state.params
    this.setState({ deckId })
  }

  handleQuestionChange = (question) => {
    this.setState(() => ({
      question
    }))
  }

  handleAnswerChange = (answer) => {
    this.setState(() => ({
      answer
    }))
  }

  submit = () => {
    const {question, answer, deckId} = this.state
    const card = {
      question,
      answer,
    }
    
    addCardToDeck(deckId, card)
    .then(result => {
      this.props.navigation.navigate(
        'Home',
      )
    })
  }

  render () {
    const {question, answer} = this.state

    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          value={question}
          style={styles.input}
          onChangeText={this.handleQuestionChange}
        />
        <TextInput
          value={answer}
          style={styles.input}
          onChangeText={this.handleAnswerChange}
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
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 7,
    color: '#959595',
  },
  btn: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    marginTop: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    alignItems: 'center',
  },
})
