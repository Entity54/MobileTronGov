import React, { useMemo, useEffect, useContext, useState, Children } from "react";
import { Text, FlatList, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';

import GovContext from '../../context/GovContext';

    // import Avatars from "@components/Avatars";
    // import Icon from "@components/Icon";
import Icon from "../../components/Icon";
    // import ProgressBar from "@components/Progress/Bar";
import ProgressBar from "../../components/Progress/Bar";
    // import Tag from "@components/Tag";
import Tag from "../../components/Tag";
    // import Text from "@components/Text";
    // import { BaseColor, useTheme } from "@config";
import { BaseColor } from "../../config/theme";

import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";
// import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
 

//ntt54
//dark blue theme
// const  colors = {
//     primary: "#5DADE2",
//     primaryDark: "#1281ac",
//     primaryLight: "#68c9ef",
//     accent: "#FF8A65",
//     background: "#010101",
//     card: "#121212",
//     text: "#e5e5e7",
//     border: "#272729",
// }

//light blue theme
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


   


const TreasursScreen = ({ navigation,
    style,
    onPress,
    title = "assetManage This is a Test",
    description =
    `Some sort of description for the referendum Some sort of description for the referendum Some sort of description for the referendum`,
    onOption,
    members = ["alpha","beta"],
    limit = 3,
    tasks = 100,
    comments = 0,
    tickets = 0,
    completedTickets = 0,
    status = "Moonbase",
}) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter } = useContext(GovContext);
    const [treasurArray, setTreasurArray]  = useState([]);
    const [depositTokens, setDepositTokens] = useState();




     //#region getTreasuries
     const getTreasuries = async () => {
        console.log("Treasurs Screen Getting ready to retrieve Treasuries");

        if (tronGovernanceSC && band3 && band2 ) {
            const registeredTreasuriesAddresses  = await tronGovernanceSC.getTreasurers().call();
            // const expiredReferendaIDarray = prepearedReferendaIDarrayUint.map(itm => `${itm}`);
            console.log(`registeredTreasuriesAddresses: `,registeredTreasuriesAddresses);
            let treasuriesArray=[];

            for (let i=0; i<registeredTreasuriesAddresses.length; i++)
            {
                const treasuryAddress = registeredTreasuriesAddresses[i];
                const result = await tronWeb.trx.getAccount(treasuryAddress);
                console.log(`getAccountDetails => result: `,JSON.stringify(result));
                console.log(`Balance: ${tronWeb.fromSun(result.balance)}`);
                // console.log(`Frozen: `,JSON.stringify(result.frozen));
                // console.log(`Create Time: ${result.create_time}`);
                // console.log(`Create TimeString: ${new Date(result.create_time)}`);
                // console.log(`AccountActiveState: ${result.active_permission.type}`);
                treasuriesArray.push({
                    address: tronWeb.address.fromHex(treasuryAddress), 
                    balance: `${tronWeb.fromSun(result.balance)}`,
                    // establishedTS: `${result.create_time}`,
                    // establishtedTSstirng: `${new Date(result.create_time)}` 
                });
            }

            console.log(`treasuriesArray: `,treasuriesArray);
            setTreasurArray(treasuriesArray);
        }

    }
    //#endregion



    const createTreasury = async (amount) => {
        if (tronGovernanceSC && tronWeb && amount> 1100)
        {
          const amountSUN =  tronWeb.toSun(amount)  //123456789; //ethers.utils.parseUnits(amount,18);

          let result = await tronGovernanceSC.launchNewTreasury().send({
            feeLimit:100000000,
            callValue: amountSUN,
            shouldPollResponse:true
          });
          console.log(`New Treasury has been launched`);
  
        } else console.log(`It was not possible to launch new Treasury`);
    }


    useEffect(() => {
        if (tronGovernanceSC) 
        {
            console.log(`TreasursScreen tronGovernanceSC is set. Calling getTreasuries`);
            getTreasuries();
        }
    },[tronGovernanceSC]);

    // useEffect(() => {
    //     console.log(`refreshCounter for Treasuries Screen ${refreshCounter}`);
    //     getTreasuries();
    // },[refreshCounter])


    return (
        <>
        <View>
            <TouchableOpacity  onPress={() => navigation.navigate("CreateTreasury", { 
                             refPassed: "item.referendum_Passed",
                             description: `Referendum with ID  \nwill end at blockand the scoring block is.`,

                         }
                        )} >
                <Text style={{fontWeight:"bold"}} title3 numberOfLines={1}>
                                            {`CREATE NEW TREASURY`}
                </Text>

            </TouchableOpacity> 
            <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Nummber of TRX transferred to Tresury must be > 1100TRX'  style={newStyles.inputStyle} value={depositTokens} onChangeText={(newValue) => setDepositTokens(newValue)} />
        </View>

        <View>
         {
            treasurArray.length===0 ?
            <Text style={styles.textStyle}>Loading1000 </Text> :
            <FlatList 
                    keyExtractor={(item) => item.address}
                    data={treasurArray} 
                    renderItem={({item, index}) => {
                        return  (
                        <TouchableOpacity  onPress={() => navigation.navigate("Treasury", { 
                             treasuryAddress: item.address, 
                        }
                        )} >

                        <View style={[styles.contain, style, { backgroundColor: colors.card }]}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", fontWeight:"bold" }}>
                                    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                                        <Text style={{fontWeight:"bold"}} title3 numberOfLines={1}>
                                            {`Treasury Address:${item.address}`}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        hitSlop={{ top: 10, right: 10, top: 10, left: 10 }}
                                        style={{ paddingLeft: 16 }}
                                        onPress={onOption}
                                    >
                                        <Icon name="ellipsis-h" size={14} color={colors.text}></Icon>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        paddingTop: 5,
                                        paddingBottom: 0,
                                    }}
                                >
                                    <Tag
                                        light
                                        textStyle={{
                                            color: BaseColor.whiteColor,
                                        }}
                                        style={{
                                            backgroundColor: `${item.balance}`,
                                            paddingHorizontal: 10,
                                            minWidth: 80,
                                        }}
                                    >
                                        {`Established: item.establishtedTSstirng}`}
                                    </Tag>
                                </View>
                             
                               
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, }} >
                                    <Text caption2 light>
                                        {`Balnce: ${item.balance} TRX`}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 0, paddingBottom: 5, justifyContent: "space-between", }} >
                                    <Text overline style={{fontSize: 14, fontWeight:'bold', color:"blue" }}>
                                        {/* {("Vote Progress")} {`AYES: ${item.referendum_Ayes} NAYS: ${item.referendum_Nays} TURNOUT: ${item.referendum_Turnout} State:${item.referendum_Passed}`} */}
                                    </Text>
                                </View>
                                {/* <ProgressBar style={{ flex: 1, paddingRight: 20 }} color={BaseColor.accentColor} percent={`${item.referendum_ProgressBarPercent}`} /> */}
                            </View>
                        </View>
                       </TouchableOpacity>

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

});


export default TreasursScreen;

