import React, { useMemo, useEffect, useContext, useState, Children } from "react";
import { Text, FlatList, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';
import GovContext from '../../context/GovContext';

import Icon from "../../components/Icon";
import Tag from "../../components/Tag";
import { BaseColor } from "../../config/theme";
import { BaseStyle } from "@config";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { default as CardReport99 } from "../../components/Report99";

import styles from "./styles";

const colors = {
    primary: "#5DADE2",
    primaryDark: "#1281ac",
    primaryLight: "#68c9ef",
    accent: "#FF8A65",
    background: "white",
    card: "#F5F5F5",
    text: "#212121",
    border: "#c7c7cc",
};
   


const TreasursScreen = ({ navigation, style,  onPress, onOption, }) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, retrieveContentfromIPFS, pinJSONToIPFS, refreshCounter } = useContext(GovContext);
    const [treasurArray, setTreasurArray]  = useState([]);
    const [depositTokens, setDepositTokens] = useState();

    //#region getTreasuries
    const getTreasuries = async () => {
        console.log("Treasuries Screen Getting ready to retrieve Treasuries");

        if (tronGovernanceSC && band3 && band2 ) {
            const registeredTreasuriesAddresses  = await tronGovernanceSC.getTreasurers().call();
            // console.log(`registeredTreasuriesAddresses: `,registeredTreasuriesAddresses);
            let treasuriesArray=[];

            for (let i=0; i<registeredTreasuriesAddresses.length; i++)
            {
                const treasuryAddress = registeredTreasuriesAddresses[i];
                const result = await tronWeb.trx.getAccount(treasuryAddress);
                console.log(`getAccountDetails => result: `,JSON.stringify(result));
                console.log(`Balance: ${tronWeb.fromSun(result.balance)}`);
                treasuriesArray.push({
                    address: tronWeb.address.fromHex(treasuryAddress), 
                    balance: `${tronWeb.fromSun(result.balance)}`,
                });
            }

            // console.log(`treasuriesArray: `,treasuriesArray);
            setTreasurArray(treasuriesArray);
        }

    }
    //#endregion

    
    const createTreasury = async () => {

        if (tronGovernanceSC && tronWeb && depositTokens>= 1100)
        {
          const amountSUN =  tronWeb.toSun(depositTokens)   

          let result = await tronGovernanceSC.launchNewTreasury().send({
            feeLimit:2100000000,
            callValue: amountSUN,
            shouldPollResponse:true
          });
          console.log(` ***** New Treasury has been launched with ${depositTokens} TRX *****`);
          getTreasuries();
        } else console.log(`It was not possible to launch new Treasury`);
    }


    useEffect(() => {
        if (tronGovernanceSC) 
        {
            console.log(`TreasursScreen refreshCounter: ${refreshCounter} tronGovernanceSC is set. Calling getTreasuries`);
            getTreasuries();
        }
    },[tronGovernanceSC, refreshCounter]);

    return (
        <>

        {/* <View style={{ flex: 1 }}> */}
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            onChangeText={(newValue) => setDepositTokens(newValue)}
            autoCorrect={false}
            placeholder={t("> 1100 TRX")}
            placeholderTextColor={BaseColor.grayColor}
            value={depositTokens}
            selectionColor={colors.primary}
            />
        {/* </View>
        <View style={styles.container}> */}
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate("Create New Referendum")}

            >
                <Text style={styles.buttonText}>Create Treasury</Text>
            </TouchableOpacity>
        </View>



        {/* <View style={newStyles.createTrsbackgroundStyle}>
            <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Must be > 1100TRX'  style={newStyles.inputStyle} value={depositTokens} onChangeText={(newValue) => setDepositTokens(newValue)} />
        </View>
        <View>
            <Button style={newStyles.createNewTrsr}  title="SUBMIT" onPress={() => createTreasury() } />
        </View> */}


        <View>
         {
            treasurArray.length===0 ?
            <Text style={styles.textStyle}>Loading1000 </Text> :
            
            <FlatList 
            
                    keyExtractor={(item) => item.address}
                    data={treasurArray} 
                    renderItem={({item, index}) => {
                        return  (
                        <View style={[styles.contain, style, { backgroundColor: colors.card }]}>
                            <View style={{ flex: 1 }}>
                            <CardReport99 style={{ marginTop: 7, paddingTop:10 }} 
                            title = "Treasury Address"
                            price =  {item.address} 
                            price2 = {`Balance: ${item.balance}`}
                            onPress={() => navigation.navigate("Treasury Details", { 
                                treasuryAddress: item.address, 
                           }
                           )}
                            />
                            </View> 
                        </View>

                        )
                    }}
            /> 
        }
                  
        </View>
        </>
    );
};

TreasursScreen.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOption: PropTypes.func,
};

const newStyles = StyleSheet.create({
    inputStyle: {
        borderColor: '#087CBA',
        borderWidth: 2,
        flex: 1,    
        fontSize: 15,  //default is 14
        backgroundColor: '#D3E5DD',
        width: 55,
        alignSelf: 'center',    //center the element
        justifyContent: 'center' ,

    },
    createTrsbackgroundStyle: {
        marginTop: 10,
        // backgroundColor: '#93D9FF',
        height: 60,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        // flex: 1,     
        
        // justifyContent: 'center' ,
    justifyContent: 'space-between'
        

    },
    createNewTrsr: {
        borderColor: '#087CBA',
        borderWidth: 2,
        // flex: 1,     
        fontSize: 15,  //default is 14
        backgroundColor: '#D3E5DD',
        width: 85,
        alignSelf: 'center',    //center the element
        justifyContent: 'center' ,
    // justifyContent: 'space-between'
    // alignItems: 'center'

    },

});


export default TreasursScreen;

