import React from "react";
import { View, Text } from "react-native";
import CircularProgress from "./CircularProgress";
// import Text from "@components/Text";
// import { useTheme, BaseColor } from "@config";
import { BaseColor } from "../../../config/theme";


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



const ProgressCircle = ({
    percent = 0,
    size = 60,
    borderWidth = 5,
    blankColor = "",
    donutColor = "",
    fillColor = "",
    style = {}
}) => {
    // const { colors } = useTheme();
    return (
        <View style={style}>
            <CircularProgress
                percentage={percent}
                progressWidth={size / 2 - borderWidth}
                size={size}
                blankColor={BaseColor.text}
                donutColor={colors.primaryLight}
                fillColor={colors.background}
                // blankColor={blankColor || BaseColor.text}
                // donutColor={donutColor || colors.primaryLight}
                // fillColor={fillColor || colors.dividerColor}
            >
                <Text headline>{percent}%</Text>
            </CircularProgress>
        </View>
    );
};

export default ProgressCircle;
