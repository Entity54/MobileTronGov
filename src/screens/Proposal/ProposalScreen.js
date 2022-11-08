// import {
//     // Avatars,
//     // CardReport02,
//     // CardReport03,
//     // CardReport04,
//     // CardReport05,
//     // Button,
//     // Header,
//     // Icon,
//     // PButtonAddUser,
//     // ProductSpecGrid,
//     // SafeAreaView,
//     // Tag,
//     // Text,
// } from "@components";


import React, { useEffect, useState, useContext } from "react";
import { ScrollView, TouchableOpacity, View, Button, Header, Text, TextInput } from "react-native";
import GovContext from '../../context/GovContext';


import { default as ProductSpecGrid } from "../../components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { default as CardReport03 } from "../../components/Report03";
import { default as CardReport04 } from "../../components/Report04";
import { default as CardReport05 } from "../../components/Report05";


import Icon from "../../components/Icon";
import Tag from "../../components/Tag";

// import { BaseColor, BaseStyle, useTheme } from "@config";
import { BaseColor } from "../../config/theme";
import { BaseStyle } from "../../config/styles";
import { Images } from "../../config/images";

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



const ProposalScreen = ({navigation}) => {
    // const { t } = useTranslation();
    // const { colors } = useTheme();
    // const navigation = useNavigation();
    // const route = useRoute();
    // const [members, setMembers] = useState(PProject[0].members);
    // const [item, setItem] = useState(PProject[0]);

    // useEffect(() => {
    //     if (route?.params?.members) {
    //         setMembers(route?.params?.members);
    //     }
    // }, [route?.params?.members]);

    // useEffect(() => {
    //     if (route?.params?.item) {
    //         setItem(route?.params?.item);
    //     }
    // }, [route?.params?.item]);


    const {tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3, updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter } = useContext(GovContext);
    const [treasuryAddress, setTreasuryAddress] = useState("");
    const [requestAmount, setRequestAmount] = useState("");
    const [startInNumBlocks, setStartInNumBlocks] = useState("");
    const [duration, setDuration] = useState("");
    const [scoringInNumBlocks, setScoringInNumBlocks] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cid, setCID] = useState("");


    const createNewReferedum = async () => {
        console.log(`createNewReferedum has been tapped`)
        if (tronGovernanceSC && tronWeb && requestAmount>=100 
            && startInNumBlocks<=20 && duration>=20 && duration<=201600 && scoringInNumBlocks>0 
            && title!=="" && description!="")
        {
          const amountSUN =  tronWeb.toSun(requestAmount);   
          const CID = "Hello IPFS World";
          const referendumFee = tronWeb.toSun(10);   

          let result = await tronGovernanceSC.createNewReferendum(treasuryAddress, amountSUN, CID, startInNumBlocks, duration, scoringInNumBlocks ).send({
            feeLimit:2100000000,
            callValue: referendumFee,
            shouldPollResponse:true
          });
          console.log(` ***** New Refenredum has been submitted with CID: ${CID} and title: ${title} for treasury: ${treasuryAddress} *****`);
         
        } else console.log(`It was not possible to submit a New Referendum`);
    }

    useEffect(() => {
        if (tronGovernanceSC) 
        {
            console.log(`Proposal Screeb tronGovernanceSC is set.`);
        }
    },[tronGovernanceSC]);


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
                    <View style={styles.backgroundStyle}>
                        <Text style={styles.inputStyle} title3 numberOfLines={1}>Title</Text>
                    </View>
                    <View style={styles.backgroundStyle}>
                        <TextInput autoCapitalize='none'autoCorrect={false} placeholder=''  style={styles.inputStyle} value={title} 
                            onChangeText={(newValue) => setTitle(newValue)} 
                        />
                    </View>
                    

                    <View style={styles.backgroundStyle}>
                        <Text style={styles.inputStyle} title3 numberOfLines={1}>Treasury Address</Text>
                    </View>
                    <View style={styles.backgroundStyle}>
                        <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Must be valid Treasury Address'  style={styles.inputStyle} value={treasuryAddress} 
                            onChangeText={(newValue) => setTreasuryAddress(newValue)} 
                        />
                    </View>

                    <View style={styles.backgroundStyle}>
                        <Text style={styles.inputStyle} title3 numberOfLines={1}>Requested Amount</Text>
                    </View>
                    <View style={styles.backgroundStyle}>
                        <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Must be >= 100 TRX'  style={styles.inputStyle} value={requestAmount} 
                            onChangeText={(newValue) => setRequestAmount(newValue)} 
                        />
                    </View>

                    <View style={styles.backgroundStyle}>
                        <Text style={styles.inputStyle} title3 numberOfLines={1}>Start in Number Blocks</Text>
                    </View>
                    <View style={styles.backgroundStyle}>
                        <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Must be <=20'  style={styles.inputStyle} value={startInNumBlocks} 
                            onChangeText={(newValue) => setStartInNumBlocks(newValue)} 
                        />
                    </View>


                    <View style={styles.backgroundStyle}>
                        <Text style={styles.inputStyle} title3 numberOfLines={1}>Referendum duration</Text>
                    </View>
                    <View style={styles.backgroundStyle}>
                        <TextInput autoCapitalize='none'autoCorrect={false} placeholder='>= 20 && <= 201600'  style={styles.inputStyle} value={duration} 
                            onChangeText={(newValue) => setDuration(newValue)} 
                        />
                    </View>

                    <View style={styles.backgroundStyle}>
                        <Text style={styles.inputStyle} title3 numberOfLines={1}>Scoring number of Blocks after expiration</Text>
                    </View>
                    <View style={styles.backgroundStyle}>
                        <TextInput autoCapitalize='none'autoCorrect={false} placeholder='>0'  style={styles.inputStyle} value={scoringInNumBlocks} 
                            onChangeText={(newValue) => setScoringInNumBlocks(newValue)} 
                        />
                    </View>


                    <View style={styles.backgroundStyle}>
                        <Text style={styles.inputStyle} title3 numberOfLines={1}>Description</Text>
                    </View>
                    <View style={styles.descriptionStyle}>
                        <TextInput autoCapitalize='sentences' autoCorrect={true} placeholder="Describe what you are planning to do with the funds if the referednum passes \n. Treasury will score your performance based on actual versus expected performance as described here"
                            style={styles.descriptionInputStyle} value={description} multiline={true}
                            onChangeText={(newValue) => setDescription(newValue)} 
                        />
                    </View>

                    <View>
                        <Button style={styles.specifications}  title="SUBMIT" onPress={() => createNewReferedum() } />
                    </View>
                    <View></View>



                    <View style={styles.specifications}>
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={"0xFaCf…B63d8e"}
                            description={"Creator"}
                            
                        />
                            {/* // description={t("Creator")} */}
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={"0x7369…000000"}
                            description={"Owner"}
                            
                        />
                    </View>
                    {/* <View style={styles.specifications}>
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
                    </View> */}
                </View>

                {/* <Text
                    headline
                    style={{
                        paddingTop: 20,
                        paddingBottom: 5,
                    }}
                >
                    {"Referenda Details"}
                </Text> */}

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
                        {/* <CardReport05
                            style={{ marginTop: 7 }}
                            title = "Turnout"
                            price = "2.3%"
                            icon = "user-friends"
                            onPress={() => navigation.navigate("FCryptol02")}
                        /> */}

                    </View>
                    {/* <View style={{ flex: 1, paddingLeft: 7 }}>
                        <CardReport04
                            contentStyle={{ paddingBottom: 35, marginBottom: 20, marginTop: 7 }}
                            icon="credit-card"
                            title="Status"
                            title2="Support"
                            price="412"
                            aye="Aye"
                            ayeamount="20 DEV"
                            nayamount="5 DEV"
                            percent1="80%"
                            nay="Nay"
                            percent2="20%"
                            percent="80"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            onPress={() => navigation.navigate("Dashboard4")}
                        />
                    </View> */}
                </View>
                {/* <View style={{ flex: 1, paddingLeft: 7 }}>
                    <Button
                        title="VOTE"
                        style={{ backgroundColor: colors.primaryLight }}
                        onPress={() => {
                        navigation.goBack();
                        }}
                    >
                        {"VOTE1"}

                    </Button>
                </View> */}

                <View style={{ flex: 1, paddingLeft: 7,  marginTop: 7 }}>
                </View>
           
            </ScrollView>
        </SafeAreaView>
    );
};



export default ProposalScreen;
