

import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';

// import WalletConnectExperience from "../../WalletConnectExperience";
// import GovContext from '../context/GovContext';
// import { ethers } from 'ethers';  

import TronWeb from 'tronweb/dist/TronWeb.js';


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


    //   //#region PUSH NOTIFICATIONS SET UP PERMISSIONS AND GET DEVICE TOKEN
    //   useEffect(() => {
        
    //     //We have added Alert and Platform form reac-native above
    //     const configurePushNotifications = async () => {
    //     //Check if the user has enabled permissions
    //     const {status} = await Notifications.getPermissionsAsync();
    //     let finalStatus = status;
        
    //     //if permissions not enabled ask the user to enable it
    //     if (finalStatus!=='granted') {
    //         const {status} = Notifications.requestPermissionsAsync();
    //         finalStatus = status;
    //     }

    //     //if after the above request still not permissions enable just alert the user
    //     if (finalStatus!=='granted') {
    //         Alert.alert('Permission required', 'Push notifications need the appropriate permissions.');
    //         return;
    //     }

    //     //if you reach this stage then all permissions needed has been enabled we can proceed and get the unique device token
    //     const pushTokenData = await Notifications.getExpoPushTokenAsync();
    //     console.log('pushTokenData: ',pushTokenData);   //see this being printed NOTE THIS IS SENITIVE INFORMATION

    //     //For Android we need an extra step in setting up a channell and stating the importance of the notifications
    //     if (Platform.OS==='android') {
    //         Notifications.setNotificationChannelAsync('default', {
    //         name: 'default',
    //         importance: Notifications.AndroidImportance.DEFAULT
    //         })
    //     }
        

    //     }

    //     configurePushNotifications();
    // },[])
    // //#endregion



    useEffect(() => {
      console.log(" ****************** ");
      console.log(` ACCOUNT Create TronWeb on load 1`);
      console.log(`ACCOUNT Setting Up HttpProvider`);
      const HttpProvider = TronWeb.providers.HttpProvider;
      const fullNode = new HttpProvider("https://api.nileex.io");
      const solidityNode = new HttpProvider("https://api.nileex.io");
      const eventServer = new HttpProvider("https://api.nileex.io");
  
      const defaultPublickey = "TCWNqQsbojjsey8jTEJgsC2RiPGyRzA5GA";
      const defaultPrivateKey = "bb4a09b98dfa5e263011c4023a2075c16c0a0ef961d32e7f28bd1eb1d4ad377b";
      console.log(`ACCOUNT defaultPrivateKey: ${defaultPrivateKey} `);
      const tempTronWeb = new TronWeb(fullNode,solidityNode,eventServer,defaultPrivateKey);
      
      console.log(" ACCOUNT ****************** ");
      const newAccount = tempTronWeb.createAccount()
      const newAccountJSON = JSON.stringify(newAccount);
      console.log(` ACCOUNT createNewAccount=> newAccountJSON: `,newAccountJSON);
        // > address:
        // {
        //     base58: "TDpBe64DqirkKWj6HWuR1pWgmnhw2wDacE"
        //     hex: "412A2B9F7641D0750C1E822D0E49EF765C8106524B"
        //     privateKey: "427139B43028A492E2705BCC9C64172392B8DB59F3BA1AEDAE41C88924960091"
        //     publicKey:"0404B604296010A55D40000B798EE8454ECCC1F8900E70B1ADF47C9887625D8BAE3866351A6FA0B5370623268410D33D345F63344121455849C9C28F9389ED9731"
        // }
      console.log(" ACCOUNT ****************** ");
  
    },[]);


  return (
    <View style={styles.container} >

        <TouchableOpacity style={styles.input} onPress={() => registerForNotifications() } >
          <Text style={styles.text} >Register for notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.input} onPress={() => unRegisterForNotifications() } >
          <Text  style={styles.text}>Unregister for notifications</Text>
        </TouchableOpacity>
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
