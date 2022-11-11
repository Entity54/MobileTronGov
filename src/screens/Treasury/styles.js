import { StyleSheet } from "react-native";
// import { BaseColor } from "@config";
import { BaseColor } from "../../config/theme";


export default StyleSheet.create({
    contain: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    container: {
        flexDirection: "row",
        marginHorizontal: 20,
        paddingHorizontal: 10,
        // alignItems: "center",
        justifyContent:"space-between",

    },
    button: {
        // alignItems: "center",
        width: "40%",
        // marginLeft: "auto",
        borderRadius: 10,
        backgroundColor: "#ff0000",
        padding: 10,
        marginBottom:0
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
});
