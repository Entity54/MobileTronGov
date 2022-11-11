import React, {useEffect} from 'react';
// import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, View, Button, TouchableOpacity,  Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';


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





// const HomeScreen = (props) => {
const HomeScreen = ({navigation}) => {
  // console.log(props);
  // console.log(props.navigate);

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
  //#endregion

  return (
      <View>
        <Text style={styles.text}>Hello Angelos</Text>

        <Button title="Schedule Local Notification" onPress={angScheduleNotificationHanlder} />
        <Button title="Send Push Notification" onPress={sendPushNotificationHandler} />

        <Button 
          title="Go to Component Demo" 
          // onPress={() => console.log("Button pressed") }
          // onPress={() => props.navigation.navigate("Components")}
          onPress={() => navigation.navigate("Components")}
        />   

        {/* <StatusBar style='auto' /> */}

        <Button 
          title="Go to List Demo" 
          // onPress={() => console.log("Button pressed") }
          onPress={() => navigation.navigate("List")}
        />   

        {/* <TouchableOpacity onPress={() => console.log("List pressed") } > */}
        <TouchableOpacity onPress={() => navigation.navigate("List") } >
          <Text>Go to List Demo</Text>
        </TouchableOpacity>

        <Button 
          title="Go to Image Screen" 
          // onPress={() => console.log("Button pressed") }
          onPress={() => navigation.navigate("Image")}
        />   

        <Button 
          title="Go to Color Screen" 
          // onPress={() => console.log("Button pressed") }
          onPress={() => navigation.navigate("Color")}
        />   

      <Button
        title="Go to Square Demo"
        onPress={() => navigation.navigate("Square")}
      />

      <Button
        title="Go to Text Demo"
        onPress={() => navigation.navigate("Text")}
      />

      <Button
        title="Go to Box Demo"
        onPress={() => navigation.navigate('Box')}
      />

      </View>
  ) 
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;



