import { AsyncStorage } from 'react-native';

/* return all of the decks along with their titles, questions, and answers. */
export const getDecks = () => {
  // AsyncStorage.clear();

  return AsyncStorage.getAllKeys()
          .then((keys) => {
            return AsyncStorage.multiGet(keys);
          })
          .then(db => {
            let decks = db
                        .filter((result => {
                          const key = result[0];
                          return key !== 'MobileFlash:notifications';
                        }))
                        .map((result, i) => {
                          const key = result[0];
                          if(key === 'MobileFlash:notifications')
                            return;

                          const val = JSON.parse(result[1])

                          return { id: key, ...val }
                        });
            return decks;
          })
          .catch(err => {
            console.log('ERROR', err);
          });
}

/* take in a single 'title' argument and add it to the decks. */
export const createNewDeck = (title) => {
  const id = '_' + Math.random().toString(36).substr(2, 9)

  return AsyncStorage.setItem(id, JSON.stringify({ title: title, questions: [] }))
            .then(() => AsyncStorage.getItem(id))
            .then((deck) => Promise.resolve({id: id, ...JSON.parse(deck)}))
            .catch(err => {
              console.log('ERROR', err);
            });
}

/* Take in two arguments, 'id' and 'card', and will add the card to the 
 * list of questions for the deck with the associated title. */
export const addCardToDeck = (id, card) => {
  return AsyncStorage.getItem(id)
          .then(deck => {
            let newDeck = JSON.parse(deck)
            newDeck.questions.push(card)

            return AsyncStorage.mergeItem(id, JSON.stringify(newDeck))
                    .then(() => AsyncStorage.getItem(id))
          })
          .catch(err => {
            console.log('ERROR', err);
          });
}