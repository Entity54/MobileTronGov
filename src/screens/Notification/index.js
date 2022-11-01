// import { Header, Icon, ListThumbCircle, SafeAreaView } from "@components";
// import { BaseColor, BaseStyle, useTheme } from "@config";
// Load sample data
// import { NotificationData } from "@data";
import React, { useState } from "react";
import { FlatList, RefreshControl, Header } from "react-native";
// import { useTranslation } from "react-i18next";
// import Icon from "../../components/Icon";

import { BaseColor } from "../../config/theme";
import { SafeAreaView } from "react-native-safe-area-context";

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


// import { Images } from "@config";

const NotificationData = [
  {
    id: "0",
    title: "Obasey Chidy",
    description: "Its time to build a difference ...",
    // image: Images.avata1,
    date: "Dec 11, 2018",
  },
  {
    id: "1",
    title: "Steve Garrett",
    description: "Its time to build a difference ...",
    // image: Images.avata2,
    date: "Dec 11, 2018",
  },
  {
    id: "2",
    title: "Luvleen Lawrence",
    description: "Its time to build a difference ...",
    // image: Images.avata3,
    date: "Dec 11, 2018",
  },
  {
    id: "3",
    title: "Tom Hardy",
    description: "Its time to build a difference ...",
    // image: Images.avata4,
    date: "Dec 11, 2019",
  },
];




const Notification = (props) => {
//   const { navigation } = props;
//   const { t } = useTranslation();
//   const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState(NotificationData);

  return (
      <SafeAreaView
        //   style={BaseStyle.safeAreaView}
          edges={["right", "top", "left"]}
      >
          {/* <Header
              title={"Notifications"}
              renderLeft={() => {
                  return (
                      <Icon
                          name="angle-left"
                          size={20}
                          color={colors.primary}
                          enableRTL={true}
                      />
                  );
              }}
              onPressLeft={() => {
                  navigation.goBack();
              }}
          /> */}
          <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              refreshControl={
                  <RefreshControl
                      colors={[colors.primary]}
                      tintColor={colors.primary}
                      refreshing={refreshing}
                      onRefresh={() => {}}
                  />
              }
              data={notification}
              keyExtractor={(item, index) => item.id}
            //   renderItem={({ item, index }) => (
            //       <ListThumbCircle
            //           image={item.image}
            //           txtLeftTitle={item.title}
            //           txtContent={item.description}
            //           txtRight={item.date}
            //       />
            //     <Text>{"ToDo"}</Text>
            //   )}
          />
      </SafeAreaView>
  );
};

export default Notification;
