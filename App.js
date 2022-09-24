import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import store  from './src/redux/store';
import { Provider } from 'react-redux'

import Navigator from "./src/navigation"

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
      <Navigator/>
      </Provider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
