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
    contain: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    input: {
        height: 50,
        width: 120,
        marginLeft: 20,
        marginRight: 15,
        marginTop: 15,
        // marginLeft: "auto",
        borderWidth: 1,
        padding: 10,
        backgroundColor:"white",
        borderRadius: 5
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
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

});
