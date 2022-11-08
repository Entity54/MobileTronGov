import React, { useReducer } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';



const getHistoricalVotes= async () => {
    console.log(`****** Register For Notifications *******`);

}
const getHistoricalEndorsements= async () => {
  console.log(`****** Register For Notifications *******`);

}

const HistoryScreen = ({navigation}) => {

  return (
    <View style={styles.container} >

        <TouchableOpacity style={styles.input} onPress={() => getHistoricalVotes() } >
          <Text style={styles.text} >Coming soon getHistoricalVotes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.input} onPress={() => getHistoricalEndorsements() } >
          <Text  style={styles.text}>Coming soon getHistoricalEndorsements</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: "white",
  },
  input: {
    margin: 15,
    borderColor: "black",
    borderWidth: 1,
    height: 80,
    backgroundColor: 'navy',
    justifyContent: "center"
  },

  container: {
    flex: 5,
    paddingTop: StatusBar.currentHeight,
    alignSelf: 'center',
    justifyContent: "center"
  },
});

export default HistoryScreen;
