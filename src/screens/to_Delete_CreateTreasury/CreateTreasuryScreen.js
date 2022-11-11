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

// import WalletConnectExperience from "../../../WalletConnectExperience";

import GovContext from '../../context/GovContext';
import TronTreasury_raw from '../../Abis/treasury.json';     
const tronTreasury_ABI = TronTreasury_raw.abi;



import { default as ProductSpecGrid } from "../../components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { default as CardReport03 } from "../../components/Report03";
// import { default as CardReport04 } from "./Card/Report04";
// import { default as CardReport05 } from "./Card/Report05";
import { default as CardReport04 } from "../../components/Report04";
import { default as CardReport05 } from "../../components/Report05";


import Icon from "../../components/Icon";
import Tag from "../../components/Tag";


// import { BaseColor, BaseStyle, useTheme } from "@config";
import { BaseColor } from "../../config/theme";
import { BaseStyle } from "../../config/styles";
import { Images } from "../../config/images";


// import { PProject } from "@data";
// import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View, Button, Header, Text } from "react-native";
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

// #region PProject
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

const TreasuryScreen = ({navigation}) => {

    const passedParamsObject = navigation.getState().routes[1].params;
    console.log(`==============> passedParamsObject: `,passedParamsObject);
    console.log(` ${typeof passedParamsObject} KEYS: `,Object.keys(passedParamsObject));
    const id = passedParamsObject.id;
    const name = passedParamsObject.name;
    console.log(`==============> id: `,id);
    console.log(`==============> name: `,name);


    // const { t } = useTranslation();
    // const { colors } = useTheme();
    // const navigation = useNavigation();
    // const route = useRoute();
    const [members, setMembers] = useState(PProject[0].members);
    const [item, setItem] = useState(PProject[0]);

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
          console.log(`Frozen: `,JSON.stringify(result.frozen));
  
          console.log(`Create Time: ${result.create_time}`);
          console.log(`Create TimeString: ${new Date(result.create_time)}`);
          console.log(`AccountActiveState: ${result.active_permission.type}`);
          // Balance: 1138.75732
          // Frozen:  undefined
          // Create Time: 1666533885000
          // Create TimeString: Sun Oct 23 2022 17:04:45 GMT+0300 (EEST)
          // AccountActiveState: undefined
          setAccountDetails({balance: tronWeb.fromSun(result.balance), frozenBalance: "something", creationTime: new Date(result.create_time), accountState: result.active_permission.type});
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
        console.log(`Connecting to Treasury Smart contract `);
        const setupTreasurySC = async (trAddress) => {
            const tronTreasuryContract = await tronWeb.contract(tronTreasury_ABI, trAddress);
            const treasuryAdmin  = await tronTreasuryContract.admin().call();
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

    // useEffect(() => {
    //     if (treasuryAddress) getAccountDetails;
    // },[treasuryAddress])




    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView, { flex: 1 }]}
            edges={["right", "top", "left"]}
        >
         {/* <WalletConnectExperience /> */}

            {/* // title={t("Referenda Overview")} */}
            {/* <Header
                title={"Referenda Overview"}

                renderLeft={() => {
                    return (
                        <Icon
                            name="angle-left"
                            size={20}
                            color={colors.text}
                            enableRTL={true}
                        />
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
                renderRight={() => {
                    return (
                        <Text headline primaryColor>
                            {"edit"}

                        </Text>
                    );
                }}
                onPressRight={() => {
                    navigation.navigate("PProjectCreate", { item: item });
                }}
            /> */}
                {/* {t("edit")} */}

            <ScrollView
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text title3>{treasuryAddress? `Treasury Address: ${treasuryAddress}`: "Loading"}</Text>
                    <Text title3>{treasuryAdmin? `Treasury Administrator: ${treasuryAdmin}`: "Loading"}</Text>
                    <Text title3>{accountDetails? `Treasury  Balance: ${accountDetails.balance}`: "Loading"}</Text>
                    <Text title3>{accountDetails? `Treasury  Creation Time: ${accountDetails.creationTime}`: "Loading"}</Text>

                    <Text body2 light style={{ paddingVertical: 10 }}>
                        {
                            "SUBMIT A NEW REFERENDUM BY PROVIDING \n TREASURY ADDRESS\n AMOUNT TRX\n  CID\n  STARTINBLOCKS\n DURATION\n SCORE IN BLOCKS AFTER REFERENDUM EXPIRATION"
                        }
                    </Text>
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
                            {/* // description={t("Owner")} */}
                    </View>
                    <View style={styles.specifications}>
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={"129"}
                            description={"Referenda #"}
                            
                        />
                            {/* // description={t("Referenda #")} */}
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
                            {/* // description={t("status")} */}
                    </View>
                    {/* <Text
                        headline
                        style={{
                            paddingTop: 10,
                            paddingBottom: 5,
                        }}
                    >
                        {t("tags")}
                    </Text>
                    <View style={styles.wrapContent}>
                        {TAGS.map((item) => {
                            return (
                                <Tag
                                    chip
                                    key={item.id}
                                    style={{
                                        marginTop: 10,
                                        marginRight: 10,
                                        paddingHorizontal: 10,
                                        borderColor: colors.card,
                                    }}
                                >
                                    {item.name}
                                </Tag>
                            );
                        })}
                    </View>
                    <View
                        style={[
                            styles.specifications,
                            { justifyContent: "space-between" },
                        ]}
                    >
                        <Text headline>{t("team_members")}</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("PSelectAssignee", {
                                    members: members,
                                })
                            }
                        >
                            <Text body2 accentColor>
                                {t("view_all")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.specifications}>
                        <Avatars users={members} limit={3} isShowMore={false} />
                        <PButtonAddUser
                            onPress={() =>
                                navigation.navigate("PSelectAssignee", {
                                    members: members,
                                })
                            }
                        />
                    </View>
                    <Text caption1 grayColor>{`and ${
                        members.length <= 3 ? 0 : members.length - 3
                    } other members`}</Text> */}
                </View>

                <Text
                    headline
                    style={{
                        paddingTop: 20,
                        paddingBottom: 5,
                    }}
                >
                    {"Referenda Details"}

                </Text>
                    {/* {t("Referenda Details")} */}
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
                        {/* 5 */}
                        <CardReport05
                            style={{ marginTop: 7 }}
                            title = "Turnout"
                            price = "2.3%"
                            icon = "user-friends"
                            onPress={() => navigation.navigate("FCryptol02")}
                        />

                    </View>
                    <View style={{ flex: 1, paddingLeft: 7 }}>
                        {/* 4 */}
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
                    </View>
                </View>



                <View style={newStyles.backgroundStyle}>
                    <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Nummber of TRX'  style={newStyles.inputStyle} value={depositTokens} onChangeText={(newValue) => setDepositTokens(newValue)} />
                    <Button style={newStyles.voteButtonStyleAye}     title="Deposit" onPress={() => deposit(depositTokens) } />
                </View>

                <View style={newStyles.votingbackgroundStyle}>
                    <Button style={newStyles.voteButtonStyleNay}     title="Withdraw" onPress={() => withdraw() } />
                </View>



                {/* <View style={{ flex: 1, paddingLeft: 7 }}>
                    <Button
                        title="DEPOSIT"
                        style={{ backgroundColor: colors.primaryLight }}
                        onPress={() => {
                        navigation.goBack();
                        }}
                    >
                        {"DEPOSIT"}

                    </Button>
                </View> */}

                <View style={{ flex: 1, paddingLeft: 7,  marginTop: 7 }}>
                </View>

                {/* <View style={{ flex: 1, paddingLeft: 7 }}>
                    <Button
                        title="WITHDRAW ALL"
                        style={{ marginTop: 7 }}
                        onPress={() => {
                        navigation.goBack();
                        }}
                    >
                        {"WITHDRAW"}
                    </Button>
                </View> */}

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
