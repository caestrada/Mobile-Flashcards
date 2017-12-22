import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Button } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';

function Btn({ btnTitle, onPress }) {
  return(
    <TouchableOpacity
      style={styles.cardBtn}
      onPress={onPress}>
      <Text>{btnTitle}</Text>
    </TouchableOpacity>
  )
}

export default class DeckDetailView extends Component {
  state = {
    height: new Animated.Value(0),
  };

  static navigationOptions = (props) => {
    const {navigate} = props.navigation;
    return {
      headerLeft: <Button title="Home" onPress={() => navigate('Home')}/>,
    }
  };

  componentWillMount() {
    const { height } = this.state
    Animated.timing(height, { toValue: 350, duration: 1250 }).start()
  }

  startQuiz = (deck) => {
    const {questions} = this.props.navigation.state.params.deck;
    this.props.navigation.navigate('Quiz', {questions, deck});

    clearLocalNotification().then(setLocalNotification())
  }

  addNewCard = (deck) => {
    this.props.navigation.navigate('NewCard', {
      deckId: deck.id
    })
  }

  render () {
    const {deck} = this.props.navigation.state.params;
    const {height} = this.state;

    return (
      <View style={styles.container}>
        <Animated.View style={{ height }}>
          <Text style={{textAlign: 'center', fontSize: 40}}>{deck.title}</Text>
          <Text style={{textAlign: 'center'}}>{deck.questions.length} card{deck.questions.length === 1 ? '' : 's'}</Text>
        </Animated.View>
        <Btn
          btnTitle="Add Card"
          onPress={() => this.addNewCard(deck)}/>
        <Btn
          btnTitle="Start Quiz"
          onPress={() => this.startQuiz(deck)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  cardTitle: {
    backgroundColor: 'red',
    textAlign: 'center',
  },
  cardBtn: {
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