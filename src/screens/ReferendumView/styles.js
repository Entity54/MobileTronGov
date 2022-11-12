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
    contain: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    input: {
        height: 50,
        width: 120,
        marginLeft: 20,
        marginRight: 15,
        marginTop: 15,
        borderWidth: 1,
        padding: 10,
        backgroundColor:"white",
        borderRadius: 5
    },
    button: {
        width: "40%",
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
    contain2: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

});
