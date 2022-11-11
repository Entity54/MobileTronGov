import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';

// import WalletConnectExperience from "../../WalletConnectExperience";
// import { ethers } from 'ethers';  
import GovContext from '../context/GovContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



// const encryptToken= async () => {
//   console.log(`****** Encrypt and Pass Token *******`);
// }

// const registerForNotifications= async () => {
//     console.log(`****** Register For Notifications *******`);

// }
// const unRegisterForNotifications= async () => {
//   console.log(`****** Register For Notifications *******`);

// }


const AccountScreen = ({navigation}) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter } = useContext(GovContext);
    const [accountDetails, setAccountDetails] = useState({balance: null, frozenBalance: null, creationTime: null, accountState: null });

    const getAccountDetails = async (address="TCWNqQsbojjsey8jTEJgsC2RiPGyRzA5GA") => {
      if (tronWeb && address)
      {
        const result = await tronWeb.trx.getAccount(address);
        console.log(`getAccountDetails => result: `,JSON.stringify(result));
        console.log(`Balance: ${tronWeb.fromSun(result.balance)}`);
        console.log(`Frozen: `,JSON.stringify(result.frozen));

        console.log(`Create Time: ${result.create_time}`);
        console.log(`Create TimeString: ${new Date(result.create_time)}`);
        console.log(`AccountActiveState: ${result.active_permission.type}`);
        // Balance: 1138.75732
        // Frozen:  undefined
        // Create Time: 1666533885000
        // Create TimeString: Sun Oct 23 2022 17:04:45 GMT+0300 (EEST)
        // AccountActiveState: undefined
        setAccountDetails({balance: tronWeb.fromSun(result.balance), frozenBalance: "something", creationTime: result.create_time, accountState: result.active_permission.type});
      } else console.log(`getAccountDetails cannot run as tronWeb is not set up`);
    }

    const createNewAccount= async () => {
      const value = `Hello ${new Date()}`
      console.log(`****** Create New account *******`);

      const result = await tronWeb.trx.getAccount("TCWNqQsbojjsey8jTEJgsC2RiPGyRzA5GA");
      console.log(`createNewAccount getAccountDetails => result: `,JSON.stringify(result));
      // const newAccount = await tronWeb.createAccount();
      // console.log(`****** Create New account ******* 2`);


      
      if (tronWeb)
      {
        try {
          // await AsyncStorage.setItem('@storage_Key', value)
          console.log(`Create Accoutn 1`);
  
          const newAccount = tronWeb.createAccount();
          console.log(`createNewAccount=> newAccount: `,newAccount);
          const newAccountJSON = JSON.stringify(newAccount);
          console.log(`createNewAccount=> newAccountJSON: `,newAccountJSON);

          // address: {
          //             base58: "TPbBpRXnt6ztse8XkCLiJstZyqQZvxW2sx", 
          //             hex: "4195679F3AAF5211991781D49B30525DDDFE9A18DE"
          //           }
          //  privateKey: "08089C24EC3BAEB34254DDF5297CF8FBB8E031496FF67B4EFACA738FF9EBD455"
          //  publicKey:  "04EE63599802B5D31A29C95CC7DF04F427E8F0A124BED9333F3A80404ACFC3127659C540D0162DEDB81AC5F74B2DEB4962656EFE112B252E54AC3BA1207CD1FB10"
          //ENCRYPT HERE
          console.log(`Create Accoutn 2`);
  
          await AsyncStorage.setItem('@account', newAccountJSON);
          console.log(`Create Accoutn 3`);
  
          await updateTronWeb();
          console.log(`New Account has been saved`);
  
        } catch (e) {
          console.log(`Error in savivg using AsyncStorage`);
        }

      } else console.log(`Account Screen tronWeb is not set up`);
      
    }

    const unlockVoteTokens = async () => {
      if (accountUpdated && tronGovernanceSC && tronWeb)
      {
        let result = await tronGovernanceSC.unlockVoteTokens().send({
          feeLimit:100000000,
          callValue: 0,
          shouldPollResponse:true
        });
        console.log(`unlockVoteTokens has been sent`);

      } else console.log(`NO ACCOUNT WAS FOUND`);
    }

    useEffect(() => {
      if (accountUpdated)
      {
        console.log(`ACCOUNT: ${account}`);
        getAccountDetails(account);
      }
      else {
        console.log(`NO ACCOUNT WAS FOUND`);
        getAccountDetails();
      }
    },[tronWeb])


    // useEffect(() => {
    //     console.log(`AccountScreen refreshCounter: ${refreshCounter}`);
    //     if (tronWeb && account) getAccountDetails(account);
    // },[refreshCounter])



  return (
    <View style={styles.container} >

        {/* <Text headline style={{ paddingTop: 20,  paddingBottom: 5, marginTop: -50 }} >
          {accountUpdated? `balance: ${accountDetails.balance} frozenBalance: ${accountDetails.frozenBalance} creationTime: ${accountDetails.balance} accountState: ${accountDetails.balance}`: "Please create an account"}
        </Text> */}
        <View>
          <Text style={styles.text} >Balance: </Text>
          <Text style={styles.text} >{accountDetails.balance}</Text>
        </View>
        <View>
          <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => createNewAccount() }

              >
                  <Text style={styles.buttonText}>Create Treasury A/c</Text>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => unlockVoteTokens() }

              >
                  <Text style={styles.buttonText}>Unlock Vote Tokens</Text>
          </TouchableOpacity>
        </View>



        {/* <TouchableOpacity style={styles.input} onPress={() => createNewAccount() } >
          <Text style={styles.text} >Create New Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.input} onPress={() => readAccount() } >
          <Text style={styles.text} >Read Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.input} onPress={() => getAccountDetails(account) } >
          <Text style={styles.text} >Get Fresh Account Details</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.input} onPress={() => unlockVoteTokens() } >
          <Text style={styles.text} >Unlock Vote Tokens</Text>
        </TouchableOpacity> */}


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
    color: "black",
    textAlign:"center"
    

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
   button: {
        alignItems: "center",
        width: "auto",
        height: "auto",
        // marginLeft: "auto",
        borderRadius: 10,
        backgroundColor: "#ff0000",
        padding: 15,
        marginBottom:10,
        marginTop:20,
        marginHorizontal: 20
  },
  buttonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
  },

});

export default AccountScreen;
