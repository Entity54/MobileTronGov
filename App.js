//#region OLD TO BE DELETED

// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import HomeScreen from "./src/screens/HomeScreen";
// import ComponentsScreen from "./src/screens/ComponentsScreen";
// import ListScreen from "./src/screens/ListScreen";
// import ImageScreen from "./src/screens/ImageScreen";
// import ColorScreen from "./src/screens/ColorScreen";
// import SquareScreen from "./src/screens/SquareScreen";
// import TextScreen from "./src/screens/TextScreen";
// import BoxScreen from './src/screens/BoxScreen';


// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Components: ComponentsScreen,
//     List: ListScreen,
//     Image: ImageScreen,
//     Color: ColorScreen,
//     Square: SquareScreen,
//     Text: TextScreen,
//     Box: BoxScreen,
//   },
//   {
//     initialRouteName: "Home", 
//     defaultNavigationOptions: {
//       title: "App1",
//     },
//   }
// );

// export default createAppContainer(navigator);
//#endregion OLD TO BE DELETED
import 'react-native-get-random-values'

// ******* Tron *******
// import createKeccakHash from 'keccak';
// import TronWeb from 'tronweb/dist/TronWeb.js';
// import TronWeb from 'tronweb';
// const TronWeb = require('tronweb')


import React, {useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Platform } from "react-native";

// import { persistor, store } from "./src/store";
import { store } from "./src/store";


import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import * as Font from "expo-font";
import { BaseSetting, useTheme } from "@config";
// import { useDispatch, useSelector } from "react-redux";





import { Provider } from "react-redux";

import { GovProvider } from "./src/context/GovContext";

import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import Icon from "./src/components/Icon";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

// import SquareScreen from "./src/screens/SquareScreen";

import ReferendaScreen from "./src/screens/Referenda/ReferendaScreen";

// import ReferendumScreen from "./src/screens/PProjectView/ReferendumScreen";
import ReferendumScreen from "./src/screens/ReferendumView/ReferendumScreen";


import ProposalsScreen from "./src/screens/Proposals/ProposalsScreen";
import ProposalScreen from "./src/screens/Proposal/ProposalScreen";

import HistoryScreen from "./src/screens/HistoryScreen";

import TreasuriesScreen from "./src/screens/Treasuries/TreasuriesScreen";
import TreasuryScreen from "./src/screens/Treasury/TreasuryScreen";


// import NotificationScreen from "./src/screens/Notification";

import AccountScreen from "./src/screens/AccountScreen";


//#region Screens NAvigators
const ReferendaStack = createNativeStackNavigator();
const ReferendaStackScreen = () => {
  return (
    <ReferendaStack.Navigator>
      <ReferendaStack.Screen name="Referenda" component={ReferendaScreen} />
      <ReferendaStack.Screen name="Referendum" component={ReferendumScreen} />
    </ReferendaStack.Navigator>
  )
}

const ProposalsStack = createNativeStackNavigator();
const ProposalsStackScreen = () => {
  return (
    <ProposalsStack.Navigator>
      <ProposalsStack.Screen name="Pending" component={ProposalsScreen} />
      <ProposalsStack.Screen name="Create New Referendum" component={ProposalScreen} />

      {/* <ProposalsStack.Screen name="Proposals" component={ProposalsScreen} /> */}
      {/* <ProposalsStack.Screen name="Proposal" component={ProposalScreen} /> */}
      {/* <ReferendaStack.Screen name="Referenda" component={ReferendaScreen} /> */}
    </ProposalsStack.Navigator>
  )
}

const TreasuriesStack = createNativeStackNavigator();
const TreasuriesStackScreen = () => {
  return (
    <TreasuriesStack.Navigator>
      <TreasuriesStack.Screen name="Active" component={TreasuriesScreen} />
      <TreasuriesStack.Screen name="Treasury Details" component={TreasuryScreen} />
      {/* <TreasuriesStack.Screen name="Treasuries" component={TreasuriesScreen} /> */}

    </TreasuriesStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();
//#endregion Screens NAvigators



// ******* Tron *******
//Smart Contracts
// import Library_raw from './src/Abis/Library.json';     
// const library_ABI = Library_raw.abi;
// const libraryContractAddress = 'TFP7zZiz9NFKxoXUCGLG7tXfHT5GzqZnyC' // Paste Contract address here
// const sc_channels  =  new ethers.Contract( SC_NTT54_CHANNELS_ADDRESS  , channels_raw.abi , newSigner);

// ****************************************************************************
// import TronGovernance_raw from './src/Abis/tronGovernance.json';     
// const tronGovernance_ABI = TronGovernance_raw.abi;
// const tronGovernanceContractAddress = "TBHLsbmX2mhSyWjXdh1fciCmHNbXHca8Yy";
// let tronGovernanceContract;

// ****************************************************************************
// let account = null;
// let libraryContract;
// let bookRentContract = null





export default function App() {
  // export default () => {
    

    useEffect(() => {
      const loadFonts = async () => {
        await Font.loadAsync(BaseSetting.resourcesFont);
        let language;

        // // const languageCode = language ?? BaseSetting.defaultLanguage;
        // const languageCode = BaseSetting.defaultLanguage;


        // await i18n.use(initReactI18next).init({
        //   resources: BaseSetting.resourcesLanguage,
        //   lng: languageCode,
        //   fallbackLng: languageCode,
        // });
        
      }   
      loadFonts();     

    },[]);


    //#region TRON    
    // const [tronWeb_server, setTronWeb_server]   = useState();
    // const [tronWalletConnected, setTronWalletConnected]   = useState(false);
    
    
        // //Source: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md
        // const toChecksumAddress = (address) => {
        //   address = address.toLowerCase().replace('0x', '')
        //   var hash = createKeccakHash('keccak256').update(address).digest('hex')
        //   var ret = '0x'
        
        //   for (var i = 0; i < address.length; i++) {
        //     if (parseInt(hash[i], 16) >= 8) {
        //       ret += address[i].toUpperCase()
        //     } else {
        //       ret += address[i]
        //     }
        //   }
        
        //   return ret
        // }
        // const convertAddress_TronToEthereum = (tronAddress="TA9h822trLafTtsGXQc4g4ehPvyNzkQNsS") => {
        //   const TronAddressinHEX = window.tronWeb.address.toHex(tronAddress);
        //   const adressWithout41 = TronAddressinHEX.substring(2);
        //   const adressPluszerox = "0x"+adressWithout41;
        //   const solidityAddress = toChecksumAddress(adressPluszerox);
        //   // console.log(`TronAddressinHEX: ${TronAddressinHEX}  adressWithout41: ${adressWithout41} adressPluszerox: ${adressPluszerox} solidityAddress: ${solidityAddress}`);
        //   return solidityAddress;
        // }
    
        // const convertAddress_EthereumToTron = (solidityAddress="0x01fbA20CB405734C6B2e704B9eD67C0b5ea74D9E") => {
        //   const tronHExAddress= solidityAddress.replace("0x","41");
        //   const tronAddressFromHEX = window.tronWeb.address.fromHex(tronHExAddress);
        //   //expect TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL
        //   // console.log(`tronHExAddress: ${tronHExAddress} tronAddressFromHEX: `,tronAddressFromHEX);
        //   return  tronAddressFromHEX;
        // }
        // const getTronWeb = () => {
        //   // Obtain the tronweb object injected by tronLink 
        //   var obj = setInterval(async ()=>{
        //     if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        //         clearInterval(obj)
        //         console.log("tronWeb successfully detected!");
    
        //         setTronWalletConnected(true);
        //         // setTronWeb(window.tronWeb);
        //     }
        //   }, 10)
        // }
    
        // const setLibraryContract = async () => {
        //   // TODO: abtain contract Object
        //   bookRentContract = await window.tronWeb.contract().at(libraryContractAddress);
        // }
    
        // const postBookInfo = async (name, description, price) => {
        //   // feeLimit:100_000_000,
        //   const result = await bookRentContract.addBook(name,description,price).send({
        //     feeLimit:100000000,
        //     callValue:0,
        //     shouldPollResponse:true
        //   });
        
        //   alert('Book Posted Successfully')
        // }
    
        // const borrowBook = async (spaceId, checkInDate, checkOutDate, totalPrice) => {
        //   // TODO: call borrowBook func of library contract
         
        //   const result = await bookRentContract.borrowBook(spaceId,checkInDate,checkOutDate).send({
        //     feeLimit:100_000_000,
        //     callValue:totalPrice,
        //     shouldPollResponse:true
        //   });
        
        //   alert('Property Booked Successfully')
        // }
    
        // const fetchAllBooks = async () => {
        //   const books = [];
        
        //   const bookId  = await bookRentContract.bookId().call();
        //   for (let i = 0; i < bookId; i++){
        //     const book = await bookRentContract.books(i).call()
        //     if(book.name!="") // filter the deleted books
        //     {
        //       books.push(
        //         {id: i,name: book.name,description: book.description,price: tronWeb_server.fromSun(book.price)}
        //       )
        //     }
            
        //   }
        //   return books
        // }
    
    // useEffect(() => {
      //   getTronWeb();
      // },[]);
      
    // useEffect(() => {
        
    //   const initiateTron = async () => {
    //     // //TESTING Address Conversions
    //     // const resultCheckSumAddress = toChecksumAddress('0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359');
    //     // console.log(`*** resultCheckSumAddress *** : ${resultCheckSumAddress}`); //0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359
    //     // const TronAddress = "TVm22VuHmhxAuxN9f1LfpmrJTWS8aAYG9R";
    //     // const ethereum_Tronaddress = convertAddress_TronToEthereum(TronAddress);  
    //     // const tron_Ethereumaddress = convertAddress_EthereumToTron(ethereum_Tronaddress);
    //     // console.log(`TronAddress: ${TronAddress} ethereum_Tronaddress: ${ethereum_Tronaddress} tron_Ethereumaddress: ${tron_Ethereumaddress}`);
        
        
    //     // ***** THE SECTION BELOW IS FOR THE SERVER TO BE RUN ***** START //
    //     console.log(`Setting Up HttpProvider`);
    //     const HttpProvider = TronWeb.providers.HttpProvider;
    //     const fullNode = new HttpProvider("https://api.nileex.io");
    //     const solidityNode = new HttpProvider("https://api.nileex.io");
    //     const eventServer = new HttpProvider("https://api.nileex.io");
    //     console.log(`Setting Up privateKey`);
    //     //SERVER public key = "TCWNqQsbojjsey8jTEJgsC2RiPGyRzA5GA"
    //     //SERVER private key = "bb4a09b98dfa5e263011c4023a2075c16c0a0ef961d32e7f28bd1eb1d4ad377b"
    //     const privateKey = "bb4a09b98dfa5e263011c4023a2075c16c0a0ef961d32e7f28bd1eb1d4ad377b";
        
    //     console.log(`Setting Up fullHost`);
    //     setTronWeb_server(new TronWeb(fullNode,solidityNode,eventServer,privateKey));
    //     // tronWeb_server = new TronWeb(fullNode,solidityNode,eventServer,privateKey);
    //     // tronWeb.setHeader({"TRON-PRO-API-KEY": 'your api key'});
    //   }
      
    //   initiateTron();
    //   // if (tronWalletConnected) getBooks();
    // // },[tronWalletConnected]);
    // },[]);
  
  
    // useEffect(() => {
  
    //   const performTronWebActions = async () => {
        
    //     // bookRentContract = await tronWeb_server.contract().at(libraryContractAddress);
    //     //ALTERNATIVELY USING ABI
    //     // bookRentContract = await tronWeb_server.contract(library_ABI, libraryContractAddress);


    //     // const bookId  = await bookRentContract.bookId().call();
    //     // console.log(`||||>>>>>> bookId: ${bookId} `);
        
    //     // fetch all books
    //     // console.log("Begin to obtain the books information");
    //     // const books = await fetchAllBooks();
    //     // console.log("The total number of Books: "+ books.length);
    //     // console.log("Books: "+ JSON.stringify(books,null,"\t"));
  
    //     // //Add new Book
    //     // const price ="19.99";   //1200000     6 decimals
    //     // await postBookInfo("Hello Porsche World", "Descriiiibes a world with piece and serenity", tronWeb_server.toSun(price) );
        

    //     // const tronGovernance_ABI = TronGovernance_raw.abi;
    //     // const tronGovernanceContractAddress = "TBHLsbmX2mhSyWjXdh1fciCmHNbXHca8Yy";
    //     // const tronGovernanceContract = await tronWeb_server.contract().at(tronGovernanceContractAddress);

    //     tronGovernanceContract = await tronWeb_server.contract(tronGovernance_ABI, tronGovernanceContractAddress);
    //     const admin  = await tronGovernanceContract.admin().call();
    //     console.log(`||||>>>>>> tron Governance admin: ${admin} `);  //||||>>>>>> tron Governance admin: 41da7b7457b4e71796cee8a466a1a3a635fad45451 

    //     const activeReferendaIDarrayUint  = await tronGovernanceContract.getActiveReferenda().call();
    //     const activeReferendaIDarray = activeReferendaIDarrayUint.map(itm => `${itm}`);
    //     console.log(`activeReferendaIDarray: `,activeReferendaIDarray);

    //     const referendumDetails  = await tronGovernanceContract.referendumDetails(1).call();
    //     // console.log(`referendumDetails: `,referendumDetails);
    //     console.log(`referendumDetails=> Referendum_Id ${referendumDetails[0]}`);
    //     console.log(`referendumDetails=> Referendum_Beneficiary ${referendumDetails[1]}`);
    //     console.log(`referendumDetails=> Referendum_Treasury ${referendumDetails[2]}`);
    //     console.log(`referendumDetails=> Referendum_Amount ${referendumDetails[3]}`);
    //     console.log(`referendumDetails=> Referendum_CID ${referendumDetails[4]}`);

    //     console.log(`referendumDetails=> Referendum_startBlock ${referendumDetails[5]}`);
    //     console.log(`referendumDetails=> Referendum_endBlock ${referendumDetails[6]}`);
    //     console.log(`referendumDetails=> Referendum_ScoreBlock ${referendumDetails[7]}`);
    //     console.log(`referendumDetails=> Referendum_Ayes ${referendumDetails[8]}`);
    //     console.log(`referendumDetails=> Referendum_Nays ${referendumDetails[9]}`);
    //     console.log(`referendumDetails=> Referendum_Turnout ${referendumDetails[10]}`);
    //     console.log(`referendumDetails=> Referendum_Passed ${referendumDetails[11]}`); //false
    //   }
  
  
    //   if (tronWeb_server) {
    //     console.log(`==> tronWeb_server is now defined`);
    //     performTronWebActions();
    //   }
  
    // },[tronWeb_server]);
  
    //#endregion TRON
  
  
  
  
    return (
      // <Provider>
      <Provider store={store}>


      <GovProvider>
  
            <NavigationContainer>
              <BottomTab.Navigator screenOptions={{
                  headerStyle: { backgroundColor: '#3c0a6b'},
                  headerTintColor: 'white',
                  tabBarActiveTintColor: '#3c0a6b'
              }} >
  
                  <BottomTab.Screen name="Current" component={ReferendaStackScreen} options={{
                    tabBarIcon: ({color, size}) => ( 
                    // <Ionicons name="poll" color={color} size={size} /> 
                    <FontAwesome5 name="vote-yea" size={24} color={color} />
                    ),
                  }}
                  />
                  <BottomTab.Screen name="Queued" component={ProposalsStackScreen} options={{
                    tabBarIcon: ({color, size}) => ( 
                    <FontAwesome5 name="pause-circle" size={24} color={color} />
                    ),
                  }}
                  />
                  <BottomTab.Screen name="Historical" component={HistoryScreen} options={{
                    tabBarIcon: ({color, size}) => ( 
                    <FontAwesome5 name="history" size={24} color={color} />
                    ),
                  }}
                  />


                  <BottomTab.Screen name="Treasuries" component={TreasuriesStackScreen} options={{
                    tabBarIcon: ({color, size}) => ( 
                      <FontAwesome5 name="piggy-bank" size={24} color={color} />
                    ),
                  }}
                  />
  
                  {/* <BottomTab.Screen name="Treasuries" component={TreasuriesScreen} options={{
                    tabBarIcon: ({color, size}) => ( 
                      <FontAwesome5 name="piggy-bank" size={24} color={color} />

                    <View>
                        <FontAwesome5 name="piggy-bank" size={24} color={color} />
                        <View
                            style={{ borderWidth: 1,  borderColor: "white", justifyContent: "center",  alignItems: "center", position: "absolute",  width: 20, right: -12, borderRadius: 10, }}
                        >
                            <Text  style={{color:"white"}}  >
                                5
                            </Text>
                      </View>
                    </View>
  
                    ),
                  }}
                  /> */}
  
                  <BottomTab.Screen name="Account" component={AccountScreen} options={{
                    tabBarIcon: ({color, size}) => ( 
                    <FontAwesome name="user-circle" size={24} color={color} />
                    ),
                  }}
                  />
               
             </BottomTab.Navigator>
          </NavigationContainer>
  
        
      </GovProvider> 
      </Provider>

  
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "flex-end",
      justifyContent: "center",
      height:50,
    },
  });
  



 