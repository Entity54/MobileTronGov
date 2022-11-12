// import Icon from "@components/Icon";
import Icon from "../Icon";

// import Text from "@components/Text";
// import { useTheme, BaseColor } from "@config";
import { BaseColor } from "../../config/theme";

import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
// import { parseHexTransparency } from "@utils";
import { parseHexTransparency } from "../../utils";




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


const CardReport03 = ({
    title = "",
    subTitle = "",
    blocks = "",
    time = "",
    price = "",
    icon = "",
    percent = "",
    style = {},
    onPress = () => {},
    isUp = true,
    colorIcon = "",
    backgroundIcon = "",
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
                ]}
            >
                <View style={[styles.header]}>
                    <Text headline style={{ textAlign: "center", width: "100%"}}>
                        {title}
                    </Text>
                </View >
                <View style={styles.viewBottom}>
                    <Text footnote light style={{ marginTop: 10 }}>{time}</Text>
                    <Text footnote light style={{ marginTop: 10,}}>{blocks}</Text>
                </View>
                <View style={styles.viewBottom}>
                    <Text footnote>{price}</Text>
                    <Text footnote>{percent}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

CardReport03.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    blocks: PropTypes.string,
    time: PropTypes.string,
    price: PropTypes.string,
    icon: PropTypes.string,
    subTitle: PropTypes.string,
    percent: PropTypes.string,
};

export default CardReport03;
