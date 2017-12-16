import React, { PropTypes, Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Btn({ btnTitle, onPress, style, textStyle }) {
  return(
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{btnTitle}</Text>
    </TouchableOpacity>
  )
}

export default class QuizView extends Component {

  state = {
    currentQuestionIndex: 0,
    showQuestion: true,
    correctAnswers: 0,
  }

  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
  }

  nextQuestion = (myAnser) => {
    this.setState((prevState) => {
      return {
        currentQuestionIndex: prevState.currentQuestionIndex+1,
        correctAnswers: prevState.correctAnswers + (myAnser ? 1 : 0) 
      }
    })
  }

  showAnswer = () => {
    this.setState((prevState) => {
      return {showQuestion: !prevState.showQuestion}
    })
  }

  restartQuiz = () => {
    this.setState({
      currentQuestionIndex: 0,
      correctAnswers: 0,
    })
  }

  backToDeckDetail = (deck) => {
    this.props.navigation.navigate(
      'DeckDetail',
      {deck}
    )
  }

  render () {
    const {questions, deck} = this.props.navigation.state.params
    const {currentQuestionIndex, showQuestion, correctAnswers} = this.state

    return (
      <View style={styles.container}>
        {currentQuestionIndex === questions.length 
          ? <View style={{margin: 5}}>
              <Text>Results</Text>
              <Text style={{marginBottom: 100}}>You got {correctAnswers} correct answer{correctAnswers === 1 ? '' : 's'}!</Text>
              <Btn  style={[styles.btn, {backgroundColor: 'green'}]} 
                    textStyle={{color: 'white'}}
                    btnTitle="Start Over" 
                    onPress={() => this.restartQuiz()} />
              <Btn  style={[styles.btn, {backgroundColor: 'red'}]} 
                    textStyle={{color: 'white'}}
                    btnTitle="Back to Deck" 
                    onPress={() => this.backToDeckDetail(deck)} />
            </View>
          : <View style={{margin: 5}}>
              <Text>{this.state.currentQuestionIndex + 1}/{questions.length}</Text>
              <View style={styles.center}>
                <Text style={{fontSize: 30, marginBottom: 10}}>
                  {showQuestion 
                    ? questions[currentQuestionIndex].question
                    : questions[currentQuestionIndex].answer
                  }
                </Text>
                <Btn  textStyle={showQuestion ? styles.answer : styles.question}
                      btnTitle={showQuestion ? 'Answer' : 'Question'} 
                      onPress={() => this.showAnswer()} />
              </View>
              <Btn  style={[styles.btn, {backgroundColor: 'green'}]} 
                    textStyle={{color: 'white'}}
                    btnTitle="Correct" 
                    onPress={() => this.nextQuestion(true)} />
              <Btn  style={[styles.btn, {backgroundColor: 'red'}]} 
                    textStyle={{color: 'white'}}
                    btnTitle="Incorrect" 
                    onPress={() => this.nextQuestion(false)} />
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  center: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 100,
    marginBottom: 100,
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
  answer: {
    color: 'red',
  },
  question: {
    color: 'green',
  }
})


