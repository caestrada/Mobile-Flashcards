import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'

HomeView.propTypes = {

}

export default function HomeView (props) {
  return (
    <View style={styles.container}>
      <Text>
        HomeView
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})