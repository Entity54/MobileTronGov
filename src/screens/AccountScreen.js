import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';

// import WalletConnectExperience from "../../WalletConnectExperience";
// import GovContext from '../context/GovContext';
// import { ethers } from 'ethers';  



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


      //#region PUSH NOTIFICATIONS SET UP PERMISSIONS AND GET DEVICE TOKEN
      useEffect(() => {
        
        // //We have added Alert and Platform form reac-native above
        // const configurePushNotifications = async () => {
        // //Check if the user has enabled permissions
        // const {status} = await Notifications.getPermissionsAsync();
        // let finalStatus = status;
        
        // //if permissions not enabled ask the user to enable it
        // if (finalStatus!=='granted') {
        //     const {status} = Notifications.requestPermissionsAsync();
        //     finalStatus = status;
        // }

        // //if after the above request still not permissions enable just alert the user
        // if (finalStatus!=='granted') {
        //     Alert.alert('Permission required', 'Push notifications need the appropriate permissions.');
        //     return;
        // }

        // //if you reach this stage then all permissions needed has been enabled we can proceed and get the unique device token
        // const pushTokenData = await Notifications.getExpoPushTokenAsync();
        // console.log('pushTokenData: ',pushTokenData);   //see this being printed NOTE THIS IS SENITIVE INFORMATION

        // //For Android we need an extra step in setting up a channell and stating the importance of the notifications
        // if (Platform.OS==='android') {
        //     Notifications.setNotificationChannelAsync('default', {
        //     name: 'default',
        //     importance: Notifications.AndroidImportance.DEFAULT
        //     })
        // }
        

        // }

        // configurePushNotifications();
    },[])
    //#endregion

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
