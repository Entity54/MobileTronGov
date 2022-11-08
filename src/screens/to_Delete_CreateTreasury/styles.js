import { StyleSheet } from "react-native";
// import { BaseColor } from "@config";
import { BaseColor } from "../../config/theme";


export default StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 0,
    },
    specifications: {
        marginVertical: 0,   //10
        flexDirection: "row",
        alignItems: "center",
    },
    wrapContent: {
        flexWrap: "wrap",
        flexDirection: "row",
        borderColor: BaseColor.dividerColor,
        marginBottom: 20,
    },
});
