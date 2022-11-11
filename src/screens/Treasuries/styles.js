import { StyleSheet } from "react-native";

export default StyleSheet.create({
    contain: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    container: {
        flexDirection: "row",
        marginHorizontal: 40,
        paddingHorizontal: 10,
        alignItems: "center",

    },
    input: {
        height: 40,
        width: "40%",
        margin: 12,
        marginLeft: "auto",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor:"white"
    },
    button: {
        alignItems: "center",
        width: "auto",
        borderRadius: 10,
        backgroundColor: "#ff0000",
        padding: 10,
        marginBottom:0
    },
    buttonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

});
