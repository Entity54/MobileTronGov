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
import React, { useEffect, useState } from "react";
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


const PProject = [
    {
        id: 2,
        title: "assetManager.registerLocalAsset",
        description:
            "Register a new local asset No information is stored in this pallet about the local asset The reason is that we dont need to hold a mapping between the multilocation and the local asset, as this conversion is deterministic Further, we dont allow xcm fee payment in local assets ",
        tasks: 105,
        tickets: 100,
        completedTickets: 90,
        comments: 200,
        status: "Moonbase",
        statusName: "Moonbase",
        members: [
            {
                id: 1,
                name: "Stevie Grarrett",
                total: "@steave.grarrent",
                image: Images.avata1,
            },
            {
                id: 2,
                name: "Kondo leyasu",
                total: "@kondo.leyasu",
                image: Images.avata2,
            },
            {
                id: 3,
                name: "Quinten Kortum",
                total: "@quinten.kortum",
                image: Images.avata3,
            },
            {
                id: 4,
                name: "Monica Ribeiro",
                total: "@monica.ribeiro",
                image: Images.avata4,
            },
            {
                id: 5,
                name: "Steve Kute",
                total: "@steve.kute",
                image: Images.profile1,
            }
        ],
    },
    {
        id: 1,
        title: "assetManager.registerLocalAsset",
        description:
            "Register a new local asset No information is stored in this pallet about the local asset The reason is that we dont need to hold a mapping between the multilocation and the local asset, as this conversion is deterministic Further, we dont allow xcm fee payment in local assets",
        tasks: 102,
        tickets: 124,
        completedTickets: 98,
        comments: 300,
        status: "Moonriver",
        statusName: "Moonriver",
        members: [
            {
                id: 4,
                name: "Monica Ribeiro",
                total: "@monica.ribeiro",
                image: Images.avata4,
            },
            {
                id: 5,
                name: "Steve Kute",
                total: "@steve.kute",
                image: Images.profile1,
            },
            {
                id: 6,
                name: "Lakshmana Dongerkerry",
                total: "@lakshmana.dongerkerry",
                image: Images.profile2,
            },
            {
                id: 1,
                name: "Steve Grarrett",
                total: "@steave.grarrent",
                image: Images.avata1,
            },
            {
                id: 2,
                name: "Kondo leyasu",
                total: "@kondo.leyasu",
                image: Images.avata2,
            },
            {
                id: 3,
                name: "Quinten Kortum",
                total: "@quinten.kortum",
                image: Images.avata3,
            },
        ],
    },
    {
        id: 3,
        title: "system.remark",
        description: "Make some on-chain remark.",
        tasks: 102,
        tickets: 100,
        completedTickets: 100,
        comments: 300,
        status: "Moonbase",
        statusName: "Moonbase",
        members: [
            {
                id: 6,
                name: "Lakshmana Dongerkerry",
                total: "@lakshmana.dongerkerry",
                image: Images.profile2,
            },
            {
                id: 7,
                name: "Chioke Okonkwo",
                total: "@chioke.okonkwo",
                image: Images.profile3,
            },
            {
                id: 8,
                name: "Lacara Jones",
                total: "@lacara.jones",
                image: Images.profile4,
            },
            {
                id: 1,
                name: "Steve Grarrett",
                total: "@steave.grarrent",
                image: Images.avata1,
            },
            {
                id: 2,
                name: "Kondo leyasu",
                total: "@kondo.leyasu",
                image: Images.avata2,
            },
        ],
    },
    {
        id: 4,
        title: "system.remark",
        description:
            "Make some on-chain remark.",
        tasks: 50,
        tickets: 90,
        completedTickets: 40,
        comments: 200,
        status: "Moonbase",
        statusName: "Moonbase",
        members: [
            {
                id: 8,
                name: "Lacara Jones",
                total: "@lacara.jones",
                image: Images.profile4,
            },
            {
                id: 1,
                name: "Steve Grarrett",
                total: "@steave.grarrent",
                image: Images.avata1,
            },
            {
                id: 6,
                name: "Lakshmana Dongerkerry",
                total: "@lakshmana.dongerkerry",
                image: Images.profile2,
            },
            {
                id: 7,
                name: "Chioke Okonkwo",
                total: "@chioke.okonkwo",
                image: Images.profile3,
            },
            {
                id: 2,
                name: "Kondo leyasu",
                total: "@kondo.leyasu",
                image: Images.avata2,
            },
        ],
    },
];






const TAGS = [
    { id: "1", icon: "wifi", name: "HTML", checked: true },
    { id: "2", icon: "bath", name: "Bootstrap" },
    { id: "3", icon: "paw", name: "CSS3" },
    { id: "4", icon: "bus", name: "Jquery" },
];

const ProposalScreen = ({navigation}) => {

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
                    <Text title3>{item.title}</Text>
                    <Text body2 light style={{ paddingVertical: 10 }}>
                        {
                            "Register a new local asset No information is stored in this pallet about the local asset The reason is that we dont need to hold a mapping between the multilocation and the local asset, as this conversion is deterministic Further, we dont allow xcm fee payment in local assets."
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
                <View style={{ flex: 1, paddingLeft: 7 }}>
                    <Button
                        title="VOTE"
                        style={{ backgroundColor: colors.primaryLight }}
                        onPress={() => {
                        navigation.goBack();
                        }}
                    >
                        {"VOTE1"}

                    </Button>
                        {/* {t("VOTE")} */}
                </View>

                <View style={{ flex: 1, paddingLeft: 7,  marginTop: 7 }}>
                </View>

                <View style={{ flex: 1, paddingLeft: 7 }}>
                    <Button
                        title="UNVOTE"
                        style={{ marginTop: 7 }}
                        onPress={() => {
                        navigation.goBack();
                        }}
                    >
                        {"UNVOTE1"}

                    </Button>
                        {/* {t("UNVOTE")} */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProposalScreen;
