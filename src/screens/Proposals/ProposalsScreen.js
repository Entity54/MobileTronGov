import React, { useMemo, useEffect, useContext, useState, Children } from "react";
import { Text, FlatList, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';
import GovContext from '../../context/GovContext';

import Icon from "../../components/Icon";
import ProgressBar from "../../components/Progress/Bar";
import Tag from "../../components/Tag";
import { BaseColor } from "../../config/theme";
import PropTypes from "prop-types";
import { default as CardReport03 } from "../../components/Report03";
import { default as CardReport05 } from "../../components/Report05";

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


const ProposalsScreen = ({ navigation,
    style,
    // onPress,
    // onOption,
}) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, retrieveContentfromIPFS, pinJSONToIPFS, refreshCounter } = useContext(GovContext);
    const [preparedReferendaArray, setPreparedReferendaArray]  = useState([]);

    //#region getPreparedRefrenda
    const getPreparedRefrenda = async () => {
        console.log("Referenda Screen Getting ready to retrieve Prepared refrenda");

        if (tronGovernanceSC && band3 && band2 ) {
            const prepearedReferendaIDarrayUint  = await tronGovernanceSC.getPreparedReferenda().call();
            const preparedReferendaIDarray = prepearedReferendaIDarrayUint.map(itm => `${itm}`);
            // console.log(`preparedReferendaIDarray: `,preparedReferendaIDarray);
            let preparedreferendarray=[];

            for (let i=0; i<preparedReferendaIDarray.length; i++)
            {
                const refID = preparedReferendaIDarray[i];
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
                // let progressBarPercent;
                // if (currentBlockNumber>=startBlock && currentBlockNumber<=endBlock)
                // {
                //     const diff = currentBlockNumber - startBlock;
                //     progressBarPercent = 100*(diff / (endBlock-startBlock));
                // } 
                // else if (currentBlockNumber > endBlock) progressBarPercent=100;
                // else if (currentBlockNumber < startBlock) progressBarPercent=0;

                let res, titel="A Title", descrpt="A Description";
                const referendumCID = `${referendumDetails[4]}`;
                    try {
                        res = JSON.parse(await retrieveContentfromIPFS( referendumCID ));
                        // console.log(`|||||>>>> PROPOSAL SCREEN res: `,res);
                        titel = res.title;
                        descrpt = res.description;
                    } catch (e) 
                    {
                        console.log(`Error in retireving IPFS data`);
                    }

                    preparedreferendarray.push({
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
                        referendum_Passed     : "Not Started Yet", //Number(`${referendumDetails[8]}`) > Number(`${referendumDetails[9]}`)? "Passing" : "Not Passing",
                        referendum_TagColor   : tagColor,
                        referendum_TagText    : tagText,
                        referendum_ProgressBarPercent : 0, //progressBarPercent
                        referendum_Title          : titel,
                        referendum_Description    : descrpt,
                    })

          }

        //   console.log(`preparedreferendarray: `,preparedreferendarray);
          setPreparedReferendaArray(preparedreferendarray);
        }

    }
    //#endregion


    useEffect(() => {
        if (tronGovernanceSC && band3 && band2) 
        {
            console.log(`Proposals Screen refreshCounter: ${refreshCounter} tronGovernanceSC band3 and band2 are set. Calling getPreparedRefrenda`);
            getPreparedRefrenda();
        }
    },[tronGovernanceSC,band3,band2, refreshCounter]);


    return (
        <>
        <View>
            <TouchableOpacity style={{backgroundColor:"blue", }} onPress={() => navigation.navigate("Create New Referendum", { 
                            //  refPassed: "item.referendum_Passed",
                            //  description: `Referendum with ID  \nwill end at blockand the scoring block is.`,
                         }
                        )} 
            >
                <Text style={{fontWeight:"bold", backgroundColor:"blue", color:"white", fontSize:18, alignSelf:"center"}} title3 numberOfLines={1}>
                                            {`CREATE NEW PROPOSAL`}
                </Text>

            </TouchableOpacity> 
        </View>

        <View>
         {
            preparedReferendaArray.length===0 ?
            <Text style={styles.textStyle}>Loading1000 </Text> :
            <FlatList 
                    keyExtractor={(item) => item.referendum_Index}
                    data={preparedReferendaArray} 
                    renderItem={({item, index}) => {
                        return  (
                        <View style={[styles.contain, style, { backgroundColor: colors.card }]}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", fontWeight:"bold" }}>
                                    <TouchableOpacity style={{ flex: 1 }}>
                                        <Text style={{fontWeight:"bold"}} title3 numberOfLines={1}>
                                            {`Referendum:${item.referendum_Index}`}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        hitSlop={{ top: 10, right: 10, top: 10, left: 10 }}
                                        style={{ paddingLeft: 16 }}
                                         
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
                                            backgroundColor: `${item.referendum_TagColor}`,
                                            paddingHorizontal: 10,
                                            minWidth: 80,
                                        }}
                                    >
                                        {`${item.referendum_TagText}`}
                                    </Tag>
                                </View>
                             
                               
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, }} >
                                    <Text caption2 light>
                                        {/* {`Title: ${"Promoting Tron ecosystem to the Europe"}`} */}
                                        {`Title: ${item.referendum_Title}`}

                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", marginTop: 0}}>
                                    <View style={{ flex: 1, paddingRight: 7 }}>
                                        <CardReport05 style={{ marginTop: 7 }} title = "Description" 
                                            price = {item.referendum_Description}
//                                                 {`Hello We are askign these funds so we can proote Tron ecosystme in Europe. Organise Conferences with food and live broadcasting \n
// Hello We are askign these funds so we can proote Tron ecosystme in Europe. Organise Conferences with food and live broadcasting `}

                                            icon = "user-friends"
                                        />

                                        <CardReport03 style={{ marginTop: 7 }}  icon="chart-line" title="Beneficiary" price={`${item.referendum_Beneficiary}`} time="Address" blocks="" percent="" />
                                        <CardReport03 style={{ marginTop: 7 }}  icon="chart-line" title="Treasury" price={`${item.referendum_Treasury}`} time="Address" blocks="" percent="" />
                                        <CardReport03 style={{ marginTop: 7 }}  icon="chart-line" title="Specifications" price={`${item.referendum_Amount}`} time="Amount" blocks="Starts at Block" percent={`${item.referendum_startBlock}`} />
                                    </View>
                                </View>


                                {/* <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 0, paddingBottom: 5, justifyContent: "space-between", }} >
                                    <Text overline style={{fontSize: 14, fontWeight:'bold', color:"blue" }}>
                                        {("Vote Progress")} {`AYES: ${item.referendum_Ayes} NAYS: ${item.referendum_Nays} TURNOUT: ${item.referendum_Turnout} State:${item.referendum_Passed}`}
                                    </Text>
                                </View>
                                <ProgressBar style={{ flex: 1, paddingRight: 20 }} color={BaseColor.accentColor} percent={`${item.referendum_ProgressBarPercent}`} />
                                 */}
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

ProposalsScreen.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // onPress: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOption: PropTypes.func,
};

// export default Project01;
export default ProposalsScreen;

