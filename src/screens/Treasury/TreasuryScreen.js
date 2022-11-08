import React, { useEffect, useState, useContext } from "react";
import { ScrollView, TouchableOpacity, View, Button, Header, Text, TextInput, StyleSheet } from "react-native";
import GovContext from '../../context/GovContext';
import TronTreasury_raw from '../../Abis/treasury.json';     
const tronTreasury_ABI = TronTreasury_raw.abi;

import { default as ProductSpecGrid } from "../../components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { default as CardReport03 } from "../../components/Report03";
import Icon from "../../components/Icon";
import Tag from "../../components/Tag";
import { BaseColor } from "../../config/theme";
import { BaseStyle } from "../../config/styles";
import { Images } from "../../config/images";

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


// const TAGS = [
//     { id: "1", icon: "wifi", name: "HTML", checked: true },
//     { id: "2", icon: "bath", name: "Bootstrap" },
//     { id: "3", icon: "paw", name: "CSS3" },
//     { id: "4", icon: "bus", name: "Jquery" },
// ];

const TreasuryScreen = ({navigation}) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter  } = useContext(GovContext);
    const [accountDetails, setAccountDetails] = useState({balance: null, frozenBalance: null, creationTime: null, accountState: null });
    const [treasuryAddress, setTreasuryAddress] = useState();
    const [treasurySC, setTreasurySC] = useState();
    const [treasuryAdmin, setTreasuryAdmin] = useState();
    const [depositTokens, setDepositTokens] = useState();
    // treasuryAddress = "TPi1As5HNEPEgDVfdpe4ptSnVcvw5vXSXE"


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
                    <Text selectable={true} title3>{treasuryAddress? `Treasury Address: ${treasuryAddress}`: "Loading"}</Text>
                    <Text selectable={true} title3>{treasuryAdmin? `Treasury Administrator: ${treasuryAdmin}`: "Loading"}</Text>
                    <Text title3>{accountDetails? `Treasury  Balance: ${accountDetails.balance}`: "Loading"}</Text>
          
                    <View style={styles.specifications}>
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={"0xFaCf…B63d8e"}
                            description={"Creator"}
                            
                        />
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={"0x7369…000000"}
                            description={"Owner"}
                            
                        />
                    </View>
                    <View style={styles.specifications}>
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={"129"}
                            description={"Referenda #"}
                            
                        />
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={
                                <Tag
                                    light
                                    style={{
                                        backgroundColor: BaseColor.grayColor,
                                        borderRadius: 5,
                                        paddingHorizontal: 5,
                                    }}
                                    textStyle={{ color: BaseColor.whiteColor }}
                                >
                                    On Going
                                </Tag>
                            }
                            description={"status"}
                            
                        />
                    </View>
            
                </View>

           
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <View style={{ flex: 1, paddingRight: 7 }}>
                        <CardReport03
                            style={{ marginTop: 7 }}
                            icon="chart-line"
                            title="Remaining"
                            price="3 Days 45mins"
                            time="Time"
                            blocks="Blocks"
                            percent="21,827"
                            onPress={() => navigation.navigate("FCryptol02")}
                        />
                        <CardReport03
                            style={{ marginTop: 7 }}
                            icon="chart-line"
                            title="Activate"
                            price="4 Days 1hr"
                            time="Time"
                            blocks="Block"
                            percent="#2,923,500"
                            onPress={() => navigation.navigate("FCryptol02")}
                        />

                    </View>
                </View>

                <View style={newStyles.backgroundStyle}>
                    <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Nummber of TRX'  style={newStyles.inputStyle} value={depositTokens} onChangeText={(newValue) => setDepositTokens(newValue)} />
                    <Button style={newStyles.voteButtonStyleAye}     title="Deposit" onPress={() => deposit(depositTokens) } />
                </View>

                <View style={newStyles.votingbackgroundStyle}>
                    <Button style={newStyles.voteButtonStyleNay}     title="Withdraw" onPress={() => withdraw() } />
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
        // backgroundColor: '#93D9FF',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center' 

    },
    votingbackgroundStyle: {
        marginTop: 10,
        // backgroundColor: '#93D9FF',
        height: 60,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        flex: 1,     
        
        // justifyContent: 'center' ,
    justifyContent: 'space-between'
        

    },
    voteButtonStyleAye: {
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
    voteButtonStyleNay: {
        borderColor: '#087CBA',
        borderWidth: 2,
        // flex: 1,     
        fontSize: 15,  //default is 14
        backgroundColor: '#EA6C09',
        width: 85,
        alignSelf: 'center',    //center the element
        justifyContent: 'center' ,
        backgroundColor: '#93D9FF',

    // justifyContent: 'space-between'
    // alignItems: 'center'

    },
    voteButtonStyleUnvote: {
        borderColor: '#087CBA',
        borderWidth: 7,
        // flex: 1,     
        fontSize: 15,  //default is 14
        backgroundColor: '#D3E5DD',
        width: 85,
        alignSelf: 'center',    //center the element
        justifyContent: 'center' ,
    // justifyContent: 'space-between'
    // alignItems: 'center'

    },
    
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

})

export default TreasuryScreen;
