// import Text from "@components/Text";
// import { useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { View, Text } from "react-native";


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

  
const SpecGrid = ({ style, description, title, renderTitle = null }) => {
    // const { colors } = useTheme();
    return (
        <View style={style}>
            <Text caption1 grayColor>
                {description}
            </Text>
            {renderTitle ? (
                renderTitle()
            ) : (
                <Text body1 style={{ marginTop: 4 }}>
                    {title}
                </Text>
            )}
        </View>
    );
};

SpecGrid.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    description: PropTypes.string,
    title: PropTypes.any,
    renderTitle: PropTypes.func,
};

SpecGrid.defaultProps = {
    style: {},
    title: "",
    description: "",
    renderTitle: null
};

export default SpecGrid;
