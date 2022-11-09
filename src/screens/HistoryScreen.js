import React, { useMemo, useEffect, useContext, useState, Children } from "react";
import { Text, FlatList, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';
import GovContext from '../context/GovContext';

import Icon from "../components/Icon";
import ProgressBar from "../components/Progress/Bar";
import Tag from "../components/Tag";
import { BaseColor } from "../config/theme";
import PropTypes from "prop-types";


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



const HistoryScreen = ({ 
    // navigation,
    style,
    onPress,
    // title = "assetManage This is a Test",
    // description =
    // `Some sort of description for the referendum Some sort of description for the referendum Some sort of description for the referendum`,
    onOption,
    // members = ["alpha","beta"],
    // limit = 3,
    // tasks = 100,
    // comments = 0,
    // tickets = 0,
    // completedTickets = 0,
    // status = "Moonbase",
}) => {

    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter, retrieveContentfromIPFS, pinJSONToIPFS  } = useContext(GovContext);
    const [expiredReferendaArray, setExpiredReferendaArray]  = useState([]);


    //#region getExpiredRefrenda
    const getExpiredRefrenda = async () => {
        console.log("Referenda Screen Getting ready to retrieve Expired refrenda");

        if (tronGovernanceSC && band3 && band2 ) {
            const prepearedReferendaIDarrayUint  = await tronGovernanceSC.getExpiredReferenda().call();
            const expiredReferendaIDarray = prepearedReferendaIDarrayUint.map(itm => `${itm}`);
            console.log(`expiredReferendaIDarray: `,expiredReferendaIDarray);
            let expiredreferendarray=[];

            for (let i=0; i<expiredReferendaIDarray.length; i++)
            {
                const refID = expiredReferendaIDarray[i];
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

                
                expiredreferendarray.push({
                    referendum_Index      : `${referendumDetails[0]}`,
                    referendum_Beneficiary: `${referendumDetails[1]}`,
                    referendum_Treasury   : `${referendumDetails[2]}`,
                    referendum_Amount     : refAmountSun,
                    referendum_CID        : referendumCID,
                    referendum_startBlock : startBlock,
                    referendum_endBlock   : endBlock,
                    referendum_scoreBlock : `${referendumDetails[7]}`,
                    referendum_Ayes       : `${tronWeb.fromSun(referendumDetails[8])}`,
                    referendum_Nays       : `${tronWeb.fromSun(referendumDetails[9])}`,
                    referendum_Turnout    : `${referendumDetails[10]}`,
                    referendum_Passed     : Number(`${referendumDetails[8]}`) > Number(`${referendumDetails[9]}`)? "Passed" : "Not Passed",
                    referendum_TagColor   : tagColor,
                    referendum_TagText    : tagText,
                    referendum_ProgressBarPercent : progressBarPercent,
                    referendum_Title          : titel,
                    referendum_Description    : descrpt,
                })

          }

          console.log(`expiredreferendarray: `,expiredreferendarray);
          setExpiredReferendaArray(expiredreferendarray);
        }

    }
    //#endregion


    useEffect(() => {
        if (tronGovernanceSC && band3 && band2) 
        {
            console.log(`HistoryScreen tronGovernanceSC ban3 and band2 are set. Calling getExpiredRefrenda`);
            getExpiredRefrenda();
        }
    },[tronGovernanceSC,band3,band2]);


    return (
        <>
        <View>
         {
            expiredReferendaArray.length===0 ?
            <Text style={styles.textStyle}>Loading1000 </Text> :
            <FlatList 
                    keyExtractor={(item) => item.referendum_Index}
                    data={expiredReferendaArray} 
                    renderItem={({item, index}) => {
                        return  (
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
                                        {/* {`${"Funding for promoting Tron ecosystem to the European market"}`} */}
                                        {`Title: ${item.referendum_Title}`}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 0, paddingBottom: 5, justifyContent: "space-between", }} >
                                    <Text overline style={{fontSize: 14, fontWeight:'bold', color:"blue" }}>
                                        {("Vote Progress")} {`AYES: ${item.referendum_Ayes} NAYS: ${item.referendum_Nays} TURNOUT: ${item.referendum_Turnout} State:${item.referendum_Passed}`}
                                    </Text>
                                </View>
                                <ProgressBar style={{ flex: 1, paddingRight: 20 }} color={BaseColor.accentColor} percent={`${item.referendum_ProgressBarPercent}`} />
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

HistoryScreen.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOption: PropTypes.func,
};



const styles = StyleSheet.create({
  contain: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default HistoryScreen;