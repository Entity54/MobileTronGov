import TronWeb from 'tronweb/dist/TronWeb.js';

import React, { useMemo, useEffect, useContext, useState, Children } from "react";
import { Text, FlatList, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// import WalletConnectExperience from "../../../WalletConnectExperience";
import GovContext from '../../context/GovContext';
// import { ethers } from 'ethers';  
import axios from 'axios';

import {query_LatestReferendaandProposals} from '../../Queries';    



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



// const url = 'https://api.subquery.network/sq/Entity54/governancemoonbasealpha' ;
// const url = 'https://api.subquery.network/sq/Entity54/MoonbaseAlphaGov' ;
// const url = 'https://api.subquery.network/sq/Entity54/MoonbaseAlphaGovernance' ;

//#region sendGraphQLRequestFromNum
// const query = query_AllAfterBlockNum(blockNum);
// const _sendGraphQLRequestFromNum = async () => {	 
//     console.log(`====> SENDING  A SUBQUERY for active Referenda adn Proposals`);
    
//     const query = query_LatestReferendaandProposals();
//     axios({ url: `${url}`, method: 'post', data: { query: query } })
//     .then( async (result) => {

//             //activeProposalsReferendaLists
//             const _activeProposalsReferendaLists_dataArray = result.data.data.activeProposalsReferendaLists.nodes;
//             const activeProposalsReferendaLists_dataArray = _activeProposalsReferendaLists_dataArray[0];

//             console.log(" ===========>>>>>> GRAPHQL activeProposalsReferendaLists_dataArray: ",activeProposalsReferendaLists_dataArray);
//             const referendaArray = JSON.parse(activeProposalsReferendaLists_dataArray.referendaArray)

//             console.log(" ===========>>>>>> GRAPHQL referendaArray: ",referendaArray);

//             // console.log("====> GRAPHQL activeProposalsReferendaLists_dataArray : ",JSON.stringify(activeProposalsReferendaLists_dataArray));
//             if (activeProposalsReferendaLists_dataArray.length>0)
//             {
//                 activeProposalsReferendaLists_dataArray.forEach((elem) => {
//                     // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.now: ${elem.now} elem.lowestUnbaked: ${elem.lowestUnbaked} elem.referendumCount: ${elem.referendumCount} elem.publicPropsLength: ${elem.publicPropsLength}`);
//                     console.log(` ******************************************************************* `);
//                     console.log(` BlokcNumber: ${elem.blockNum} Timestmap: ${elem.timestamp} LowestUnbaked: ${elem.lowestUnbaked} ReferendumCount: ${elem.referendumCount} ProposalCount: ${elem.publicPropsLength}`);
//                     let referendaList = "", referendaArray=[];
//                     if (elem.referendaArray)
//                     {
//                         const referendaArray = JSON.parse(elem.referendaArray)
//                         // console.log(`|||||>>>> elem.referendaArray ${typeof referendaArray} <<<|||||: `,elem.referendaArray);
//                         const referendaHeaders = `Index\tEndBlock\tProposalHash\tEnactmentDelay\tAYES\tNAYS\tturnout\n`
//                         // referendaArray.forEach(referendum => referendaList +=`${referendum.referendumIndex}\t${referendum.refrendumEndBlock}\t${referendum.refrendumProposalHash}\t${referendum.refrendumDelay}\t${web3.utils.fromWei(referendum.refrendumTally.ayes)}\t${web3.utils.fromWei(referendum.refrendumTally.nays)}\t${web3.utils.fromWei(referendum.refrendumTally.turnout)}\n`);
//                         referendaArray.forEach(referendum => referendaList +=`${referendum.referendumIndex}\t${referendum.refrendumEndBlock}\t${referendum.refrendumProposalHash}\t${referendum.refrendumDelay}\t${ethers.utils.formatUnits(referendum.refrendumTally.ayes)}\t${ethers.utils.formatUnits(referendum.refrendumTally.nays)}\t${ethers.utils.formatUnits(referendum.refrendumTally.turnout)}\n`);

//                     }
//                     console.log(referendaList);

//                     let proposaList = "";
//                     if (elem.proposalList)
//                     {
//                         const proposalArray = JSON.parse(elem.proposalList)
//                         console.log(`|||||>>>> elem.proposalList ${typeof  proposalArray} : `,elem.proposalList);

//                     }
//                     console.log(`proposaList: `,proposaList);

//                     console.log(` ******************************************************************* `);

//                     // lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
//                 })
//             }
//             else console.log(`activeProposalsReferendaLists_dataArray is blank`);


//             return activeProposalsReferendaLists_dataArray;
//             // return {voteds_dataArray, preImageNoteds_dataArray, proposeds_dataArray, secondeds_dataArray, tableds_dataArray, passeds_dataArray, notPasseds_dataArray, activeProposalsReferendaLists_dataArray};
//             // return {voteds_dataArray, preImageNoteds_dataArray, proposeds_dataArray, secondeds_dataArray, tableds_dataArray, passeds_dataArray, notPasseds_dataArray, removeVoteCalls_dataArray, unlockCalls_dataArray, activeProposalsReferendaLists_dataArray};

//     });
// };
//#endregion sendGraphQLRequestFromNum





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
const ReferendaScreen = ({ navigation,
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
    
    // const [scNumber, setScNumber] = useState();
    // const [proposalTokens, setProposalTokens] = useState();
    // const [lowestUnbaked, setLowestUnbaked] = useState();
    // const [numOfProposals, setNumOfProposals] = useState();

    // const [propIndexToSecond, setPropIndexToSecond]  = useState();
    // const [refIndex, setRefIndex]  = useState();
    // const [voteAmount, setVoteAmount]  = useState();
    // const [convictionIndex, setConvictionIndex]  = useState();

    // const [proposalHash, setProposalHash]  = useState();
    // const [proposalAmount, setProposalAmount]  = useState();
    // const [encodedProposal, setEncodedProposal]  = useState();
    // const [representativeAddress, setRepresentativeAddress]  = useState();
    // const [unlockTargetAddress, setUnlockTargetAddress]  = useState();
    // const {wallet, scComs, scGov, updateSignerElements} = useContext(GovContext);
    // const scComs = null;
    // const scGov = null;
    

    const {tronWeb, updateTronWeb, tronGovernanceSC, updateCurrentBlockNumber, currentBlockNumber } = useContext(GovContext);
    const [referendaArray, setReferendaArray]  = useState([]);

     



    const getActiveRefrenda = async () => {
        console.log("Getting ready to retrieve Active refrenda");

        if (tronGovernanceSC) {

            const band1  = await tronGovernanceSC.band1().call();
            const band2  = await tronGovernanceSC.band2().call();
            const band3  = await tronGovernanceSC.band3().call();
            console.log(`band1: ${band1} band2: ${band2} band3: ${band3}`);


            const activeReferendaIDarrayUint  = await tronGovernanceSC.getActiveReferenda().call();
            const activeReferendaIDarray = activeReferendaIDarrayUint.map(itm => `${itm}`);
            console.log(`activeReferendaIDarray: `,activeReferendaIDarray);
            let activereferendarray=[];

            for (let i=0; i<activeReferendaIDarray.length; i++)
            {
                const refID = activeReferendaIDarray[i];
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
                
                activereferendarray.push({
                    referendum_Index      : `${referendumDetails[0]}`,
                    referendum_Beneficiary: `${referendumDetails[1]}`,
                    referendum_Treasury   : `${referendumDetails[2]}`,
                    referendum_Amount     : refAmountSun,
                    referendum_CID        : `${referendumDetails[4]}`,
                    referendum_startBlock : startBlock,
                    referendum_endBlock   : endBlock,
                    referendum_scoreBlock : `${referendumDetails[7]}`,
                    referendum_Ayes       : `${tronWeb.fromSun(referendumDetails[8])}`,
                    referendum_Nays       : `${tronWeb.fromSun(referendumDetails[9])}`,
                    referendum_Turnout    : `${referendumDetails[10]}`,
                    referendum_Passed     : Number(`${referendumDetails[8]}`) > Number(`${referendumDetails[9]}`)? "Passing" : "Not Passing",
                    referendum_TagColor   : tagColor,
                    referendum_TagText    : tagText,
                    referendum_ProgressBarPercent : progressBarPercent
                })
                //  referendum_Passed     : `${referendumDetails[11]}`,


          }

          console.log(`activereferendarray: `,activereferendarray);
          setReferendaArray(activereferendarray);

        }

    }


    useEffect(() => {
        
      const initiateTron = async () => {
        // ***** THE SECTION BELOW IS FOR THE SERVER TO BE RUN ***** START //
        console.log(`Setting Up HttpProvider`);
        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider("https://api.nileex.io");
        const solidityNode = new HttpProvider("https://api.nileex.io");
        const eventServer = new HttpProvider("https://api.nileex.io");
        console.log(`Setting Up privateKey`);
        //SERVER public key = "TCWNqQsbojjsey8jTEJgsC2RiPGyRzA5GA"
        const privateKey = "bb4a09b98dfa5e263011c4023a2075c16c0a0ef961d32e7f28bd1eb1d4ad377b";
        
        console.log(`Setting Up fullHost`);
        // setTronWeb_server(new TronWeb(fullNode,solidityNode,eventServer,privateKey));
        updateTronWeb(new TronWeb(fullNode,solidityNode,eventServer,privateKey));
      }
      
      initiateTron();
    },[]);
 

    useEffect(() => {
        
        // const initiateTron = async () => { 
        //   const admin  = await tronGovernanceSC.admin().call();
        //   console.log(`||||>>>>>> tron Governance admin: ${admin} `);  //||||>>>>>> tron Governance admin: 41da7b7457b4e71796cee8a466a1a3a635fad45451 
  
        //   const activeReferendaIDarrayUint  = await tronGovernanceSC.getActiveReferenda().call();
        //   const activeReferendaIDarray = activeReferendaIDarrayUint.map(itm => `${itm}`);
        //   console.log(`activeReferendaIDarray: `,activeReferendaIDarray);
  
        //   const referendumDetails  = await tronGovernanceSC.referendumDetails(1).call();
        //   // console.log(`referendumDetails: `,referendumDetails);
        // }
        // initiateTron();

        if (tronGovernanceSC)
        {
          getActiveRefrenda();
        }
      

    },[tronGovernanceSC]);


    //#region sendGraphQLRequestFromNum
    const sendGraphQLRequestFromNum = async () => {	 
        console.log(`====> SENDING  A SUBQUERY for active Referenda adn Proposals`);
        
        const query = query_LatestReferendaandProposals();
        axios({ url: `${url}`, method: 'post', data: { query: query } })
        .then( async (result) => {
    
                //activeProposalsReferendaLists
                const _activeProposalsReferendaLists_dataArray = result.data.data.activeProposalsReferendaLists.nodes;
                const activeProposalsReferendaLists_dataArray = _activeProposalsReferendaLists_dataArray[0];
    
                console.log(" ===========>>>>>> GRAPHQL activeProposalsReferendaLists_dataArray: ",activeProposalsReferendaLists_dataArray);
                const referendaArray = JSON.parse(activeProposalsReferendaLists_dataArray.referendaArray)
                setReferendaArray(referendaArray);
                console.log(" ===========>>>>>> GRAPHQL referendaArray: ",referendaArray);
    
                // // console.log("====> GRAPHQL activeProposalsReferendaLists_dataArray : ",JSON.stringify(activeProposalsReferendaLists_dataArray));
                // if (activeProposalsReferendaLists_dataArray.length>0)
                // {
                //     activeProposalsReferendaLists_dataArray.forEach((elem) => {
                //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.now: ${elem.now} elem.lowestUnbaked: ${elem.lowestUnbaked} elem.referendumCount: ${elem.referendumCount} elem.publicPropsLength: ${elem.publicPropsLength}`);
                //         console.log(` ******************************************************************* `);
                //         console.log(` BlokcNumber: ${elem.blockNum} Timestmap: ${elem.timestamp} LowestUnbaked: ${elem.lowestUnbaked} ReferendumCount: ${elem.referendumCount} ProposalCount: ${elem.publicPropsLength}`);
                //         let referendaList = "", referendaArray=[];
                //         if (elem.referendaArray)
                //         {
                //             const referendaArray = JSON.parse(elem.referendaArray)
                //             // console.log(`|||||>>>> elem.referendaArray ${typeof referendaArray} <<<|||||: `,elem.referendaArray);
                //             const referendaHeaders = `Index\tEndBlock\tProposalHash\tEnactmentDelay\tAYES\tNAYS\tturnout\n`
                //             // referendaArray.forEach(referendum => referendaList +=`${referendum.referendumIndex}\t${referendum.refrendumEndBlock}\t${referendum.refrendumProposalHash}\t${referendum.refrendumDelay}\t${web3.utils.fromWei(referendum.refrendumTally.ayes)}\t${web3.utils.fromWei(referendum.refrendumTally.nays)}\t${web3.utils.fromWei(referendum.refrendumTally.turnout)}\n`);
                //             referendaArray.forEach(referendum => referendaList +=`${referendum.referendumIndex}\t${referendum.refrendumEndBlock}\t${referendum.refrendumProposalHash}\t${referendum.refrendumDelay}\t${ethers.utils.formatUnits(referendum.refrendumTally.ayes)}\t${ethers.utils.formatUnits(referendum.refrendumTally.nays)}\t${ethers.utils.formatUnits(referendum.refrendumTally.turnout)}\n`);
    
                //         }
                //         console.log(referendaList);
    
                //         let proposaList = "";
                //         if (elem.proposalList)
                //         {
                //             const proposalArray = JSON.parse(elem.proposalList)
                //             console.log(`|||||>>>> elem.proposalList ${typeof  proposalArray} : `,elem.proposalList);
    
                //         }
                //         console.log(`proposaList: `,proposaList);
                //         console.log(` ******************************************************************* `);
    
                //     })
                // }
    
    
                return activeProposalsReferendaLists_dataArray;
                // return {voteds_dataArray, preImageNoteds_dataArray, proposeds_dataArray, secondeds_dataArray, tableds_dataArray, passeds_dataArray, notPasseds_dataArray, activeProposalsReferendaLists_dataArray};
                // return {voteds_dataArray, preImageNoteds_dataArray, proposeds_dataArray, secondeds_dataArray, tableds_dataArray, passeds_dataArray, notPasseds_dataArray, removeVoteCalls_dataArray, unlockCalls_dataArray, activeProposalsReferendaLists_dataArray};
    
        });
    };
    //#endregion sendGraphQLRequestFromNum




    // //#region PUSH NOTIFICATIONS SET UP PERMISSIONS AND GET DEVICE TOKEN
    // useEffect(() => {
    //     // sendGraphQLRequestFromNum();

    //     // setInterval( () => {
    //     //     console.log(`*** Willl Run Queries ***`);
    //     //     sendGraphQLRequestFromNum();
    //     // },20000);
        
    // },[])
    // //#endregion

    
    //#region Read Governance Precompile
    // const getTokensDepositedFroProposal = async (proposalIndexNum) => {
    //     if (scGov)
    //     {
    //       const tokensWEI= await scGov.depositOf(parseInt(proposalIndexNum));
    //       console.log(` *****> tokensWEI.toString(): ${tokensWEI.toString()} `);
    //       const tokens_DEV = ethers.utils.formatUnits(tokensWEI,18);
    //       console.log(`tokens in DEV: ${tokens_DEV}`)
    //       setProposalTokens(tokens_DEV);
    //     }
    //     else console.log(`****** getTokensDepositedFroProposal is run but scGov does not exist *******`);
  
    // }
    
    // const getLowestUnbaked = async () => {
    //     if (scGov)
    //     {
    //       const _lowestUnbaked= await scGov.lowestUnbaked();
    //       console.log(` *****> _lowestUnbaked: ${_lowestUnbaked} `);
    //       setLowestUnbaked(_lowestUnbaked.toString());
    //     }
    //     else console.log(`****** getLowestUnbaked is run but scGov does not exist *******`);
    // }
  
    // const getNumOfProposals = async () => {
    //     if (scGov)
    //     {
    //       const _numOfProposals= await scGov.publicPropCount();
    //       console.log(` *****> _numOfProposals: ${_numOfProposals} `);
    //       setNumOfProposals(_numOfProposals.toString());
    //     }
    //     else console.log(`****** getNumOfProposals is run but scGov does not exist *******`);
    // }
    //#endregion Read Governance Precompile

    // const second = async (propIndex, secondsUpperBound=100) => {
    //     if (scGov)
    //     {
    //       //TODO propIndex is a valid Index
    //       const proposalAmount = await getTokensDepositedFroProposal(propIndex);
    //       //TODO THE WALLET HAS ENOUGH TOKENS TO SECOND THIS
          
    //       const tx = await scGov.second(propIndex, secondsUpperBound);
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx to second a proposal is mined resolveMsg : `,reslveMsg);
    //       });
  
    //     }
    //     else console.log(`****** second is run but scGov does not exist *******`);
    // }
  
    // const standardVote = async (refIndex, isAye, amount, convictionNum = 0 ) => {
    //     if (scGov)
    //     {
    //       const amountWEI = ethers.utils.parseUnits(amount,18);
    //       const tx = await scGov.standardVote(refIndex, isAye, amountWEI, convictionNum) ;
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx to standardVote a proposal is mined resolveMsg : `,reslveMsg);
    //       });
  
    //     }
    //     else console.log(`****** standardVote is run but scGov does not exist *******`);
    // }


    // const propose = async (proposalHash, amount) => {
    //     if (scGov)
    //     {
    //       const amountWEI = ethers.utils.parseUnits(amount,18);
    //       const tx = await scGov.propose(proposalHash, amountWEI);
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx to propose a proposal is mined resolveMsg : `,reslveMsg);
    //       });
  
    //     }
    //     else console.log(`****** propose is run but scGov does not exist *******`);
    // }
  
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


    // const delegate = async (_representativeAddress, convictionNum, amount) => {
    //     if (scGov)
    //     {
    //       const amountWEI = ethers.utils.parseUnits(amount,18);
    //       console.log(`_representativeAddress: ${_representativeAddress} convictionNum: ${convictionNum} amountWEI: ${amountWEI}`);
    //       const tx = await scGov.delegate(_representativeAddress, convictionNum, amountWEI);
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx to delegate a votie to ${_representativeAddress} is mined resolveMsg : `,reslveMsg);
    //       });
  
    //     }
    //     else console.log(`****** delegate is run but scGov does not exist *******`);
    // }
  
    // const unDelegate = async () => {
    //     if (scGov)
    //     {
    //       const tx = await scGov.unDelegate();
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx to unDelegate is mined resolveMsg : `,reslveMsg);
    //       });
  
    //     }
    //     else console.log(`****** unDelegate is run but scGov does not exist *******`);
    // }


    // const unlock = async (_targetAddress) => {
    //     if (scGov)
    //     {
    //       const tx = await scGov.unlock(_targetAddress);
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx to unlock from ${_targetAddress} is mined resolveMsg : `,reslveMsg);
    //       });
  
    //     }
    //     else console.log(`****** unlock is run but scGov does not exist *******`);
    // }
  
    // const notePreimage = async (_encodedProposal) => {
    //     if (scGov)
    //     {
    //       const tx = await scGov.notePreimage(_encodedProposal);
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx to notePreimage is mined resolveMsg : `,reslveMsg);
    //       });
  
    //     }
    //     else console.log(`****** notePreimage is run but scGov does not exist *******`);
    // }


    // const noteImminentPreimage = async (_encodedProposal) => {
    //     if (scGov)
    //     {
    //       const tx = await scGov.noteImminentPreimage(_encodedProposal);
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx to noteImminentPreimage is mined resolveMsg : `,reslveMsg);
    //       });
  
    //     }
    //     else console.log(`****** noteImminentPreimage is run but scGov does not exist *******`);
    // }
  
      


    // //TEST
    // const getSCNumber = async () => {
    //     if (scComs)
    //     {
    //       const ang_number2 = (await scComs.retrieve()).toString();
    //       console.log(` *****> ang_number2: ${ang_number2} `);
    //       setScNumber(ang_number2)
    //     }
    //     else console.log(`****** getSCNumber is run but scComs does not exist *******`);

    // }
    // const setSCNumber = async (newNum) => {
    //     if (scComs)
    //     {
    //       const tx = await scComs.store(newNum);
    //       tx.wait().then( async reslveMsg => {
    //         console.log(`tx for transfer is mined resolveMsg : `,reslveMsg);
    //       });

    //     }
    //     else console.log(`****** setSCNumber is run but scComs does not exist *******`);

    


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
    // //This part sends a Push notirfication and normally would be inside a server
    // const sendPushNotificationHandler = () => {
    //     fetch('https://exp.host/--/api/v2/push/send',{
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //         to: "ExponentPushToken[pM5T3fG_V66hoJMZvn7VJO]",
    //         title: 'Test sent from iPhone',
    //         body: 'This is a test that was sent from an iPhone to my Adnroid phone. Has it worked?'
    //         })
    //     }
    //     )
    // }
    //#endregion NTT54
        
    

    
    // const { remainder, usersLimit } = useMemo(() => {
    //     const limitInt = parseInt(limit);
    //     let remainder = 0;
    //     let usersLimit = members;
    //     if (limitInt != NaN && limitInt != 0) {
    //         remainder = members.length - limitInt;
    //         usersLimit = members.slice(0, limitInt);
    //     }

    //     return {
    //         remainder,
    //         usersLimit,
    //     };
    // }, [members, limit]);

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


   


    // <Text style={styles.textStyle}>#{referendaArray[0].referendumIndex} </Text>


    return (
        <View>
         {/* <WalletConnectExperience /> */}

         {
            referendaArray.length===0 ?
            <Text style={styles.textStyle}>Loading123 </Text> :
            <FlatList 
                    keyExtractor={(item) => item.referendum_Index}
                    data={referendaArray} 
                    renderItem={({item, index}) => {
                        return  (
                        // <Text style={styles.textStyle}>#{item.referendumIndex} </Text>

                        <TouchableOpacity  onPress={() => navigation.navigate("Referendum", { 
                             refIndex: item.referendum_Index, 
                             refBeneficiary: item.referendum_Beneficiary,
                             refTreasury: item.referendum_Treasury,
                             refAmount: tronWeb.fromSun(item.referendum_Amount),
                             refCID: item.referendum_CID,
                             refStartBlock: item.referendum_startBlock,
                             refEndBlock: item.referendum_endBlock,
                             refScoreBlock: item.referendum_scoreBlock,
                             refAyes: item.referendum_Ayes,
                             refNays: item.referendum_Nays,
                             refTrunout: item.referendum_Turnout,
                             refPassed: item.referendum_Passed,
                             description: `Referendum with ID  ${item.referendum_Index} \nwill end at block ${item.referendum_endBlock} and the scoring block is ${ item.referendum_scoreBlock}.`,

                            //  delay: "item.refrendumDelay", refrendumEndBlock: "item.referendum_endBlock", refrendumProposalHash: "item.refrendumProposalHash", refrendumTallyAye: "item.refrendumTally.ayes", 
                            //  refrendumTallyNay: "item.refrendumTally.nays", refrendumTallyTurnout: "item.refrendumTally.turnout",
                        }
                        )} >

                        <View style={[styles.contain, style, { backgroundColor: colors.card }]}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                                        <Text title3 numberOfLines={1}>
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
                                        paddingBottom: 10,
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
                                <View
                                    style={{ flexDirection: "row",  alignItems: "center", paddingBottom: 20, }} >
                                    <Icon name="tasks" size={14} color={colors.text} />
                                    <Text caption1 style={{  paddingLeft: 5, paddingRight: 20, }} >
                                        {tasks} {"tasks"}
                                    </Text>
                
                                    <Icon solid name="comment" size={14} color={colors.text} />
                                    <Text caption1 style={{ paddingHorizontal: 5, }} >
                                        {comments} {"comments"}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 20, }} >
                                    <Text caption2 light>
                                        {`Referendum with ID ${item.referendum_Index} \nwill end at block ${item.referendum_endBlock}  and the scoring block is ${ item.referendum_scoreBlock}.`}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 20, }} >
                                    <Text caption2 light>
                                        {`Referendum with IPFS CID ${item.referendum_CID} \n has the following TITLE: and DESCRIPTION \n`}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 20, }} >
                                    <Text caption2 light>
                                        {`Title:  ${"Funding for promoting Tron ecosystem to the UK market"}`}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 20, }} >
                                    <Text caption2 light>
                                        {`Description:  ${"Wtih this referendum we apply requesting 1000000 to promote the Tron ecosystem to the UK market \nMore precisely we will organise a conference in London, Edinburgh, Glasgow, Manchester with promotional material and speeches of startups in the ecosystem explaining the differences of Tron and advantages compare to toehr blockchains"}`}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 20, }} >
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 0, paddingBottom: 5, justifyContent: "space-between", }} >
                                        <Text overline>
                                            {("Vote Progress")} {`Beneficiary: ${item.referendum_Beneficiary} Treasury: ${item.referendum_Treasury} Amount: ${item.referendum_Amount}`}
                                        </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 0, paddingBottom: 5, justifyContent: "space-between", }} >
                                    <Text overline>
                                        {("Vote Progress")} {`AYES: ${item.referendum_Ayes} NAYS: ${item.referendum_Nays} TURNOUT: ${item.referendum_Turnout} State:${item.referendum_Passed}`}
                                    </Text>
                                </View>
                                <ProgressBar style={{ flex: 1, paddingRight: 20 }} color={BaseColor.accentColor} percent={`${item.referendum_ProgressBarPercent}`} />
                            </View>
                        </View>
                       </TouchableOpacity>
                        )
                    }}
            /> 
        }
                   
       

                  
        </View>
    );
};

ReferendaScreen.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOption: PropTypes.func,
};

// export default Project01;
export default ReferendaScreen;

