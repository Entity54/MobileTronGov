import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';

// import WalletConnectExperience from "../../WalletConnectExperience";
// import { ethers } from 'ethers';  
import GovContext from '../context/GovContext';
import AsyncStorage from '@react-native-async-storage/async-storage';




const encryptToken= async () => {
  console.log(`****** Encrypt and Pass Token *******`);
}

const registerForNotifications= async () => {
    console.log(`****** Register For Notifications *******`);

}
const unRegisterForNotifications= async () => {
  console.log(`****** Register For Notifications *******`);

}


const AccountScreen = ({navigation}) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, updateCurrentBlockNumber, currentBlockNumber } = useContext(GovContext);

    const readAccount= async () => {
      console.log(`****** Read account *******`);
      try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
          console.log(`RETRIEVED VALUE : `,value);
        }
      } catch(e) {
        console.log(`Error in reading AsyncStorage value`);
      }
      
    }

    const createNewAccount= async () => {
      const value = `Hello ${new Date()}`
      console.log(`****** Create New account *******`);
      try {
        await AsyncStorage.setItem('@storage_Key', value)
      } catch (e) {
        console.log(`Error in savivg using AsyncStorage`);
      }
      
    }

    //#region 
    useEffect(() => {
        
    },[])
    // //#endregion

  return (
    <View style={styles.container} >

        <TouchableOpacity style={styles.input} onPress={() => readAccount() } >
          <Text style={styles.text} >Read Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => createNewAccount() } >
          <Text style={styles.text} >Create New Account</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.input} onPress={() => registerForNotifications() } >
          <Text style={styles.text} >Register for notifications</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.input} onPress={() => unRegisterForNotifications() } >
          <Text  style={styles.text}>Unregister for notifications</Text>
        </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: "white",
    // alignContent
    

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

export default AccountScreen;
