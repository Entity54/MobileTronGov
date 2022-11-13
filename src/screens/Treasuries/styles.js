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
        marginTop:20,
        alignItems: "center",

    },
    input: {
        height: 40,
        width: "33%",
        margin: 0,
        // marginLeft: "auto",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor:"white"
    },
    inputTitle: {
        height: 40,
        width: "60%",
        margin: 0,
        // marginLeft: "auto",
        marginRight:20,
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
        margin:10,
        marginHorizontal: 80,

    },
    buttonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

});
