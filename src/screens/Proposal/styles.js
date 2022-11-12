import { StyleSheet } from "react-native";
import { BaseColor } from "../../config/theme";


export default StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 0,
    },
    specifications: {
        marginVertical: 0,   
        flexDirection: "row",
        alignItems: "center",
    },
    wrapContent: {
        flexWrap: "wrap",
        flexDirection: "row",
        borderColor: BaseColor.dividerColor,
        marginBottom: 20,
    },
    title: {
        marginBottom: 0,
        marginLeft: 15,
        fontWeight:"700",
    },
    container: {
        flexDirection: "row",
        marginHorizontal: 15,
        paddingHorizontal: 10,
        alignItems: "center",

    },
    input: {
        height: 40,
        width: "100%",
        margin: 10,
        marginLeft: "auto",
        marginTop:5,
        borderWidth: 1,
        backgroundColor:"white",
        padding: 10,
        borderRadius: 5
    },
    inputDesc: {
        height: 160,
        width: "100%",
        margin: 10,
        marginLeft: "auto",
        borderWidth: 1,
        backgroundColor:"white",
        padding: 10,
        borderRadius: 5,

        textAlignVertical: "top"
    },

    button: {
        alignItems: "center",
        width: "auto",
        height: "auto",
        borderRadius: 10,
        backgroundColor: "#ff0000",
        padding: 10,
        marginHorizontal:50,
        marginBottom:20,
        marginTop:10,

    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

});