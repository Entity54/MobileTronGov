import React, { useEffect, useState, useContext } from "react";
import { ScrollView, TouchableOpacity, View, Button, Header, Text, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { default as ProductSpecGrid } from "@components/Icon";
import { default as CardReport04 } from "@components/Report04";
import { EFilterColors, EFilterSizes } from "@data";
import { ProductSize } from "@components";
import { default as CardReport05 } from "@components/Report05";
import { useTranslation } from "react-i18next";
import Tag from "../../components/Tag";
import { BaseColor } from "../../config/theme";
import { BaseStyle } from "../../config/styles";
import { Images } from "../../config/images";
import styles from "./styles";

import GovContext from '../../context/GovContext';

import Icon from "../../components/Icon";

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




const ReferendumView = ({navigation, style}) => {

    const { t } = useTranslation();
    const [eSizes, setESizes] = useState(EFilterSizes);
    const [sizeChoosed, setSizeChoosed] = useState(EFilterSizes[0]);
    const [refIndex, setRefIndex] = useState("");
    const [refTitle, setRefTitle] = useState("");
    const [refBody, setRefBody] = useState("");
    const [refAye, setRefAye] = useState("");
    const [refNay, setRefNay] = useState("");
    const [refBeneficiary, setRefBeneficiary] = useState("");
    const [refTreasury, setRefTreasury] = useState("");
    const [refAmount, setRefAmount] = useState("");
    const [refCID, setRefCID] = useState("");
    const [refStartBlock, setRefStartBlock] = useState("");
    const [refEndBlock, setRefEndBlock] = useState("");
    const [refScoreBlock, setRefScoreBlock] = useState("");
    const [refTurnout, setRefTurnout] = useState("");
    const [refPassed, setRefPassed] = useState("");
    const [percentOne, setPercentOne] = useState("80");
    const [percentTwo, setPercentTwo] = useState("20");
    const [percent, setPercent] = useState("80");
    const [voteTokens, setVoteTokens] = useState("");
    const [conviction, setConviction] = useState("");
    const [refTag, setRefTag] = useState("");
    const [refTagText, setRefTagText] = useState("");



    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter  } = useContext(GovContext);

    
    const setTheConviction = (convictionValue) => {
        setConviction(convictionValue.name);
        setSizeChoosed(convictionValue);
    }
    
    const voteReferendum = async (refIndex, isAye, amount, convictionNum = 0 ) => {
        if (tronGovernanceSC && tronWeb)
        {
            const amountSUN =  tronWeb.toSun(amount);  
            console.log(`voteReferendum=> amountSUN: ${amountSUN}`);
            let result = await tronGovernanceSC.voteReferendum(refIndex, isAye, convictionNum).send({
                feeLimit:100000000,
                callValue: amountSUN,
                shouldPollResponse:true
            });
            console.log(`voteReferendum=> result: `,JSON.stringify(result));
        }
        else console.log(`****** voteReferendum is run but tronGovernanceSC does not exist *******`);
    }

    useEffect(() => {
        const passedParamsObject = navigation.getState().routes[1].params;
        if(passedParamsObject)
        {
            setRefIndex(passedParamsObject.refIndex);
            setRefTitle(passedParamsObject.refTitle);
            setRefBody(passedParamsObject.description);
            setRefTag(passedParamsObject.refTag);
            setRefTagText(passedParamsObject.refTagText);

            setRefBeneficiary(passedParamsObject.refBeneficiary);
            setRefTreasury(passedParamsObject.refTreasury);
            setRefAmount(passedParamsObject.refAmount);
            setRefCID(passedParamsObject.refCID);
            setRefStartBlock(passedParamsObject.refStartBlock);
            setRefEndBlock(passedParamsObject.refEndBlock);
            setRefScoreBlock(passedParamsObject.refScoreBlock);
            setRefAye(Number(passedParamsObject.refAyes));
            setRefNay(Number(passedParamsObject.refNays));

            setRefTurnout(passedParamsObject.refTrunout);
            setRefPassed(passedParamsObject.refPassed);

            const total = Number(passedParamsObject.refAyes) + Number(passedParamsObject.refNays);
            if (total===0) {
                setPercentOne("0%");   setPercentTwo("0%"); setPercent("0"); 
            }
            else {
                const ayePercent = 100 * Number(passedParamsObject.refAyes) / total;
                setPercentOne(`${ayePercent}%`);   
                setPercentTwo(`${100-ayePercent}%`);   
                setPercent(`${ayePercent}`); 
            }
            
        }
    }, [navigation]);


    return (
        <SafeAreaView  style={[BaseStyle.safeAreaView, { flex: 1 }]}  edges={["right", "top", "left"]} >

            <ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
               
               
                <View style={[styles.contain2, style, { backgroundColor: colors.card }]}>
                    <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", fontWeight:"bold" }}>
                                    <TouchableOpacity onPress={"onPress"} style={{ flex: 1 }}>
                                        <Text style={{fontWeight:"bold"}} title3 numberOfLines={1}>
                                            {`Referendum:${refIndex}`}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        hitSlop={{ top: 10, right: 10, top: 10, left: 10 }}
                                        style={{ paddingLeft: 16 }}
                                        onPress={"onOption"}
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
                                            backgroundColor: `${refTag}`,
                                            paddingHorizontal: 10,
                                            marginRight: 10,
                                            minWidth: 80,
                                        }}
                                    >
                                        {refTagText}
                                    </Tag>
                                    <Text style={{fontWeight:"bold"}}>
                                        {`Amount Requested: ${refAmount}`}
                                    </Text>

                                </View>
                           
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, }} >
                                    <Text caption2 light>
                                        {refTitle}
                                    </Text>
                                </View>
                          
                                {/* <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 0, paddingBottom: 5, justifyContent: "space-between", }} >
                                    <Text overline style={{fontSize: 14, fontWeight:'bold', color:"blue" }}>
                                        {("Vote Progress")} {`AYES: ${item.referendum_Ayes} NAYS: ${item.referendum_Nays} TURNOUT: ${item.referendum_Turnout} State:${item.referendum_Passed}`}
                                    </Text>
                                </View>
                                <ProgressBar style={{ flex: 1, paddingRight: 20 }} color={BaseColor.accentColor} percent={`${item.referendum_ProgressBarPercent}`} />
                                 */}




                                <View>
                                    {/* <Text title3>{refTitle}</Text> */}
                                    <Text body2 light style={{ paddingVertical: 10 }}>
                                        {refBody}
                                    </Text>
                                    <View style={styles.specifications}>
                                        <ProductSpecGrid style={{ flex: 1 }} title={"0xFaCf…B63d8e"} description={"Creator"} />
                                        <ProductSpecGrid style={{ flex: 1 }} title={"0x7369…000000"} description={"Owner"} />
                                    </View>
                                    <View style={styles.specifications}>
                                        <ProductSpecGrid
                                            style={{ flex: 1 }} title={"129"} description={"Referenda #"}
                                        />
                                        <ProductSpecGrid style={{ flex: 1 }}
                                            title={
                                                <Tag  light  style={{ backgroundColor: BaseColor.grayColor,  borderRadius: 5, paddingHorizontal: 5, }} textStyle={{ color: BaseColor.whiteColor }} >
                                                    On Going
                                                </Tag>
                                            }
                                            description={"status"}
                                        />
                                    </View>
                                </View>

                                <Text headline style={{ paddingTop: 20,  paddingBottom: 5, marginTop: -50 }} >
                                    {`Beneficiary: ${refBeneficiary}`}
                                </Text>
                                <Text>
                                    {`Treasury: ${refTreasury}`}
                                </Text>

                    </View>
                </View>







               {/* OLD PREVOUS PUSH */}
                {/* <View>
                    <Text title3>{refTitle}</Text>
                    <Text body2 light style={{ paddingVertical: 10 }}>
                        {refBody}
                    </Text>
                    <View style={styles.specifications}>
                        <ProductSpecGrid style={{ flex: 1 }} title={"0xFaCf…B63d8e"} description={"Creator"} />
                        <ProductSpecGrid style={{ flex: 1 }} title={"0x7369…000000"} description={"Owner"} />
                    </View>
                    <View style={styles.specifications}>
                        <ProductSpecGrid
                            style={{ flex: 1 }} title={"129"} description={"Referenda #"}
                        />
                        <ProductSpecGrid style={{ flex: 1 }}
                            title={
                                <Tag  light  style={{ backgroundColor: BaseColor.grayColor,  borderRadius: 5, paddingHorizontal: 5, }} textStyle={{ color: BaseColor.whiteColor }} >
                                    On Going
                                </Tag>
                            }
                            description={"status"}
                        />
                    </View>
                </View>

                <Text headline style={{ paddingTop: 20,  paddingBottom: 5, marginTop: -50 }} >
                    {`Beneficiary: ${refBeneficiary}`}
                </Text>
                <Text>
                    {`Treasury: ${refTreasury}`}
                </Text> */}


                <View style={{ flexDirection: "row", marginTop: 0}}>
                    <View style={{ flex: 1, paddingRight: 7, marginTop:10 }}>
                        <CardReport05 style={{ marginTop: 7}} title="Finish Countdown" price={`${currentBlockNumber? refEndBlock - currentBlockNumber : refEndBlock}`} onPress={() => navigation.navigate("FCryptol02")}/>
                        <CardReport05 style={{ marginTop: 10}} title="Scoring Countdown" price={`${currentBlockNumber? refScoreBlock - currentBlockNumber : refScoreBlock}`} onPress={() => navigation.navigate("FCryptol02")} />
                        <CardReport05 style={{ marginTop: 10}} title = "Turnout" price ={refTurnout} onPress={() => navigation.navigate("FCryptol02")}/>
                    </View>
                    <View style={{ flex: 1, paddingLeft: 7 }}>
                        <CardReport04 contentStyle={{ paddingBottom: 15, marginBottom: 7, marginTop: 7 }}
                            title="Status" 
                            title2="AYE Dominance" 
                            price="412" 
                            aye="AYE - "
                            nay="NAY - " 
                            ayeamount= {`${refAye} TRX`} 
                            nayamount=  {`${refNay} TRX`}
                            percent1= {`${(refAye + refNay)>0?(refAye / (refAye + refNay))*100:0}`} 
                            percent2= {`${(refAye + refNay)>0?(refNay / (refAye + refNay))*100:0}`} 
                            percent= {`${(refAye + refNay)>0?(refAye / (refAye + refNay))*100:0}`}
                        />
                    </View>
                </View>

                <View style={styles.contain}>
                    <View>
                        <View style={{ flexDirection: "row", marginBottom: 8, marginTop: 0, marginLeft:39}}>
                            <Text body1>{t("Conviction").toUpperCase()}</Text>
                            <Text
                                headline
                                style={{
                                }}
                            >
                                {` ${sizeChoosed.name}`.toUpperCase()}
                            </Text>
                        </View>
                        <View>
                            <ProductSize
                                sizeChoosed={sizeChoosed}
                                sizes={eSizes}
                                onPress={(size) => setTheConviction(size)}
                            />
                        </View>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(newValue) => setVoteTokens(newValue)}
                            autoCorrect={false}
                            placeholder={t("Number Of TRX")}
                            placeholderTextColor={BaseColor.grayColor}
                            value={voteTokens}
                            selectionColor={colors.primary}
                        />
                    </View>
                </View>
                <View style={styles.contain}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => voteReferendum(refIndex, true, voteTokens, conviction) } >
                        <Text style={styles.buttonText}>VOTE AYE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => voteReferendum(refIndex, false, voteTokens, conviction ) }>    
                        <Text style={styles.buttonText}>VOTE NAY</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};



const newStyles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 0,
        height: 50,
        borderRadius: 5,
        marginHorizontal: 35,
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center' 
    },

    votingbackgroundStyle: {
        marginTop: 10,
        height: 50,
        borderRadius: 5,
        marginHorizontal: 35,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',     

    },
    voteButtonStyleAye: {
        borderColor: '#087CBA',
        borderWidth: 2,
        margin: 15,
        padding: 15,
        flex: 0,    
        fontSize: 15,   
        backgroundColor: '#ffffff',
        width: 150,
        height: 50,
        borderRadius: 15,
        alignSelf: 'auto',    
        justifyContent: 'center' ,

    },
    voteButtonStyleNay: {
        borderColor: '#087CBA',
        borderWidth: 2,
        margin: 15,
        padding: 15,
        flex: 0,    
        fontSize: 15,   
        backgroundColor: '#ffffff',
        width: 150,
        height: 50,
        borderRadius: 15,
        alignSelf: 'auto',     
        justifyContent: 'center' ,
    },
    inputStyle: {
        borderColor: '#087CBA',
        borderWidth: 2,
        margin: 15,
        padding: 15,
        flex: 0,    
        fontSize: 15,  
        backgroundColor: '#ffffff',
        width: 150,
        height: 50,
        borderRadius: 15,
        alignSelf: 'auto',    
        justifyContent: 'center' ,

    },

});



export default ReferendumView;