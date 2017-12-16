import { AsyncStorage } from 'react-native'

/* take in a single 'title' argument and add it to the decks. */
export const createNewDeck = (title) => {
  const id = '_' + Math.random().toString(36).substr(2, 9)

  return AsyncStorage.setItem(id, JSON.stringify({ title: title, questions: [] }))
            .then(() => AsyncStorage.getItem(id));
}