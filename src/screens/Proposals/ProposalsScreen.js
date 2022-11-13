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

const ProposalsScreen = ({ navigation, style, }) => {

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

                let res, titel="A Title", descrpt="A Description";
                const referendumCID = `${referendumDetails[4]}`;
                    try {
                        res = JSON.parse(await retrieveContentfromIPFS( referendumCID ));
                        // console.log(`PROPOSAL SCREEN res: `,res);
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
                        referendum_Passed     : "Not Started Yet", 
                        referendum_TagColor   : tagColor,
                        referendum_TagText    : tagText,
                        referendum_ProgressBarPercent : 0, 
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
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate("Create New Referendum")}
            >
                <Text style={styles.buttonText}>Create Referendum</Text>
            </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >

        <View>
         {
            preparedReferendaArray.length===0 ?
            <Text style={styles.textStyle}>Loading Prepared Referenda </Text> :
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
                                            marginRight:10,
                                            minWidth: 80,
                                        }}
                                    >
                                        {`${item.referendum_TagText}`}
                                    </Tag>
                                    <View style={{flexDirection:"column", fontWeight:"bold"}}>
                                         <View>
                                            <Text style={{fontWeight:"bold"}}>
                                                {` Treasury Name: ${"item.treasury_Name"}`}  
                                            </Text>
                                        </View>
                                        <View> 
                                            <Text style={{fontWeight:"bold"}}>
                                                {` Amount Requested: ${item.referendum_Amount}`}
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                             
                                <View style={{ flexDirection: "row"}}>
                                    <View style={{ flex: 1}}>
                                        <CardReport05 style={{ marginTop: 10}} 
                                            title = {item.referendum_Title} 
                                            price = {item.referendum_Description}
                                        />

                                        <CardReport05 style={{ marginTop: 7}}  
                                            title="Beneficiary Address" 
                                            price={`${item.referendum_Beneficiary}`} />
                                        <CardReport05 style={{ marginTop: 7}}  
                                            title="Treasury Address" 
                                            price={`${item.referendum_Treasury}`} />
                                        <CardReport05 style={{ marginTop: 7}} 
                                            title="Starting Block" 
                                            // price={`${item.referendum_Amount}`} 
                                            price={`${item.referendum_startBlock}`} />
                                    </View>
                                </View>

                            </View>
                        </View>

                        )
                    }}
            /> 
        }
                  
        </View>
        </ScrollView>

        </>
    );
};

ProposalsScreen.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOption: PropTypes.func,
};

export default ProposalsScreen;