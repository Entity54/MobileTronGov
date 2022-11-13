import React, { useMemo, useEffect, useContext, useState, Children } from "react";
import { Text, FlatList, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';
import GovContext from '../../context/GovContext';

import Icon from "../../components/Icon";
import ProgressBar from "../../components/Progress/Bar";
import Tag from "../../components/Tag";
import { BaseColor } from "../../config/theme";
import PropTypes from "prop-types";

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


const ReferendaScreen = ({ navigation, style, onPress, onOption }) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, retrieveContentfromIPFS, pinJSONToIPFS, refreshCounter  } = useContext(GovContext);
    const [referendaArray, setReferendaArray]  = useState([]);

    //#region getActiveRefrenda
    const getActiveRefrenda = async () => {
        console.log("Referenda Screen Getting ready to retrieve Active refrenda");

        if (tronGovernanceSC && band3 && band2 ) {
            const activeReferendaIDarrayUint  = await tronGovernanceSC.getActiveReferenda().call();
            const activeReferendaIDarray = activeReferendaIDarrayUint.map(itm => `${itm}`);
            // console.log(`activeReferendaIDarray: `,activeReferendaIDarray);
            let activereferendarray=[];

            for (let i=0; i<activeReferendaIDarray.length; i++)
            {
                const refID = activeReferendaIDarray[i];
                const referendumDetails  = await tronGovernanceSC.referendumDetails(refID).call();

                const refAmountSun = Number(`${referendumDetails[3]}`);
                let tagColor,tagText; 
                if (refAmountSun>=band3)
                {
                    tagColor   = "darkred",
                    tagText    = "Band3"
                }
                else if (refAmountSun>=band2)
                {
                    tagColor   = "darkblue",
                    tagText    = "Band2"
                }
                else
                {
                    tagColor   = "darkgreen",
                    tagText    = "Band1"
                }

                const startBlock = Number(`${referendumDetails[5]}`);
                const endBlock   = Number(`${referendumDetails[6]}`);
                const currentBlock = await tronWeb.trx.getCurrentBlock();
                const currentBlockNumber = Number(`${currentBlock.block_header.raw_data.number}`);
                updateCurrentBlockNumber(currentBlockNumber);
                // const currentBlockTimestamp = Number(`${currentBlock.block_header.raw_data.timestamp}`);
                // console.log(`currentBlock: `,JSON.stringify(currentBlock));
                // console.log(`currentBlock_Number: ${currentBlock.block_header.raw_data.number} currentBlock_Timestamp: ${currentBlock.block_header.raw_data.timestamp}`);
                let progressBarPercent;
                if (currentBlockNumber>=startBlock && currentBlockNumber<=endBlock)
                {
                    const diff = currentBlockNumber - startBlock;
                    progressBarPercent = 100*(diff / (endBlock-startBlock));
                } 
                else if (currentBlockNumber > endBlock) progressBarPercent=100;
                else if (currentBlockNumber < startBlock) progressBarPercent=0;


                let res, titel="A Title", descrpt="A Description";
                const referendumCID = `${referendumDetails[4]}`;
                try {
                    res = JSON.parse(await retrieveContentfromIPFS( referendumCID ));
                    titel = res.title;
                    descrpt = res.description;
                } catch (e) 
                {
                    console.log(`Error in retireving IPFS data`);
                }

                const treasurerName  = await tronGovernanceSC.treasurerName( tronWeb.address.fromHex(referendumDetails[2]) ).call();

                
                activereferendarray.push({
                    referendum_Index      : `${referendumDetails[0]}`,
                    referendum_Beneficiary: `${tronWeb.address.fromHex(referendumDetails[1])}`,
                    referendum_Treasury   : `${tronWeb.address.fromHex(referendumDetails[2])}`,
                    referendum_Amount     : tronWeb.fromSun(refAmountSun),
                    referendum_CID        : referendumCID,
                    referendum_startBlock : startBlock,
                    referendum_endBlock   : endBlock,
                    referendum_scoreBlock : `${referendumDetails[7]}`,
                    referendum_Ayes       : `${tronWeb.fromSun(referendumDetails[8])}`,
                    referendum_Nays       : `${tronWeb.fromSun(referendumDetails[9])}`,
                    referendum_Turnout    : `${referendumDetails[10]}`,
                    referendum_Passed     : Number(`${referendumDetails[8]}`) > Number(`${referendumDetails[9]}`)? "Passing" : "Not Passing",
                    referendum_TagColor   : tagColor,
                    referendum_TagText    : tagText,
                    referendum_ProgressBarPercent : progressBarPercent,
                    referendum_Title          : titel,
                    referendum_Description    : descrpt,
                    referendum_TreasurerName : treasurerName

                })
                    
            }

            //   console.log(`activereferendarray: `,activereferendarray);
            setReferendaArray(activereferendarray);
        }
    }
    //#endregion

    useEffect(() => {
        if (tronGovernanceSC && band3 && band2) 
        {
            console.log(`ReferendaScreen refreshCounter: ${refreshCounter} tronGovernanceSC band3 and band2 are set. Calling getActiveRefrenda`);
            getActiveRefrenda();
        }
    },[tronGovernanceSC,band3,band2, refreshCounter]);


    return (
        <View>
         {
            referendaArray.length===0 ?
            <Text style={styles.textStyle}>Loading Active Referenda </Text> :
            <FlatList 
                    keyExtractor={(item) => item.referendum_Index}
                    data={referendaArray} 
                    renderItem={({item, index}) => {
                        return  (
                        <TouchableOpacity  onPress={() => navigation.navigate("Referendum", { 
                            refIndex: item.referendum_Index, 
                            refBeneficiary: item.referendum_Beneficiary,
                            refTreasury: item.referendum_Treasury,
                            refAmount: item.referendum_Amount,
                            refCID: item.referendum_CID,
                            refStartBlock: item.referendum_startBlock,
                            refEndBlock: item.referendum_endBlock,
                            refScoreBlock: item.referendum_scoreBlock,
                            refAyes: item.referendum_Ayes,
                            refNays: item.referendum_Nays,
                            refTrunout: item.referendum_Turnout,
                            refPassed: item.referendum_Passed,
                            refTitle : item.referendum_Title,
                            description      : item.referendum_Description,
                            refTag : item.referendum_TagColor,
                            refTagText : item.referendum_TagText,
                            refTreasurerName: item.referendum_TreasurerName
                        }
                        )} >

                        <View style={[styles.contain, style, { backgroundColor: colors.card }]}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", fontWeight:"bold" }}>
                                    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                                        <Text style={{fontWeight:"bold"}} title3 numberOfLines={1}>
                                            {`Referendum:${item.referendum_Index}`}
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
                                        alignItems:"center",
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
                                            backgroundColor: `${item.referendum_TagColor}`,
                                            paddingHorizontal: 10,
                                            marginRight: 10,
                                            minWidth: 80,
                                        }}
                                    >
                                        {`${item.referendum_TagText}`}
                                    </Tag>
                                    <View style={{flexDirection:"column", fontWeight:"bold"}}>
                                         <View>
                                            <Text style={{fontWeight:"bold"}}>
                                                {` Treasury Name: ${item.referendum_TreasurerName}`}   
                                            </Text>
                                        </View>
                                        <View> 
                                            <Text style={{fontWeight:"bold"}}>
                                                {` Requested: ${item.referendum_Amount}`}
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                           
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, }} >
                                    <Text caption2 light>
                                        {item.referendum_Title}
                                    </Text>
                                </View>
                          
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 0, paddingBottom: 0, justifyContent: "space-between", }} >
                                    <Text overline style={{fontSize: 14, fontWeight:'bold', color:"blue" }}>
                                        {("Vote Progress")} {`AYES: ${item.referendum_Ayes} NAYS: ${item.referendum_Nays} TURNOUT: ${item.referendum_Turnout}`}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 0, paddingBottom: 5, justifyContent: "space-between", }} >
                                    <Text overline style={{fontSize: 14, fontWeight:'bold', color:"blue" }}>
                                        {`State:${item.referendum_Passed}`}
                                    </Text>
                                </View>

                                <ProgressBar style={{ flex: 1, paddingRight: 20 }} color={BaseColor.accentColor} percent={`${item.referendum_ProgressBarPercent}`} />
                            </View>
                        </View>
                       </TouchableOpacity>
                        )
                    }}
            /> 
        }
                  
        </View>
    );
};

ReferendaScreen.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOption: PropTypes.func,
};

export default ReferendaScreen;