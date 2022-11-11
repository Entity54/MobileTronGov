import 'react-native-get-random-values'
import React, {useEffect } from 'react';
import { StyleSheet } from "react-native";
import { store } from "./src/store";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Font from "expo-font";
import { BaseSetting } from "@config";
import { Provider } from "react-redux";
import { GovProvider } from "./src/context/GovContext";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

import ReferendaScreen from "./src/screens/Referenda/ReferendaScreen";
import ReferendumScreen from "./src/screens/ReferendumView/ReferendumScreen";
import ProposalsScreen from "./src/screens/Proposals/ProposalsScreen";
import ProposalScreen from "./src/screens/Proposal/ProposalScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import TreasuriesScreen from "./src/screens/Treasuries/TreasuriesScreen";
import TreasuryScreen from "./src/screens/Treasury/TreasuryScreen";
import AccountScreen from "./src/screens/AccountScreen";


//#region Screens Navigators
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
    </ProposalsStack.Navigator>
  )
}

const TreasuriesStack = createNativeStackNavigator();
const TreasuriesStackScreen = () => {
  return (
    <TreasuriesStack.Navigator>
      <TreasuriesStack.Screen name="Treasuries" component={TreasuriesScreen} />
      <TreasuriesStack.Screen name="Treasury Details" component={TreasuryScreen} />
    </TreasuriesStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();
//#endregion Screens Navigators



export default function App() {

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

  
  
    return (
      <Provider store={store}>
        <GovProvider>
  
            <NavigationContainer>
              <BottomTab.Navigator screenOptions={{
                  headerStyle: { backgroundColor: '#530D11'},
                  headerTintColor: 'white',
                  tabBarActiveTintColor: '#3c0a6b'
              }} >
  
                  <BottomTab.Screen name="Current" component={ReferendaStackScreen} options={{
                    tabBarIcon: ({color, size}) => ( 
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
      justifyContent: "center",
      height:50,
    },
  });
  
