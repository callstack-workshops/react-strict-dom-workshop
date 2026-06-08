import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Greeting } from '@ui/components';

function App() {
  return (
    <View style={styles.root}>
      <Greeting name="React Strict DOM" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05070f',
  },
});

export default App;
