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
import { useTranslation } from "react-i18next";


import { default as ProductSpecGrid } from "../../components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { default as CardReport03 } from "../../components/Report03";
import { default as CardReport04 } from "../../components/Report04";
import { default as CardReport05 } from "../../components/Report05";


import Icon from "../../components/Icon";
import Tag from "../../components/Tag";

import { useTheme } from "@config";
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
    const { t } = useTranslation();
    const { colors } = useTheme();
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
                    <View style={styles.title}>
                        <Text>{t("Title")}</Text>

                    </View>
                    <View style={styles.container}>
                        <TextInput
                        style={styles.input}
                        onChangeText={(newValue) => setTitle(newValue)}
                        autoCorrect={false}
                        placeholder="Title Of Your New Referendum"
                        placeholderTextColor={BaseColor.grayColor}
                        value={title}
                        selectionColor={colors.primary}
                        />
                    </View>
                    <View style={styles.title}>
                        <Text>{t("Treasury Address")}</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                        style={styles.input}
                        onChangeText={(newValue) => setTreasuryAddress(newValue)}
                        autoCorrect={false}
                        placeholder='Valid Treasury Address'
                        placeholderTextColor={BaseColor.grayColor}
                        value={treasuryAddress}
                        selectionColor={colors.primary}
                        />
                    </View>

                    <View style={styles.title}>
                        <Text>{t("Requested Amount")}</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                        style={styles.input}
                        onChangeText={(newValue) => setRequestAmount(newValue)} 
                        autoCorrect={false}
                        placeholder='=> 100 TRX'
                        placeholderTextColor={BaseColor.grayColor}
                        value={requestAmount}
                        selectionColor={colors.primary}
                        />
                    </View>

                    <View style={styles.title}>
                        <Text>{t("Number Of Blocks To Start")}</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                        style={styles.input}
                        onChangeText={(newValue) => setStartInNumBlocks(newValue)}  
                        autoCorrect={false}
                        placeholder='=< 20 Blocks'
                        placeholderTextColor={BaseColor.grayColor}
                        value={startInNumBlocks}
                        selectionColor={colors.primary}
                        />
                    </View>

                    <View style={styles.title}>
                        <Text>{t("Referendum Duration")}</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                        style={styles.input}
                        onChangeText={(newValue) => setDuration(newValue)}  
                        autoCorrect={false}
                        placeholder='Between 20 and 201600 Blocks'
                        placeholderTextColor={BaseColor.grayColor}
                        value={duration}
                        selectionColor={colors.primary}
                        />
                    </View>

                    <View style={styles.title}>
                        <Text>{t("Blocks After Completion To Score Project")}</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                        style={styles.input}
                        onChangeText={(newValue) => setScoringInNumBlocks(newValue)}   
                        autoCorrect={false}
                        placeholder='> 0 Blocks'
                        placeholderTextColor={BaseColor.grayColor}
                        value={scoringInNumBlocks}
                        selectionColor={colors.primary}
                        />
                    </View>

                    <View style={styles.title}>
                        <Text>{t("Description")}</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                        style={styles.inputDesc}
                        onChangeText={(newValue) => setDescription(newValue)}   
                        autoCorrect={true}
                        autoCapitalize='sentences'
                        placeholder="Describe what you are planning to do with the funds if the referednum passes. Treasury will score your performance based on actual versus expected performance as described here."
                        placeholderTextColor={BaseColor.grayColor}
                        value={description}
                        multiline={true}
                        selectionColor={colors.primary}
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => createNewReferedum() }

                    >
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style={{ flex: 1, paddingLeft: 7,  marginTop: 7 }}>
                </View>
           
            </ScrollView>
        </SafeAreaView>
    );
};



export default ProposalScreen;
