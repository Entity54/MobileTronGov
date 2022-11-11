import React, { useEffect, useState, useContext } from "react";
import { ScrollView, TouchableOpacity, View, Button, Header, Text, TextInput, StyleSheet } from "react-native";
import GovContext from '../../context/GovContext';
import TronTreasury_raw from '../../Abis/treasury.json';     
const tronTreasury_ABI = TronTreasury_raw.abi;

import { SafeAreaView } from "react-native-safe-area-context";
import { BaseStyle } from "../../config/styles";
import { default as CardReport100 } from "../../components/Report100";

import styles from "./styles";


const TreasuryScreen = ({navigation}) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter  } = useContext(GovContext);
    const [accountDetails, setAccountDetails] = useState({balance: null, frozenBalance: null, creationTime: null, accountState: null });
    const [treasuryAddress, setTreasuryAddress] = useState();
    const [treasurySC, setTreasurySC] = useState();
    const [treasuryAdmin, setTreasuryAdmin] = useState();
    const [depositTokens, setDepositTokens] = useState();


    const getAccountDetails = async () => {
        if (tronWeb && treasuryAddress)
        {
          const result = await tronWeb.trx.getAccount(treasuryAddress);
          console.log(`getAccountDetails => result: `,JSON.stringify(result));
          console.log(`Balance: ${tronWeb.fromSun(result.balance)}`);
          setAccountDetails({balance: tronWeb.fromSun(result.balance), frozenBalance: "something", creationTime: "new Date(result.create_time)", accountState: "result.active_permission.type"});
        } else console.log(`getAccountDetails cannot run as tronWeb is not set up`);
    }

    const deposit = async (amount) => {
        if (treasuryAddress && tronWeb && amount>0)
        {
            const amountSUN =  tronWeb.toSun(amount)  
            console.log(`Sending amountSUN: ${amountSUN} to: ${treasuryAddress}`);
            await tronWeb.trx.sendTransaction(treasuryAddress, amountSUN);
            console.log(`Sent amountSUN: ${amountSUN} to: ${treasuryAddress}`);
            await getAccountDetails();
        }
        else console.log(`****** Cannot deposti TRX to the Treasury Address *******`);
    }

    const withdraw = async () => {
        if (treasurySC && treasuryAdmin && (treasuryAdmin===account))
        {
            let result = await treasurySC.withdrawSC().send({
                feeLimit:100000000,
                callValue: 0,
                shouldPollResponse:true
            });
             
            await getAccountDetails();
        }
        else console.log(`****** Withdraw funds from treasury is only allowed for the Treasury Admin *******`);
    }

    useEffect(() => {
        console.log(`Connecting 2123 to Treasury Smart contract account: ${account}`);
        const setupTreasurySC = async (trAddress) => {
            const tronTreasuryContract = await tronWeb.contract(tronTreasury_ABI, trAddress);
            const treasuryAdmin  = tronWeb.address.fromHex(await tronTreasuryContract.admin().call());
            setTreasurySC(tronTreasuryContract);
            setTreasuryAdmin(treasuryAdmin);
        }

        if (tronWeb && account) 
        {
            const passedParamsObject = navigation.getState().routes[1].params;
            setTreasuryAddress(passedParamsObject.treasuryAddress);
            setupTreasurySC(passedParamsObject.treasuryAddress);
        }
    },[tronWeb])

    useEffect(() => {
        // console.log(`Currnet treasuryAddress: ${treasuryAddress} getAccountDetails()`);
        if (treasuryAddress) getAccountDetails();
    },[treasuryAddress])



    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView, { flex: 1 }]}
            edges={["right", "top", "left"]}
        >

            <ScrollView
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >

                <View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>

                                <CardReport100 style={{ marginTop: 7, paddingTop:10 }} 
                                title = "Treasury Address"
                                treasuryadd =  {treasuryAddress} 
                                title2 = "Treasury Admin Address"
                                treasuryadm =  {treasuryAdmin} 
                                title3 = "Balance"
                                balance = {accountDetails.balance}
                                />
                    </View>

                    <View style={styles.contain}>

                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => deposit(depositTokens) }

                        >
                            <Text style={styles.buttonText}>Deposit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => withdraw() } 

                        >
                            <Text style={styles.buttonText}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={newStyles.votingbackgroundStyle}>
                    <Button style={newStyles.voteButtonStyleNay} title="Withdraw" onPress={() => withdraw() } />
                </View>

                <View style={{ flex: 1, paddingLeft: 7,  marginTop: 7 }}>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};



const newStyles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 10,
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center' 

    },
    votingbackgroundStyle: {
        marginTop: 10,
        height: 60,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        flex: 1,     
        justifyContent: 'space-between'
    },
    voteButtonStyleAye: {
        borderColor: '#087CBA',
        borderWidth: 2,
        fontSize: 15,   
        backgroundColor: '#D3E5DD',
        width: 85,
        alignSelf: 'center',     
        justifyContent: 'center' ,
    },
    voteButtonStyleNay: {
        borderColor: '#087CBA',
        borderWidth: 2,
        fontSize: 15,   
        backgroundColor: '#EA6C09',
        width: 85,
        alignSelf: 'center',     
        justifyContent: 'center' ,
        backgroundColor: '#93D9FF',
    },
    voteButtonStyleUnvote: {
        borderColor: '#087CBA',
        borderWidth: 7,
        fontSize: 15,   
        backgroundColor: '#D3E5DD',
        width: 85,
        alignSelf: 'center',    
        justifyContent: 'center' ,
    },
    inputStyle: {
        borderColor: '#087CBA',
        borderWidth: 2,
        flex: 1,    
        fontSize: 15,   
        backgroundColor: '#D3E5DD',
        width: 55,
        alignSelf: 'center',    
        justifyContent: 'center' ,
    },

})

export default TreasuryScreen;