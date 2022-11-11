import { StyleSheet } from "react-native";
import { BaseColor } from "../../config/theme";


export default StyleSheet.create({
    contain: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    container: {
        flexDirection: "row",
        marginHorizontal: 20,
        paddingHorizontal: 10,
        justifyContent:"space-between",

    },
    button: {
        width: "40%",
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
