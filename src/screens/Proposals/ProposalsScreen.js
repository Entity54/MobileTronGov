import React, { useMemo, useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// import WalletConnectExperience from "../../../WalletConnectExperience";
import GovContext from '../../context/GovContext';
import { ethers } from 'ethers';  



    // import Avatars from "@components/Avatars";
    // import Icon from "@components/Icon";
import Icon from "../../components/Icon";
    // import ProgressBar from "@components/Progress/Bar";
import ProgressBar from "../../components/Progress/Bar";
    // import Tag from "@components/Tag";
import Tag from "../../components/Tag";
    // import Text from "@components/Text";
    // import { BaseColor, useTheme } from "@config";
import { BaseColor } from "../../config/theme";

import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";
// import { TouchableOpacity, View, Text } from "react-native";
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





//#region NTT54
//#region *** Allows us to see scheduled notifications nut not enough to open the notification start ***/
Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowAlert: true
        }
    }
});
//#endregion *** Allows us to see scheduled notifications nut not enough to open the notification end ***/
 
//#region // START: NEWLY ADDED FUNCTIONS This is needed for Local notifications in iOS////
const allowsNotificationsAsync = async () => {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted ||
      settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
};
   
const requestPermissionsAsync = async () => {
    return await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
};
//#endregion // END: NEWLY ADDED FUNCTIONS ////
  
  
  





//#endregion






// const Project01 = ({
const ProposalsScreen = ({ navigation,
    style,
    onPress,
    title = "assetManage This is a Test",
    description =
    `Some sort of description for the referendum
Some sort of description for the referendum
Some sort of description for the referendum`,
    onOption,
    members = ["alpha","beta"],
    limit = 3,
    tasks = 100,
    comments = 0,
    tickets = 0,
    completedTickets = 0,
    status = "Moonbase",
}) => {
    
    
    const [scNumber, setScNumber] = useState();
    const [proposalTokens, setProposalTokens] = useState();
    const [lowestUnbaked, setLowestUnbaked] = useState();
    const [numOfProposals, setNumOfProposals] = useState();


    const [propIndexToSecond, setPropIndexToSecond]  = useState();
    const [refIndex, setRefIndex]  = useState();
    const [voteAmount, setVoteAmount]  = useState();
    const [convictionIndex, setConvictionIndex]  = useState();

    const [proposalHash, setProposalHash]  = useState();
    const [proposalAmount, setProposalAmount]  = useState();
    const [encodedProposal, setEncodedProposal]  = useState();
    const [representativeAddress, setRepresentativeAddress]  = useState();
    const [unlockTargetAddress, setUnlockTargetAddress]  = useState();
    
    const {wallet, scComs, scGov, updateSignerElements} = useContext(GovContext);
    
    
    //#region Read Governance Precompile
    const getTokensDepositedFroProposal = async (proposalIndexNum) => {
        if (scGov)
        {
          const tokensWEI= await scGov.depositOf(parseInt(proposalIndexNum));
          console.log(` *****> tokensWEI.toString(): ${tokensWEI.toString()} `);
          const tokens_DEV = ethers.utils.formatUnits(tokensWEI,18);
          console.log(`tokens in DEV: ${tokens_DEV}`)
          setProposalTokens(tokens_DEV);
        }
        else console.log(`****** getTokensDepositedFroProposal is run but scGov does not exist *******`);
  
    }
    
    const getLowestUnbaked = async () => {
        if (scGov)
        {
          const _lowestUnbaked= await scGov.lowestUnbaked();
          console.log(` *****> _lowestUnbaked: ${_lowestUnbaked} `);
          setLowestUnbaked(_lowestUnbaked.toString());
        }
        else console.log(`****** getLowestUnbaked is run but scGov does not exist *******`);
    }
  
    const getNumOfProposals = async () => {
        if (scGov)
        {
          const _numOfProposals= await scGov.publicPropCount();
          console.log(` *****> _numOfProposals: ${_numOfProposals} `);
          setNumOfProposals(_numOfProposals.toString());
        }
        else console.log(`****** getNumOfProposals is run but scGov does not exist *******`);
    }
    //#endregion Read Governance Precompile

    const second = async (propIndex, secondsUpperBound=100) => {
        if (scGov)
        {
          //TODO propIndex is a valid Index
          const proposalAmount = await getTokensDepositedFroProposal(propIndex);
          //TODO THE WALLET HAS ENOUGH TOKENS TO SECOND THIS
          
          const tx = await scGov.second(propIndex, secondsUpperBound);
          tx.wait().then( async reslveMsg => {
            console.log(`tx to second a proposal is mined resolveMsg : `,reslveMsg);
          });
  
        }
        else console.log(`****** second is run but scGov does not exist *******`);
    }
  
    const standardVote = async (refIndex, isAye, amount, convictionNum = 0 ) => {
        if (scGov)
        {
          const amountWEI = ethers.utils.parseUnits(amount,18);
          const tx = await scGov.standardVote(refIndex, isAye, amountWEI, convictionNum) ;
          tx.wait().then( async reslveMsg => {
            console.log(`tx to standardVote a proposal is mined resolveMsg : `,reslveMsg);
          });
  
        }
        else console.log(`****** standardVote is run but scGov does not exist *******`);
    }


    const propose = async (proposalHash, amount) => {
        if (scGov)
        {
          const amountWEI = ethers.utils.parseUnits(amount,18);
          const tx = await scGov.propose(proposalHash, amountWEI);
          tx.wait().then( async reslveMsg => {
            console.log(`tx to propose a proposal is mined resolveMsg : `,reslveMsg);
          });
  
        }
        else console.log(`****** propose is run but scGov does not exist *******`);
    }
  
    const removeVote = async (refIndex) => {
        if (scGov)
        {
          const tx = await scGov.removeVote(refIndex);
          tx.wait().then( async reslveMsg => {
            console.log(`tx to removeVote from a referenum is mined resolveMsg : `,reslveMsg);
          });
  
        }
        else console.log(`****** removeVote is run but scGov does not exist *******`);
    }


    const delegate = async (_representativeAddress, convictionNum, amount) => {
        if (scGov)
        {
          const amountWEI = ethers.utils.parseUnits(amount,18);
          console.log(`_representativeAddress: ${_representativeAddress} convictionNum: ${convictionNum} amountWEI: ${amountWEI}`);
          const tx = await scGov.delegate(_representativeAddress, convictionNum, amountWEI);
          tx.wait().then( async reslveMsg => {
            console.log(`tx to delegate a votie to ${_representativeAddress} is mined resolveMsg : `,reslveMsg);
          });
  
        }
        else console.log(`****** delegate is run but scGov does not exist *******`);
    }
  
    const unDelegate = async () => {
        if (scGov)
        {
          const tx = await scGov.unDelegate();
          tx.wait().then( async reslveMsg => {
            console.log(`tx to unDelegate is mined resolveMsg : `,reslveMsg);
          });
  
        }
        else console.log(`****** unDelegate is run but scGov does not exist *******`);
    }


    const unlock = async (_targetAddress) => {
        if (scGov)
        {
          const tx = await scGov.unlock(_targetAddress);
          tx.wait().then( async reslveMsg => {
            console.log(`tx to unlock from ${_targetAddress} is mined resolveMsg : `,reslveMsg);
          });
  
        }
        else console.log(`****** unlock is run but scGov does not exist *******`);
    }
  
    const notePreimage = async (_encodedProposal) => {
        if (scGov)
        {
          const tx = await scGov.notePreimage(_encodedProposal);
          tx.wait().then( async reslveMsg => {
            console.log(`tx to notePreimage is mined resolveMsg : `,reslveMsg);
          });
  
        }
        else console.log(`****** notePreimage is run but scGov does not exist *******`);
    }


    const noteImminentPreimage = async (_encodedProposal) => {
        if (scGov)
        {
          const tx = await scGov.noteImminentPreimage(_encodedProposal);
          tx.wait().then( async reslveMsg => {
            console.log(`tx to noteImminentPreimage is mined resolveMsg : `,reslveMsg);
          });
  
        }
        else console.log(`****** noteImminentPreimage is run but scGov does not exist *******`);
    }
  
      


    //TEST
    const getSCNumber = async () => {
        if (scComs)
        {
          const ang_number2 = (await scComs.retrieve()).toString();
          console.log(` *****> ang_number2: ${ang_number2} `);
          setScNumber(ang_number2)
        }
        else console.log(`****** getSCNumber is run but scComs does not exist *******`);

    }
    const setSCNumber = async (newNum) => {
        if (scComs)
        {
          const tx = await scComs.store(newNum);
          tx.wait().then( async reslveMsg => {
            console.log(`tx for transfer is mined resolveMsg : `,reslveMsg);
          });

        }
        else console.log(`****** setSCNumber is run but scComs does not exist *******`);

    }


    //#region PUSH NOTIFICATIONS SET UP PERMISSIONS AND GET DEVICE TOKEN
    useEffect(() => {
        
        //We have added Alert and Platform form reac-native above
        const configurePushNotifications = async () => {
        //Check if the user has enabled permissions
        const {status} = await Notifications.getPermissionsAsync();
        let finalStatus = status;
        
        //if permissions not enabled ask the user to enable it
        if (finalStatus!=='granted') {
            const {status} = Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        //if after the above request still not permissions enable just alert the user
        if (finalStatus!=='granted') {
            Alert.alert('Permission required', 'Push notifications need the appropriate permissions.');
            return;
        }

        //if you reach this stage then all permissions needed has been enabled we can proceed and get the unique device token
        const pushTokenData = await Notifications.getExpoPushTokenAsync();
        console.log('pushTokenData: ',pushTokenData);   //see this being printed NOTE THIS IS SENITIVE INFORMATION

        //For Android we need an extra step in setting up a channell and stating the importance of the notifications
        if (Platform.OS==='android') {
            Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.DEFAULT
            })
        }
        

        }

        configurePushNotifications();
    },[])
    //#endregion


    //#region *** EVENT LISTENERS FOR RECEIVING NOTIFICATIONS  ***/ start
    useEffect(() => {
    
        //event listener no matter whether the user Taps the nitification or not
        const subscription1 = Notifications.addNotificationReceivedListener((notificationObject) => {
        console.log('Notification Received');
        console.log(notificationObject);
        const userName = notificationObject.request.content.data.userName;
        console.log(`USER NAME : ${userName}`);
        });

        //event listener when the user taps the notification
        const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification Response Received');
        console.log(response);
        const userName = response.notification.request.content.data.userName;
        console.log(`USER NAME FROM RESPONSE : ${userName}`);
        });


        return () => {
        //removing event listeners to avoid memory leaks
        subscription1.remove();
        subscription2.remove();
        }
    },[])
    //#endregion *** EVENT LISTENERS FOR RECEIVING NOTIFICATIONS  ***/ end

    //#region *** ALLOWS THE CREATION OF LOCAL SCHEDULED NOTIFICATIONS *** start
    // const trigger = new Date(Date.now() + 60 * 60 * 1000);
    // trigger.setMinutes(0);
    // trigger.setSeconds(0);
    // trigger,
    const angScheduleNotificationHanlder = async () => {

        ////iOS START: CALL FUNCTIONS HERE NEEDED FOR IOS////
        const hasPushNotificationPermissionGranted = await allowsNotificationsAsync();

        if (!hasPushNotificationPermissionGranted) {
            await requestPermissionsAsync();
        }
        //// END: CALL FUNCTIONS HERE ////

        Notifications.scheduleNotificationAsync({
            content: {
            title: 'My first local notification',
            body: 'This is the body of the notification.',
            data: { userName: 'Max'}
            },
            trigger: {
            seconds: 5,
            repeats: false
            }
        });

    }
    //#endregion *** ALLOWS THE CREATION OF LOCAL SCHEDULED NOTIFICATIONS *** end


    //#region
    //This part sends a Push notirfication and normally would be inside a server
    const sendPushNotificationHandler = () => {
        fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            to: "ExponentPushToken[pM5T3fG_V66hoJMZvn7VJO]",
            title: 'Test sent from iPhone',
            body: 'This is a test that was sent from an iPhone to my Adnroid phone. Has it worked?'
            })
        }
        )
    }
    //#endregion NTT54
        
    
    
    
    
    
    
    
    
    
    // const { t } = useTranslation();
    // const { colors } = useTheme();
    const { remainder, usersLimit } = useMemo(() => {
        const limitInt = parseInt(limit);
        let remainder = 0;
        let usersLimit = members;
        if (limitInt != NaN && limitInt != 0) {
            remainder = members.length - limitInt;
            usersLimit = members.slice(0, limitInt);
        }

        return {
            remainder,
            usersLimit,
        };
    }, [members, limit]);

    const percent = useMemo(() => {
        try {
            if (tickets != 0) {
                return Math.round((completedTickets / tickets) * 100);
            }
            return 0;
        } catch (error) {
            return 0;
        }
    }, [completedTickets, tickets]);

    const { statusName, statusColor } = useMemo(() => {
        switch (status) {
            case "Moonbase":
                return {
                    statusName: `${status}`, //t(status),
                    statusColor: BaseColor.blueLightColor,
                };
            case "Moonriver":
                return {
                    statusName: `${status}`, //t(status),
                    statusColor: BaseColor.blueDarkColor,
                };
            default:
                return {
                    statusName: `${status}`, //t(status),
                    statusColor: BaseColor.greenColor,
                };
        }
    }, [status]);

    return (
        <View>
         {/* <WalletConnectExperience /> */}

                   
        <TouchableOpacity alpha={"Angelos"} onPress={() => navigation.navigate("Proposal", {id: "Angelos2022", name:"Ntt54"})} >


        <View style={[styles.contain, style, { backgroundColor: colors.card }]}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                        <Text title3 numberOfLines={1}>
                            {title}
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
                        paddingBottom: 10,
                    }}
                >
                    <Tag
                        light
                        textStyle={{
                            color: BaseColor.whiteColor,
                        }}
                        style={{
                            backgroundColor: statusColor,
                            paddingHorizontal: 10,
                            minWidth: 80,
                        }}
                    >
                        {statusName}
                    </Tag>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: 20,
                    }}
                >
                    <Icon name="tasks" size={14} color={colors.text} />
                    <Text
                        caption1
                        style={{
                            paddingLeft: 5,
                            paddingRight: 20,
                        }}
                    >
                        {tasks} {"tasks"}
                    </Text>

                    <Icon solid name="comment" size={14} color={colors.text} />
                    <Text
                        caption1
                        style={{
                            paddingHorizontal: 5,
                        }}
                    >
                        {comments} {"comments"}
                    </Text>
                </View>
                <Text caption2 light>
                    {description}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 20,
                    }}
                >
             
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 0,
                        paddingBottom: 5,
                        justifyContent: "space-between",
                    }}
                >
                        {/* {t("Vote Progress")} {`${percent}%`} */}
                    <Text overline>
                        {("Vote Progress")} {`${"percent100%"}%`}

                    </Text>
                
                </View>
                <ProgressBar
                    style={{ flex: 1, paddingRight: 20 }}
                    color={BaseColor.accentColor}
                    percent={percent}
                />
            </View>
        </View>

       </TouchableOpacity>

                        {/* <Button
                            title="Go to Referendum Screen"
                            onPress={() => navigation.navigate('Referendum')}
                        /> */}
        </View>
    );
};

ProposalsScreen.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOption: PropTypes.func,
};

// export default Project01;
export default ProposalsScreen;

