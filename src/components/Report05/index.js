// import Icon from "@components/Icon";
import Icon from "../Icon";

// import Text from "@components/Text";
// import { useTheme, BaseColor } from "@config";
import { BaseColor } from "../../config/theme";

import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
import { parseHexTransparency } from "@utils";



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


const CardReport05 = ({
    title = "",
    price = "",
    price2 = "",
    icon = "",
    style = {},
    onPress = () => {},
    disabled = false
}) => {
    // const { colors } = useTheme();

    return (
        <TouchableOpacity
            disabled={disabled}
            style={styles.container}
            onPress={onPress}
        >
            <View
                style={[
                    styles.content,
                    {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                    },
                    style,
                ]}
            >
                {/* <View style={[styles.header]}>
                    <View
                        style={[
                            styles.viewIcon,
                            {
                                backgroundColor: parseHexTransparency(
                                    BaseColor.blueColor,
                                    30
                                ),
                            },
                        ]}
                    >
                        <Icon
                            name={icon}
                            size={12}
                            style={{ color: BaseColor.blackColor }}
                            solid
                        />
                    </View>
                </View> */}
                <View style={[styles.header]}>
                    <Text headline style={{ textAlign: "center", fontWeight:"bold" }}>
                        {title}
                    </Text>
                </View >

                <Text headline style={{ textAlign: "center", width: "100%", marginTop: 5 }}>
                    {price}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

CardReport05.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    price: PropTypes.string,
    price2: PropTypes.string,
    icon: PropTypes.string,
};

export default CardReport05;
