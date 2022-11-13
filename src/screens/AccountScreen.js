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
          //             base58: "", 
          //             hex: ""
          //           }
          //  privateKey: ""
          //  publicKey:  ""
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
        console.log(` *** ACCOUNT SCREEN *** : ${account}`);
        getAccountDetails(account);
      }
    },[tronWeb, account, refreshCounter])


  return (
    <View style={styles.container} > 
        <View>
          <Text selectable={true} style={styles.text} >Address: </Text>
          <Text selectable={true} style={styles.addresstext} >{accountDetails.address}</Text>
        </View>
        <View>
          <Text style={styles.text} >Balance: </Text>
          <Text style={styles.addresstext} >{accountDetails.balance}</Text>
        </View>
        <View>
          <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => createNewAccount() }
              >
                  <Text style={styles.buttonText}>Create New Account</Text>
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
   
    </View>
  );
};

const styles = StyleSheet.create({
  addresstext: {
    fontSize: 17,
    color: "blue",
    textAlign:"center"
  },

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