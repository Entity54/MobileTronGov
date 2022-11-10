import TronWeb from 'tronweb/dist/TronWeb.js';

import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';

import GovContext from '../context/GovContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



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

        <Text headline style={{ paddingTop: 20,  paddingBottom: 5, marginTop: -50 }} >
          {accountUpdated? `balance: ${accountDetails.balance} frozenBalance: ${accountDetails.frozenBalance} creationTime: ${accountDetails.balance} accountState: ${accountDetails.balance}`: "Please create an account"}
        </Text>

        <TouchableOpacity style={styles.input} onPress={() => createNewAccount() } >
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
