import { SafeAreaView } from "react-native-safe-area-context";
// import { default as ProductSpecGrid } from "../../components/Icon";
import { default as ProductSpecGrid } from "@components/Icon";
// import { default as CardReport03 } from "../../components/Report03";
// import { default as CardReport04 } from "../../components/Report04";
import { default as CardReport04 } from "@components/Report04";

// import { default as CardReport05 } from "../../components/Report05";
import { default as CardReport05 } from "@components/Report05";

// import Icon from "../../components/Icon";
import Tag from "../../components/Tag";
import { BaseColor } from "../../config/theme";
import { BaseStyle } from "../../config/styles";
import { Images } from "../../config/images";
import styles from "./styles";

import React, { useEffect, useState, useContext } from "react";
import { ScrollView, TouchableOpacity, View, Button, Header, Text, TextInput, StyleSheet } from "react-native";

// import { ethers } from 'ethers';  
// import WalletConnectExperience from "../../../WalletConnectExperience";
import GovContext from '../../context/GovContext';


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

//#region PProject array
// const PProject = [
//     {
//         id: 2,
//         title: "assetManager.registerLocalAsset",
//         description:
//             "Register a new local asset No information is stored in this pallet about the local asset The reason is that we dont need to hold a mapping between the multilocation and the local asset, as this conversion is deterministic Further, we dont allow xcm fee payment in local assets ",
//         tasks: 105,
//         tickets: 100,
//         completedTickets: 90,
//         comments: 200,
//         status: "Moonbase",
//         statusName: "Moonbase",
//         members: [
//             {
//                 id: 1,
//                 name: "Stevie Grarrett",
//                 total: "@steave.grarrent",
//                 image: Images.avata1,
//             },
//             {
//                 id: 2,
//                 name: "Kondo leyasu",
//                 total: "@kondo.leyasu",
//                 image: Images.avata2,
//             },
//             {
//                 id: 3,
//                 name: "Quinten Kortum",
//                 total: "@quinten.kortum",
//                 image: Images.avata3,
//             },
//             {
//                 id: 4,
//                 name: "Monica Ribeiro",
//                 total: "@monica.ribeiro",
//                 image: Images.avata4,
//             },
//             {
//                 id: 5,
//                 name: "Steve Kute",
//                 total: "@steve.kute",
//                 image: Images.profile1,
//             }
//         ],
//     },
//     {
//         id: 1,
//         title: "assetManager.registerLocalAsset",
//         description:
//             "Register a new local asset No information is stored in this pallet about the local asset The reason is that we dont need to hold a mapping between the multilocation and the local asset, as this conversion is deterministic Further, we dont allow xcm fee payment in local assets",
//         tasks: 102,
//         tickets: 124,
//         completedTickets: 98,
//         comments: 300,
//         status: "Moonriver",
//         statusName: "Moonriver",
//         members: [
//             {
//                 id: 4,
//                 name: "Monica Ribeiro",
//                 total: "@monica.ribeiro",
//                 image: Images.avata4,
//             },
//             {
//                 id: 5,
//                 name: "Steve Kute",
//                 total: "@steve.kute",
//                 image: Images.profile1,
//             },
//             {
//                 id: 6,
//                 name: "Lakshmana Dongerkerry",
//                 total: "@lakshmana.dongerkerry",
//                 image: Images.profile2,
//             },
//             {
//                 id: 1,
//                 name: "Steve Grarrett",
//                 total: "@steave.grarrent",
//                 image: Images.avata1,
//             },
//             {
//                 id: 2,
//                 name: "Kondo leyasu",
//                 total: "@kondo.leyasu",
//                 image: Images.avata2,
//             },
//             {
//                 id: 3,
//                 name: "Quinten Kortum",
//                 total: "@quinten.kortum",
//                 image: Images.avata3,
//             },
//         ],
//     },
//     {
//         id: 3,
//         title: "system.remark",
//         description: "Make some on-chain remark.",
//         tasks: 102,
//         tickets: 100,
//         completedTickets: 100,
//         comments: 300,
//         status: "Moonbase",
//         statusName: "Moonbase",
//         members: [
//             {
//                 id: 6,
//                 name: "Lakshmana Dongerkerry",
//                 total: "@lakshmana.dongerkerry",
//                 image: Images.profile2,
//             },
//             {
//                 id: 7,
//                 name: "Chioke Okonkwo",
//                 total: "@chioke.okonkwo",
//                 image: Images.profile3,
//             },
//             {
//                 id: 8,
//                 name: "Lacara Jones",
//                 total: "@lacara.jones",
//                 image: Images.profile4,
//             },
//             {
//                 id: 1,
//                 name: "Steve Grarrett",
//                 total: "@steave.grarrent",
//                 image: Images.avata1,
//             },
//             {
//                 id: 2,
//                 name: "Kondo leyasu",
//                 total: "@kondo.leyasu",
//                 image: Images.avata2,
//             },
//         ],
//     },
//     {
//         id: 4,
//         title: "system.remark",
//         description:
//             "Make some on-chain remark.",
//         tasks: 50,
//         tickets: 90,
//         completedTickets: 40,
//         comments: 200,
//         status: "Moonbase",
//         statusName: "Moonbase",
//         members: [
//             {
//                 id: 8,
//                 name: "Lacara Jones",
//                 total: "@lacara.jones",
//                 image: Images.profile4,
//             },
//             {
//                 id: 1,
//                 name: "Steve Grarrett",
//                 total: "@steave.grarrent",
//                 image: Images.avata1,
//             },
//             {
//                 id: 6,
//                 name: "Lakshmana Dongerkerry",
//                 total: "@lakshmana.dongerkerry",
//                 image: Images.profile2,
//             },
//             {
//                 id: 7,
//                 name: "Chioke Okonkwo",
//                 total: "@chioke.okonkwo",
//                 image: Images.profile3,
//             },
//             {
//                 id: 2,
//                 name: "Kondo leyasu",
//                 total: "@kondo.leyasu",
//                 image: Images.avata2,
//             },
//         ],
//     },
// ];
//#endregion




const TAGS = [
    { id: "1", icon: "wifi", name: "HTML", checked: true },
    { id: "2", icon: "bath", name: "Bootstrap" },
    { id: "3", icon: "paw", name: "CSS3" },
    { id: "4", icon: "bus", name: "Jquery" },
];

const PProjectView = ({navigation}) => {

    const [refIndex, setRefIndex] = useState("");
    const [refTitle, setRefTitle] = useState("");
    const [refBody, setRefBody] = useState("");
    const [refAye, setRefAye] = useState("80");
    const [refNay, setRefNay] = useState("20");

    const [refBeneficiary, setRefBeneficiary] = useState("");
    const [refTreasury, setRefTreasury] = useState("");
    const [refAmount, setRefAmount] = useState("");
    const [refCID, setRefCID] = useState("");

    const [refStartBlock, setRefStartBlock] = useState("");
    const [refEndBlock, setRefEndBlock] = useState("");
    const [refScoreBlock, setRefScoreBlock] = useState("");

    const [refTurnout, setRefTurnout] = useState("");
    const [refPassed, setRefPassed] = useState("");


    // const [refHash, setRefHash] = useState("");
    const [percentOne, setPercentOne] = useState("80");
    const [percentTwo, setPercentTwo] = useState("20");
    const [percent, setPercent] = useState("80");
    const [voteTokens, setVoteTokens] = useState("");
    const [conviction, setConviction] = useState("");

    // const {wallet, scComs, scGov, updateSignerElements} = useContext(GovContext);
    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter  } = useContext(GovContext);

    const voteReferendum = async (refIndex, isAye, amount, convictionNum = 0 ) => {
        if (tronGovernanceSC && tronWeb)
        {
            const amountSUN =  tronWeb.toSun(amount)  //123456789; //ethers.utils.parseUnits(amount,18);
            console.log(`voteReferendum=> amountSUN: ${amountSUN}`);
            let result = await tronGovernanceSC.voteReferendum(refIndex, isAye, convictionNum).send({
                feeLimit:100000000,
                callValue: amountSUN,
                shouldPollResponse:true
            });
            console.log(`voteReferendum=> result: `,JSON.stringify(result));

        //   const tx = await scGov.voteReferendum(refIndex, isAye, amountWEI, convictionNum) ;
        //   tx.wait().then( async reslveMsg => {
        //     console.log(`tx to voteReferendum a proposal is mined resolveMsg : `,reslveMsg);
        //   });
    
        }
        else console.log(`****** voteReferendum is run but tronGovernanceSC does not exist *******`);
    }

    // const removeVote = async (refIndex) => {
    //     if (scGov)
    //     {
    //       const tx = await scGov.removeVote(refIndex);
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx to removeVote from a referenum is mined resolveMsg : `,reslveMsg);
    //       });
  
    //     }
    //     else console.log(`****** removeVote is run but scGov does not exist *******`);
    // }



    useEffect(() => {
        const passedParamsObject = navigation.getState().routes[1].params;
        if(passedParamsObject)
        {
            setRefIndex(passedParamsObject.refIndex);
            setRefTitle(`Referendum ${passedParamsObject.refIndex}`);
            setRefBody(`${passedParamsObject.description}`);

            setRefBeneficiary(passedParamsObject.refBeneficiary);
            setRefTreasury(passedParamsObject.refTreasury);
            setRefAmount(passedParamsObject.refAmount);
            setRefCID(passedParamsObject.refCID);
            setRefStartBlock(passedParamsObject.refStartBlock);
            setRefEndBlock(passedParamsObject.refEndBlock);
            setRefScoreBlock(passedParamsObject.refScoreBlock);
            setRefAye(passedParamsObject.refAyes);
            setRefNay(passedParamsObject.refNays);

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

            
            // setRefHash(passedParamsObject.refrendumProposalHash);
            // const aye = "112233"; //`${ethers.utils.formatUnits(passedParamsObject.refrendumTallyAye)}`;
            // const nay = "001133"; //`${ethers.utils.formatUnits(passedParamsObject.refrendumTallyNay)}`;
            // setRefAye(aye);
            // setRefNay(nay);
        }
    }, [navigation]);


    // useEffect(() => {
    //     console.log(`refreshCounter for Referendum Screen ${refreshCounter}`);
    //     // getActiveRefrenda();
    // },[refreshCounter])

    return (
        <SafeAreaView  style={[BaseStyle.safeAreaView, { flex: 1 }]}  edges={["right", "top", "left"]} >
         {/* <WalletConnectExperience /> */}

            <ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
                <View>
                    <Text title3>{refTitle}</Text>
                    <Text body2 light style={{ paddingVertical: 10 }}>
                        {refBody}
                    </Text>
                    <View style={styles.specifications}>
                        <ProductSpecGrid style={{ flex: 1 }} title={"0xFaCf…B63d8e"} description={"Creator"} />
                            {/* // description={t("Creator")} */}
                        <ProductSpecGrid style={{ flex: 1 }} title={"0x7369…000000"} description={"Owner"} />
                            {/* // description={t("Owner")} */}
                    </View>
                    <View style={styles.specifications}>
                        <ProductSpecGrid
                            style={{ flex: 1 }} title={"129"} description={"Referenda #"}
                        />
                            {/* // description={t("Referenda #")} */}
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
                    {/* {`refCID: ${refCID}  refBeneficiary: ${refBeneficiary} refTreasury: ${refTreasury} refAmount: ${refAmount}  refStartBlock: ${refStartBlock} refEndBlock: ${refEndBlock} refScoreBlock: ${refScoreBlock} refTurnout: ${refTurnout} refPassed: ${refPassed} REMAINING BLOCKs: ${refEndBlock - currentBlockNumber}`} */}
                    {`Beneficiary: ${refBeneficiary}`}
                </Text>
                <Text>
                    {`Treasury: ${refTreasury}`}
                </Text>

                    {/* {t("Referenda Details")} */}
                <View style={{ flexDirection: "row", marginTop: 0}}>
                    <View style={{ flex: 1, paddingRight: 7 }}>
                        {/* <CardReport03 style={{ marginTop: 7 }}  icon="chart-line" title="Remaining" price="3 Days 45mins" time="Time" blocks="Blocks" percent="21,827" onPress={() => navigation.navigate("FCryptol02")}/> */}
                        {/* <CardReport03 style={{ marginTop: 7 }} icon="chart-line" title="Activate" price="4 Days 1hr" time="Time" blocks="Block" percent="#2,923,500" onPress={() => navigation.navigate("FCryptol02")} /> */}
                        {/* <CardReport05 style={{ marginTop: 7 }} title = "Turnout" price = "2.3%" icon = "user-friends" onPress={() => navigation.navigate("FCryptol02")}/> */}

                        <CardReport05 style={{ marginTop: 7 }} title="Finish Countdown" price={`${currentBlockNumber? refEndBlock - currentBlockNumber : refEndBlock}`} icon = "clock" onPress={() => navigation.navigate("FCryptol02")}/>
                        <CardReport05 style={{ marginTop: 10 }} title="Scoring Countdown" price={`${currentBlockNumber? refScoreBlock - currentBlockNumber : refScoreBlock}`} icon = "clock" onPress={() => navigation.navigate("FCryptol02")} />
                        <CardReport05 style={{ marginTop: 10, paddingBottom: 5, height:"auto" }} title = "Turnout" price ={refTurnout} icon = "user-friends" onPress={() => navigation.navigate("FCryptol02")}/>
                    </View>
                    <View style={{ flex: 1, paddingLeft: 7 }}>
                        {/* <CardReport04 contentStyle={{ paddingBottom: 35, marginBottom: 20, marginTop: 7 }}
                            icon="credit-card" title="Status" title2="Support" price="412" aye="Aye"
                            ayeamount= {`${refAye} TRX`} nayamount=  {`${refNay} TRX`}
                            percent1= "80%" nay="Nay" percent2= "20%" percent= "80"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            onPress={() => navigation.navigate("Dashboard4")}
                        /> */}
                        <CardReport04 contentStyle={{ paddingBottom: 15, marginBottom: 7, marginTop: 7 }}
                            icon="credit-card" title="Status" title2="Aye Dominance" price="412" aye="AYE - "
                            ayeamount= {`${refAye} TRX`} nayamount=  {`${refNay} TRX`}
                            // percent1= "80%" nay="Nay" percent2= "20%" percent= "80"
                            percent1= {`${(refAye + refNay)>0?(refAye / (refAye + refNay))*100 : 0}`} nay="Nay" percent2= {`${(refAye + refNay)>0?(refNay / (refAye + refNay))*100:0}`} percent= {`${(refAye + refNay)>0?(refAye / (refAye + refNay))*100:0}`}
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            // onPress={() => navigation.navigate("Dashboard4")}
                        />
                    </View>
                </View>

                <View style={newStyles.backgroundStyle}>
                    <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Nummber of TRX'  style={newStyles.inputStyle} value={voteTokens} onChangeText={(newValue) => setVoteTokens(newValue)} />
                    <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Conviction (0 to 3)'  style={newStyles.inputStyle} value={conviction} onChangeText={(newValue) => setConviction(newValue)} />
                </View>



                <View style={newStyles.votingbackgroundStyle}>
                    <Button style={newStyles.voteButtonStyleAye}     title="Vote Aye" onPress={() => voteReferendum(refIndex, true, voteTokens, conviction) } />
                    {/* <Button style={newStyles.voteButtonStyleUnvote}  title="Unvote"   onPress={() => removeVote(refIndex) } /> */}
                    <Button style={newStyles.voteButtonStyleNay}     title="Vote Nay" onPress={() => voteReferendum(refIndex, false, voteTokens, conviction ) } />


                    {/* <Button
                        title="VOTE"
                        style={{ backgroundColor: colors.primaryLight }}
                        onPress={() => {
                        navigation.goBack();
                        }}
                    >
                        {"VOTE1"}

                    </Button>
                         */}
                </View>

                <View style={{ flex: 1, paddingLeft: 7,  marginTop: 7 }}>
                </View>

                {/* <View style={{ flex: 1, paddingLeft: 7 }}>
                    <Button
                        title="UNVOTE"
                        style={{ marginTop: 7 }}
                        onPress={() => {
                        navigation.goBack();
                        }}
                    >
                        {"UNVOTE1"}

                    </Button>
                       
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};



const newStyles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 0,
        // backgroundColor: ,
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
        fontSize: 15,  //default is 14
        backgroundColor: '#ffffff',
        width: 150,
        height: 50,
        borderRadius: 15,
        alignSelf: 'auto',    //center the element
        justifyContent: 'center' ,

    },
    voteButtonStyleNay: {
        borderColor: '#087CBA',
        borderWidth: 2,
        margin: 15,
        padding: 15,
        flex: 0,    
        fontSize: 15,  //default is 14
        backgroundColor: '#ffffff',
        width: 150,
        height: 50,
        borderRadius: 15,
        alignSelf: 'auto',    //center the element
        justifyContent: 'center' ,
    },
    // voteButtonStyleUnvote: {
    //     borderColor: '#087CBA',
    //     borderWidth: 7,
    //     // flex: 1,     
    //     fontSize: 15,  //default is 14
    //     backgroundColor: '#D3E5DD',
    //     width: 85,
    //     alignSelf: 'center',    //center the element
    //     justifyContent: 'center' ,
    // // justifyContent: 'space-between'
    // // alignItems: 'center'

    // },
    
    inputStyle: {
        borderColor: '#087CBA',
        borderWidth: 2,
        margin: 15,
        padding: 15,
        flex: 0,    
        fontSize: 15,  //default is 14
        backgroundColor: '#ffffff',
        width: 150,
        height: 50,
        borderRadius: 15,
        alignSelf: 'auto',    //center the element
        justifyContent: 'center' ,

    },

});

// const newStyles = StyleSheet.create({
//     backgroundStyle: {
//         marginTop: 10,
//         // backgroundColor: '#93D9FF',
//         height: 50,
//         borderRadius: 5,
//         marginHorizontal: 15,
//         flexDirection: 'row',
//         marginBottom: 10,
//         justifyContent: 'center' 

//     },
//     votingbackgroundStyle: {
//         marginTop: 10,
//         // backgroundColor: '#93D9FF',
//         height: 60,
//         borderRadius: 5,
//         marginHorizontal: 15,
//         flexDirection: 'row',
//         marginBottom: 10,
//         flex: 1,     
        
//         // justifyContent: 'center' ,
//     justifyContent: 'space-between'
        

//     },
//     voteButtonStyleAye: {
//         borderColor: '#087CBA',
//         borderWidth: 2,
//         // flex: 1,     
//         fontSize: 15,  //default is 14
//         backgroundColor: '#D3E5DD',
//         width: 85,
//         alignSelf: 'center',    //center the element
//         justifyContent: 'center' ,
//     // justifyContent: 'space-between'
//     // alignItems: 'center'

//     },
//     voteButtonStyleNay: {
//         borderColor: '#087CBA',
//         borderWidth: 2,
//         // flex: 1,     
//         fontSize: 15,  //default is 14
//         backgroundColor: '#EA6C09',
//         width: 85,
//         alignSelf: 'center',    //center the element
//         justifyContent: 'center' ,
//         backgroundColor: '#93D9FF',

//     // justifyContent: 'space-between'
//     // alignItems: 'center'

//     },
//     voteButtonStyleUnvote: {
//         borderColor: '#087CBA',
//         borderWidth: 7,
//         // flex: 1,     
//         fontSize: 15,  //default is 14
//         backgroundColor: '#D3E5DD',
//         width: 85,
//         alignSelf: 'center',    //center the element
//         justifyContent: 'center' ,
//     // justifyContent: 'space-between'
//     // alignItems: 'center'

//     },
    
//     inputStyle: {
//         borderColor: '#087CBA',
//         borderWidth: 2,
//         flex: 1,    
//         fontSize: 15,  //default is 14
//         backgroundColor: '#D3E5DD',
//         width: 55,
//         alignSelf: 'center',    //center the element
//         justifyContent: 'center' ,

//     },

// })

export default PProjectView;
