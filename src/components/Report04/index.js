// import Icon from "@components/Icon";
import Icon from "../Icon";

// import Text from "@components/Text";
// import { useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
// import { parseHexTransparency } from "@utils";

// import ProgressCircle from "@components/Progress/Circle";
import ProgressCircle from "../Progress/Circle";



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



const CardReport04 = ({
    title = "",
    title2 = "",
    price = "",
    icon = "",
    style = {},
    aye = "",
    ayeamount = "",
    nayamount = "",
    nay = "",
    percent1 = "100%",
    percent2 = "50%",
    percent = "",
    description = "",
    contentStyle = {},
    onPress = () => {},
    disabled = false
}) => {
    // const { colors } = useTheme();

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.container, style]}
            onPress={onPress}
        >
            <View
                style={[
                    styles.content,
                    {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                    },
                    contentStyle,
                ]}
            >
                <View style={[styles.header]}>
                    <Text headline style={{ textAlign: "center", width: "100%"}}>
                        {title}
                    </Text>
                </View >
                <Text caption light style={{ marginTop: 10 }}>
                    {aye}
                    <Text caption light style={{ marginTop: 5 }}>
                    {ayeamount}
                    </Text>
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: colors.primary,
                        marginTop: 5,
                        width: `${percent1}%`,
                    }}
                />
                    <Text caption light style={{ marginTop: 10 }}>
                        {nay}
                    
                        <Text caption light style={{ marginTop: 10 }}>
                            {nayamount}
                        </Text>
                    </Text>
                <View
                    style={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: colors.accent,
                        marginTop: 5,
                        width:`${percent2}%`,
                    }}
                />
                <Text headline style={{ marginTop: 15, textAlign: "center", width: "100%"}}>
                    {title2}
                </Text>
                <View style={styles.viewProgress}>
                    <ProgressCircle
                        style={{ marginTop: 10, alignItems: "center", width: "100%"}}
                        percent={percent}
                    />
                </View>
            </View>

        </TouchableOpacity>
    );
};

CardReport04.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    title2: PropTypes.string,
    price: PropTypes.string,
    icon: PropTypes.string,
    aye: PropTypes.string,
    ayeamount: PropTypes.string,
    nay: PropTypes.string,
    nayamount: PropTypes.string,
    percent1: PropTypes.string,
    percent2: PropTypes.string,
    percent: PropTypes.string,
    description: PropTypes.string,
    contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CardReport04;
