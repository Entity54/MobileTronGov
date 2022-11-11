import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';

import GovContext from '../context/GovContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AccountScreen = ({navigation}) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter } = useContext(GovContext);
    const [accountDetails, setAccountDetails] = useState({address: null, balance: null});

    const getAccountDetails = async (address) => {
      if (tronWeb && address)
      {
        const result = await tronWeb.trx.getAccount(address);
        console.log(`getAccountDetails => result: `,JSON.stringify(result));
        console.log(`Balance: ${tronWeb.fromSun(result.balance)}`);
        setAccountDetails({address: address, balance: tronWeb.fromSun(result.balance)});
      } else console.log(`getAccountDetails cannot run as tronWeb is not set up`);
    }

    const createNewAccount= async () => {
      console.log(`****** Create New account *******`);
      
      if (tronWeb)
      {
        try {
          const newAccount = tronWeb.createAccount();
          const newAccountJSON = JSON.stringify(newAccount);
          console.log(`createNewAccount=> newAccountJSON: `,newAccountJSON);
          // address: {
          //             base58: "TPbBpRXnt6ztse8XkCLiJstZyqQZvxW2sx", 
          //             hex: "4195679F3AAF5211991781D49B30525DDDFE9A18DE"
          //           }
          //  privateKey: "08089C24EC3BAEB34254DDF5297CF8FBB8E031496FF67B4EFACA738FF9EBD455"
          //  publicKey:  "04EE63599802B5D31A29C95CC7DF04F427E8F0A124BED9333F3A80404ACFC3127659C540D0162DEDB81AC5F74B2DEB4962656EFE112B252E54AC3BA1207CD1FB10"
          await AsyncStorage.setItem('@account', newAccountJSON);
  
          await updateTronWeb();
          console.log(`New Account has been saved`);
        } catch (e) {
          console.log(`Error in saving using AsyncStorage Error: `,e);
        }

      } else console.log(`Account Screen tronWeb is not set up`);
      
    }

    
    const unlockVoteTokens = async () => {
      if (tronGovernanceSC && tronWeb)
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
      if (account && tronWeb)
      {
        console.log(`ACCOUNT SCREEN: ${account}`);
        getAccountDetails(account);
      }
    },[tronWeb, account])


    // useEffect(() => {
    //     console.log(`AccountScreen refreshCounter: ${refreshCounter}`);
    //     if (tronWeb && account) getAccountDetails(account);
    // },[refreshCounter])



  return (
    <View style={styles.container} >

<View>
        <Text headline style={{ paddingTop: 20,  paddingBottom: 5, marginTop: -50 }} >
          {accountUpdated? `address:${accountDetails.address}`: "Please create an account"}
        </Text>
</View>
<View>
      <Text></Text>
</View>

<View>
        <Text headline style={{ paddingTop: 20,  paddingBottom: 5, marginTop: -50 }} >
          {accountUpdated? `balance: ${accountDetails.balance}`: "Please create an account"}
        </Text>
</View>


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
